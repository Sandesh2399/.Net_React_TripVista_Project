import { useEffect, useState } from "react";
import { IReservation } from "../Interfaces/IReservation";
import ReservationForm from "./ReservationForm";
import useAxiosAPI from "../API/AxiosService";
import { useAppSelector } from "../redux/Store";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function ReservationList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [reservation, setReservation] = useState<IReservation>({ reservationId: 0, userId: 0, destinationId: 0, status: '', packageId: 0, reservationDate: '', startDate: '', endDate: '', noOfPeople: 0, totalPrice: 0, hotelId: 0, userName: '', packageName: '', userEmail: '', destination: '' });
    const [open, setOpen] = useState(false);

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

    const HandleDelete = async (id: number) => {
        const { result, error } = await fetchData('delete', `Reservation/DeleteReservation/${id}`, '');

        if (!result) {
            alert(error);
        }
        else {
            getData();
        }
    }
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
                     "Reservation is updated successfully!"
                </Alert>
            </Snackbar>
            
            {show ? <ReservationForm setShow={setShow} reservation={reservation} getData={getData} setOpen={setOpen}/>
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
                                                    <th> User Name </th>
                                                    <th> Destination </th>
                                                    <th> Package </th>
                                                    <th> Start Date </th>
                                                    <th> End Date </th>
                                                    <th> No of People </th>
                                                    <th> Total Price </th>
                                                    <th> Status </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reservations.length > 0 ?

                                                        reservations.map((p) =>
                                                            <tr>
                                                                <td>{p.userName}</td>
                                                                <td>{p.destination}</td>
                                                                <td>{p.packageName}</td>
                                                                <td>{p.startDate}</td>
                                                                <td>{p.endDate}</td>
                                                                <td>{p.noOfPeople}</td>
                                                                <td>{p.totalPrice}</td>
                                                                <td>{p.status}</td>
                                                                <td><span typeof="button" style={{ cursor: "pointer" }} onClick={() => handleEdit(p)}><i className="fa fa-edit"></i></span></td>
                                                                <td><span role="button" style={{ cursor: "pointer" }} onClick={() => HandleDelete(p.reservationId)}><i className="fa fa-trash-o"></i></span></td>
                                                            </tr>
                                                        )
                                                        :
                                                        <tr>
                                                            <td colSpan={8} style={{ textAlign: "center" }}>No data available</td>
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