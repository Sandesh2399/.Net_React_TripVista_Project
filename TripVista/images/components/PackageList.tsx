import { useEffect, useState } from "react";
import { IPackage } from "../Interfaces/IPackage";
import PackageForm from "./PackageForm";
import useAxiosAPI from "../API/AxiosService";

function PackageList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [travelPackages, setPackages] = useState<IPackage[]>([]);
    const [travelPackage, setPackage] = useState<IPackage>({ packageId: 0, packageName: '', destinationId: 0, description: '', price: 0, imageUrl: '', durationDays: 0,destination:'' });

    const handleEdit = (travelPackage: IPackage) => {
        setPackage(travelPackage);
        setShow(true);
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { result, error } = await fetchData('get', 'Package/GetPackages', '');

        if (!result) {
            alert(error);
        }
        else {
            setPackages(result.data);
        }
    }

    return (
        <>
            {
                show ? <PackageForm setShow={setShow} travelPackage={travelPackage} getData={getData}/>
                    :
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title"> Packages</h3>
                                <button className="btn btn-gradient-primary btn-fw" onClick={() => setShow(true)}>Add New</button>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> destinationId </th>
                                                        <th> package Name </th>
                                                        <th> Days </th>
                                                        <th> Price </th>
                                                        <th> Description </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        travelPackages.length > 0 ?

                                                            travelPackages.map((p) =>
                                                                <tr>
                                                                    <td>{p.destinationId}</td>
                                                                    <td>{p.packageName}</td>
                                                                    <td>{p.durationDays}</td>
                                                                    <td>{p.price}</td>
                                                                    <td className="text-wrap" style={{ maxWidth: '200px' }}>{p.description}</td>
                                                                    <td><span typeof="button" onClick={() => handleEdit(p)}><i className="fa fa-edit"></i></span></td>
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

export default PackageList