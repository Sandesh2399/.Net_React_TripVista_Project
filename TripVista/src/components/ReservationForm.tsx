import { useEffect, useState } from "react";
import { IReservation } from "../Interfaces/IReservation";
import useAxiosAPI from "../API/AxiosService";
import { IDestination } from "../Interfaces/IDestination";
import { IPackage } from "../Interfaces/IPackage";
import { number, object, ObjectSchema, string } from "yup";
import HotelDropdown from "./HotelDropdown";
import { IHotel } from "../Interfaces/IHotel";

type props = {
    setShow: (show: boolean) => void;
    reservation: IReservation;
    getData: () => void
    setOpen: (open:boolean) =>void
}

const schema: ObjectSchema<any> = object({
    hotelId : number().typeError('Hotel is required').required().test('notZero', 'Hotel is required', function (value) {
        return value !== 0;
    }),
    destinationId: number().required().test('notZero', 'Destination is required', function (value) {
        return value !== 0;
    }),
    packageId: number().required().test('notZero', 'Package is required', function (value) {
        return value !== 0;
    }),
    startDate: string().required(),
    endDate: string().required(),
    noOfPeople: number().typeError('Number of people is required').min(1).required().test('notZero', 'Number of people is required', function (value) {
        return value !== 0;
    }),
    totalPrice: number().typeError('Total Price is required').min(1000).required().test('notZero', 'Total Price is required', function (value) {
        return value !== 0;
    }),
    status: string().required(),
});

function ReservationForm(props: props) {
    const { fetchData } = useAxiosAPI();
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const [travelPackages, setPackages] = useState<IPackage[]>([]);
    const [hotels, setHotels] = useState<IHotel[]>([]);
    const [reservation, setReservation] = useState<IReservation>({ reservationId: 0, userId: 0, destinationId: 0, status: '', packageId: 0, reservationDate: '', startDate: '', endDate: '', noOfPeople: 0, totalPrice: 0, hotelId: 0, userName: '', packageName: '', userEmail: '', destination: '' });
    const [validationObj, setValidationObj] = useState<any>({});

    useEffect(() => {
        getHotels();
        setReservation(props.reservation);
        getDestinations();
        getPackages();
    }, []);

    const getHotels = async () => {
        const { result, error } = await fetchData('get', 'Hotel/GetHotels', '');

        if (!result) {
            alert(error);
        }
        else {
            setHotels(result.data);
        }
    }


    const getDestinations = async () => {
        const { result, error } = await fetchData('get', 'Destination/GetDestinations', '');

        if (!result) {
            alert(error);
        }
        else {
            setDestinations(result.data);
        }
    }
    const getPackages = async () => {
        const { result, error } = await fetchData('get', 'Package/GetPackages', '');

        if (!result) {
            alert(error);
        }
        else {
            setPackages(result.data);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
        setValidationObj({ ...validationObj, [name]: '' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reservation.reservationId == 0) {

            await schema.validate(reservation, { abortEarly: false })
                .then(async () => {
                    const { result, error } = await fetchData('post', 'Reservation/AddReservation', reservation);

                    if (!result) {
                        alert(error);
                    }
                    else {
                        props.setShow(false);
                        props.setOpen(true);
                        props.getData();
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

            await schema.validate(reservation, { abortEarly: false })
                .then(async () => {
                    const { result, error } = await fetchData('put', 'Reservation/UpdateReservation', reservation);

                    if (!result) {
                        alert(error);
                    }
                    else {
                        props.setShow(false);
                        props.setOpen(true);
                        props.getData();
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
    }

    const handleSelectHotel = (selectedHotel: IHotel) => {
        setReservation({ ...reservation, hotelId: selectedHotel.hotelId });
    };

    return (
        <> 
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{reservation?.reservationId == 0 ? "Add Reservation" : "Edit Reservation"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Hotel</label>
                                                <HotelDropdown hotelId={props.reservation.hotelId} hotels={hotels} onSelectHotel={handleSelectHotel} />
                                                <p style={{ color: "red" }}>{validationObj.hotelId}</p>
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Destination</label>
                                                <select className="form-select" name="destinationId" value={reservation?.destinationId} onChange={handleChange}>
                                                    {
                                                        destinations.length > 0 ?
                                                            <>
                                                                <option value={0}>Select Destination</option>
                                                                {destinations.map(d =>
                                                                    <option value={d.destinationId}>{d.destinationName}</option>
                                                                )}
                                                            </>
                                                            :
                                                            <option value={0}>No Data</option>
                                                    }
                                                </select>
                                                <p style={{ color: "red" }}>{validationObj.destinationId}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Package Name</label>
                                                <select className="form-select" name="packageId" value={reservation?.packageId} onChange={handleChange}>
                                                    {
                                                        travelPackages.length > 0 ?
                                                            <>
                                                                <option value={0}>Select Package</option>
                                                                {travelPackages.map(d =>
                                                                    <option value={d.packageId}>{d.packageName}</option>
                                                                )}
                                                            </>
                                                            :
                                                            <option value={0}>No Data</option>
                                                    }
                                                </select>
                                                <p style={{ color: "red" }}>{validationObj.packageId}</p>
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Check In</label>
                                                <input type="date" name="startDate" className="form-control" id="exampleInputName1" placeholder="Check In" value={reservation?.startDate} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.startDate}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Check Out</label>
                                                <input type="date" name="endDate" className="form-control" id="exampleInputName1" placeholder="Check Out" value={reservation?.endDate} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.endDate}</p>
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>NoOfPeople</label>
                                                <input type="number" name="noOfPeople" className="form-control" id="exampleInputName1" placeholder="# People" value={reservation?.noOfPeople} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.noOfPeople}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Total Price</label>
                                                <input type="number" name="totalPrice" className="form-control" id="exampleInputName1" placeholder="Total Price" value={reservation.totalPrice} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.totalPrice}</p>
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Status</label>
                                                <select className="form-select" name="status" value={reservation?.status} onChange={handleChange}>
                                                    <option value={""}>Select Status</option>
                                                    <option value={"Cancel"}>Cancel</option>
                                                    <option value={"Confirm"}>Confirm</option>
                                                    <option value={"Completed"}>Completed</option>
                                                </select>
                                                <p style={{ color: "red" }}>{validationObj.status}</p>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                                        <button className="btn btn-light" onClick={() => props.setShow(false)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationForm