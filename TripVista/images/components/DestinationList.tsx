import { useEffect, useState } from "react"
import DestinationForm from "./DestinationForm";
import { IDestination } from "../Interfaces/IDestination";
import useAxiosAPI from "../API/AxiosService";

function DestinationList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const [destination, setDestination] = useState<IDestination>({ destinationId: 0, destinationName: '', description: '', location: '', imageUrl: '' });

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

    return (
        <>
            {
                show ? <DestinationForm setShow={setShow} destination={destination}  getData={getData}/>
                    :
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title"> Destinations</h3>
                                <button className="btn btn-gradient-primary btn-fw" onClick={() => setShow(true)}>Add New</button>
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
                                                                    <td><span role="button" onClick={() => handleEdit(d)}><i className="fa fa-edit"></i></span></td>
                                                                    <td><i className="fa fa-trash-o"></i></td>
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