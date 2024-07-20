import { useEffect, useState } from "react"
import DestinationForm from "./DestinationForm";
import { IDestination } from "../Interfaces/IDestination";
import useAxiosAPI from "../API/AxiosService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function DestinationList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const [destination, setDestination] = useState<IDestination>({ destinationId: 0, destinationName: '', description: '', location: '', imageUrl: '' });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { result, error } = await fetchData('get', 'Destination/GetDestinations', '');

        if (!result) {
            alert(error);
        }
        else {
            setDestinations(result.data);
        }
    }

    const handleEdit = (destination: IDestination) => {
        setDestination(destination);
        setShow(true);
    }

    const HandleDelete = async (id: number) => {
        const { result, error } = await fetchData('delete', `Destination/DeleteDestination/${id}`, '');

        if (!result) {
            alert(error);
        }
        else {
            getData();
        }
    }

    const Cleardata = () => {
        setDestination({ destinationId: 0, destinationName: '', description: '', location: '', imageUrl: '' });
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
                    {destination.destinationId == 0 ? "Destination is saved successfully!" : "Destination is updated successfully!"}
                </Alert>
            </Snackbar>

            {
                show ? <DestinationForm setShow={setShow} destination={destination} getData={getData} setOpen={setOpen}/>
                    :
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title"> Destinations</h3>
                                <button className="btn btn-gradient-primary btn-fw" onClick={() => Cleardata()}>Add New</button>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> DestinationId </th>
                                                        <th> Destination Name </th>
                                                        <th> Description </th>
                                                        <th> Action </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        destinations.length > 0 ?

                                                            destinations.map((d, index) =>
                                                                <tr key={index}>
                                                                    <td>{d.destinationId}</td>
                                                                    <td>{d.destinationName}</td>
                                                                    <td className="text-wrap" style={{ maxWidth: '200px' }}>{d.description}</td>
                                                                    <td><span role="button" style={{ cursor: "pointer" }} onClick={() => handleEdit(d)}><i className="fa fa-edit"></i></span></td>
                                                                    <td><span role="button" style={{ cursor: "pointer" }} onClick={() => HandleDelete(d.destinationId)}><i className="fa fa-trash-o"></i></span></td>
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

export default DestinationList