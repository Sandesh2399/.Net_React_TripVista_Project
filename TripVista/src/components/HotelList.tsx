import { useEffect, useState } from "react";
import useAxiosAPI from "../API/AxiosService";
import { IHotel } from "../Interfaces/IHotel";
import HotelForm from "./HotelForm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function HotelList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [hotels, setHotels] = useState<IHotel[]>([]);
    const [hotel, setHotel] = useState<IHotel>({ hotelId: 0, name: '', address: '', zipCode: '', phoneNumber: '', email: '', website: '', numberOfRooms: 0, rating: 0, amenities: '', checkInTime: '', checkOutTime: '', imageUrl: '' });
    const [open, setOpen] = useState(false);

    const handleEdit = (hotel: IHotel) => {
        setHotel(hotel);
        setShow(true);
    }

    const HandleDelete = async (id:number) =>{
        const { result, error } = await fetchData('delete', `Hotel/DeleteHotel/${id}`, '');

        if (!result) {
            alert(error);
        }
        else {
            getData();
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { result, error } = await fetchData('get', 'Hotel/GetHotels', '');

        if (!result) {
            alert(error);
        }
        else {
            setHotels(result.data);
        }
    }

    const Cleardata = ()=>{
        setHotel({ hotelId: 0, name: '', address: '', zipCode: '', phoneNumber: '', email: '', website: '', numberOfRooms: 0, rating: 0, amenities: '', checkInTime: '', checkOutTime: '', imageUrl: '' });
        setShow(true);
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
                     {hotel.hotelId == 0 ? "Hotel is saved successfully!" : "Hotel is updated successfully!"}
                </Alert>
            </Snackbar>
            
            {
                show ? <HotelForm setShow={setShow} hotel={hotel} getData={getData} setOpen={setOpen}/>
                    :
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title"> Packages</h3>
                                <button className="btn btn-gradient-primary btn-fw" onClick={() => Cleardata()}>Add New</button>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> Hotel Name </th>
                                                        <th> Amenities </th>
                                                        <th> Number of Rooms </th>
                                                        <th> Rating </th>
                                                        <th> Address </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        hotels.length > 0 ?

                                                            hotels.map((p) =>
                                                                <tr>
                                                                    <td>{p.name}</td>
                                                                    <td className="text-wrap" style={{ maxWidth: '200px' }}>{p.amenities}</td>
                                                                    <td>{p.numberOfRooms}</td>
                                                                    <td>{p.rating}</td>
                                                                    <td className="text-wrap" style={{ maxWidth: '200px' }}>{p.address}</td>
                                                                    <td><span typeof="button" style={{cursor:"pointer"}} onClick={() => handleEdit(p)}><i className="fa fa-edit"></i></span></td>
                                                                    <td><span typeof="button" style={{cursor:"pointer"}} onClick={() => HandleDelete(p.hotelId)}><i className="fa fa-trash-o"></i></span></td>
                                                                </tr>
                                                            )
                                                            :
                                                            <tr>
                                                                <td colSpan={5} style={{ textAlign: "center" }}>No data available</td>
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

export default HotelList