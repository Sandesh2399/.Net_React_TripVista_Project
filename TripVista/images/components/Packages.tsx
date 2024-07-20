import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { IPackageBox } from "../Interfaces/IPackageBox";
import PackageBox from "./PackageBox";
import useAxiosAPI from "../API/AxiosService";
import VerticalLinearStepper from "./PackageSteper";

function Packages() {
    const { fetchData } = useAxiosAPI();
    const [packages, setPackages] = useState<IPackageBox[]>([]);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

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
            {/* <BookingForm show={show} setShow={setShow} /> */}
            
            <div className="hero hero-inner" style={{padding:"5rem 0 5rem 0"}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mx-auto text-center">
                            <div className="intro-wrap">
                                <h1 className="mb-0">Special Offers</h1>
                                <p className="text-white">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <VerticalLinearStepper/>
            
            {/* <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        {packages.map(p => {
                            return <PackageBox PackageBox={p} handleShow={handleShow} />
                        })}
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Packages;