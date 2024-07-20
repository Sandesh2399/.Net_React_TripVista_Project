import { useEffect, useState } from "react";
import { IReservation } from "../Interfaces/IReservation";
import useAxiosAPI from "../API/AxiosService";
import { IDestination } from "../Interfaces/IDestination";
import { IPackage } from "../Interfaces/IPackage";
import Packages from "./Packages";

type props = {
    setShow: (show: boolean) => void;
    reservation: IReservation;
    getData: ()=>void
}

function ReservationForm(props: props) {
    const { fetchData } = useAxiosAPI();
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const [travelPackages, setPackages] = useState<IPackage[]>([]);
    const [reservation, setReservation] = useState<IReservation>({ reservationId: 0, userId: 0, destinationId: 0, status: '', packageId: 0, reservationDate: '', startDate: '', endDate: '', noOfPeople: 0, price: 0 });

    useEffect(() => {
        setReservation(props.reservation);
        getDestinations();
        getPackages();
    }, []);

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
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (reservation.reservationId == 0) {
            const { result, error } = await fetchData('post', 'Reservation/AddReservation', reservation);

            if (!result) {
                alert(error);
            }
            else {
                props.setShow(false);
                props.getData();
            }
        }
        else {
            const { result, error } = await fetchData('put', 'Reservation/UpdateReservation', reservation);

            if (!result) {
                alert(error);
            }
            else {
                props.setShow(false);
                props.getData();
            }
        }
    }

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{reservation.reservationId == 0 ? "Add Reservation" : "Edit Reservation"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Destination</label>
                                                <select className="form-select" name="destinationId" value={reservation.destinationId} onChange={handleChange}>
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
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Package Name</label>
                                                <select className="form-select" name="packageId" value={reservation.packageId} onChange={handleChange}>
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
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Days</label>
                                                <input type="date" name="startDate" className="form-control" id="exampleInputName1" placeholder="Name" value={reservation.startDate} onChange={handleChange} />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Price</label>
                                                <input type="date" name="endDate" className="form-control" id="exampleInputName1" placeholder="Name" value={reservation.endDate} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>NoOfPeople</label>
                                                <input type="number" name="noOfPeople" className="form-control" id="exampleInputName1" placeholder="Name" value={reservation.noOfPeople} onChange={handleChange} />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Price</label>
                                                <input type="number" name="price" className="form-control" id="exampleInputName1" placeholder="Name" value={reservation.price} onChange={handleChange} />
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