import { useEffect, useState } from "react";
import { IReservation } from "../Interfaces/IReservation";
import ReservationForm from "./ReservationForm";
import useAxiosAPI from "../API/AxiosService";

function ReservationList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [reservation, setReservation] = useState<IReservation>({ reservationId: 0, userId: 0, destinationId: 0, status: '', packageId: 0, reservationDate: '', startDate: '', endDate: '', noOfPeople: 0, price: 0 });

    const handleEdit = (reservation: IReservation) => {
        setReservation(reservation);
        setShow(true);
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { result, error } = await fetchData('get', 'Reservation/GetReservations', '');

        if (!result) {
            alert(error);
        }
        else {
            setReservations(result.data);
        }
    }
    
    return (
        <>
            {show ? <ReservationForm setShow={setShow} reservation={reservation} getData={getData}/>
                :
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title"> Reservations</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th> Destination </th>
                                                    <th> Package </th>
                                                    <th> Start Date </th>
                                                    <th> End Date </th>
                                                    <th> No of People </th>
                                                    <th> Price </th>
                                                    <th> ReservationDate </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reservations.length > 0 ?

                                                        reservations.map((p) =>
                                                            <tr>
                                                                <td>{p.destinationId}</td>
                                                                <td>{p.packageId}</td>
                                                                <td>{p.startDate}</td>
                                                                <td>{p.endDate}</td>
                                                                <td>{p.noOfPeople}</td>
                                                                <td>{p.price}</td>
                                                                <td>{p.reservationDate}</td>
                                                                <td><span typeof="button" onClick={() => handleEdit(p)}><i className="fa fa-edit"></i></span></td>
                                                                <td><i className="fa fa-trash-o"></i></td>
                                                            </tr>
                                                        )
                                                        :
                                                        <tr>
                                                            <td colSpan={7} style={{ textAlign: "center" }}>No data available</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023 <a href="https://www.bootstrapdash.com/" target="_blank">BootstrapDash</a>. All rights reserved.</span>
                            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
                        </div>
                    </footer>

                </div>
            }
        </>
    )
}

export default ReservationList