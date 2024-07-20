import { Box, CardContent, Divider, Grid, Typography } from "@mui/material"
import { IPackageBox } from "../Interfaces/IPackageBox"
import { IReservation } from "../Interfaces/IReservation"
import { useAppSelector } from "../redux/Store"

type props = {
    packageDetails: IPackageBox,
    reservation: IReservation
}

const ReveiwBooking = (props: props) => {

    const authData = useAppSelector(s => s.RootReducer.Auth.authData);

    return (
        <>
            <Grid container spacing={2} style={{ width: "582px" }}>
                <Grid item xs={12} sm={6}>
                    <CardContent>
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Full Name
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {authData?.user?.firstName + " " + authData?.user?.lastName}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Email
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {authData?.user?.email}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Phone No
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {authData?.user?.phoneNumber}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Destination
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {props.packageDetails?.destination}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Package
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {props.packageDetails?.packageName}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardContent>
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Check In
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {props.reservation.startDate}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Check Out
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {props.reservation.endDate}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                No of People
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {props.reservation.noOfPeople}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle1" component="div" gutterBottom>
                                Total Price
                            </Typography>
                            <Typography variant="body2" component="div" gutterBottom>
                                {props.reservation.noOfPeople * props.packageDetails.price}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </>
    )
}

export default ReveiwBooking