import { useEffect, useState } from "react";
import PackageBox from "./PackageBox"
import useAxiosAPI from "../API/AxiosService";
import { IDestination } from "../Interfaces/IDestination";

function Destinations() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [destinations, setDestinations] = useState<IDestination[]>([]);

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

    return (
        <>
            <div className="hero hero-inner" style={{padding:"5rem 0 5rem 0"}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mx-auto text-center">
                            <div className="intro-wrap">
                                <h1 className="mb-0">Popular Destination</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        {destinations.map(p => {
                            return <>
                                <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                    <div className="media-1">
                                        <div className="d-block mb-3"><img src={p.imageUrl} alt="Image" className="img-fluid" style={{cursor:"pointer"}}/></div>
                                        <span className="d-flex align-items-center loc mb-2">
                                            <span className="icon-room mr-3"></span>
                                            <span>{p.destinationName}</span>
                                        </span>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <span>{p.description}</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Destinations