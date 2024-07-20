import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import HotelDetails from './HotelDetails';
import { IPackageBox } from '../Interfaces/IPackageBox';
import BookingForm from './BookingForm';
import ReveiwBooking from './ReveiwBooking';
import { IReservation } from '../Interfaces/IReservation';
import useAxiosAPI from '../API/AxiosService';
import { number, object, ObjectSchema, string } from 'yup';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../redux/Store';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from '../redux/PackageSlice';
import GooglePaybutton from './PaymentGateWay/GooglePayButton';

type props = {
    modalRef: any
    reservation: IReservation
    setReservation: (reservation: IReservation) => void
    packageDetails: IPackageBox
    activeStep: number
    setActiveStep: (activeStep: number) => void
}

const schema: ObjectSchema<any> = object({
    destinationId: number().required(),
    packageId: number().required(),
    startDate: string().required(),
    endDate: string().required(),
    noOfPeople: number().typeError('Number of rooms is required').min(1).required().test('notZero', 'Number of rooms is required', function (value) {
        return value !== 0;
    }),
});


export default function VerticalLinearStepper(props: props) {

    const { fetchData } = useAxiosAPI();
    const [validationObj, setValidationObj] = useState<any>({});
    const [open, setOpen] = useState(false);
    const authData = useAppSelector(s => s.RootReducer.Auth.authData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const steps = [
        {
            label: 'Hotel Details',
            description: <HotelDetails packageDetails={props.packageDetails} />,
        },
        {
            label: 'Submit Details',
            description: <BookingForm packageDetails={props.packageDetails} reservation={props.reservation} setReservation={props.setReservation} validationObj={validationObj} setValidationObj={setValidationObj} />,
        },
        {
            label: 'Review your Booking',
            description: <ReveiwBooking packageDetails={props.packageDetails} reservation={props.reservation} />
        },
    ];

    const handleNext = async () => {
        if (props.activeStep == 2) {

            var reservationModel = props.reservation;

            reservationModel = { ...props.reservation, totalPrice: props.reservation.noOfPeople * props.packageDetails.price, reservationDate: new Date().toISOString(), status: "Confirm" };

            const { result, error } = await fetchData('post', 'Reservation/BookReservation', reservationModel);

            if (!result) {
                alert(error);
            }
            else {
                props.reservation.reservationId = result.data.reservationId;
                props.setActiveStep(props.activeStep + 1);
                handleClick();
                props.setReservation({ reservationId: 0, userId: 0, destinationId: 0, status: '', packageId: 0, reservationDate: '', startDate: '', endDate: '', noOfPeople: 0, totalPrice: 0, hotelId: 0, packageName: '', userName: '', userEmail: '', destination: '' });
            }
        }
        if (props.activeStep == 1) {
            await schema.validate(props.reservation, { abortEarly: false })
                .then(async () => {
                    const { result, error } = await fetchData('post', 'Hotel/CheckHotelAvailability', props.reservation);

                    if (error != null) {
                        alert(error);
                    }
                    else if (result) {
                        props.setActiveStep(props.activeStep + 1);
                    }
                })
                .catch((err: any) => {
                    let errorArr = err?.inner || [];
                    let obj: any = {};
                    errorArr.map((err: any) => {
                        obj[err?.path] = err?.message;
                    });
                    setValidationObj(obj);
                });
        }
        else {
            if (authData?.user?.userId != 0 && authData?.user?.userId) {
                props.setActiveStep(props.activeStep + 1);
            } else {

                if (props.modalRef.current) {
                    props.modalRef.current.click();
                }
                dispatch(setIsLogin(true));
                navigate("/Login");
            }
        }
    };

    const handleBack = () => {
        props.setActiveStep(props.activeStep - 1);
    };

    const handleReset = () => {
        props.setActiveStep(0);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Your package booking is completed!
                </Alert>
            </Snackbar>

            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={props.activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>

                                        {index === steps.length - 1 ? <GooglePaybutton /> : <Button style={{
                                            marginBottom: "19px",
                                            marginLeft: "10px"
                                        }}
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >Continue</Button>}

                                        <Button
                                            style={{
                                                marginBottom: "19px",
                                                marginLeft: "10px"
                                            }}
                                            variant="contained"
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {props.activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Back
                        </Button>
                    </Paper>
                )}
            </Box>
        </>
    );
}
