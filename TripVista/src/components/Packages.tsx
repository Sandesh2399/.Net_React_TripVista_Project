import { useEffect, useRef, useState } from "react";
import { IPackageBox } from "../Interfaces/IPackageBox";
import PackageBox from "./PackageBox";
import useAxiosAPI from "../API/AxiosService";
import VerticalLinearStepper from "./PackageSteper";
import { IReservation } from "../Interfaces/IReservation";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import { ISearchPakageParams } from "../Interfaces/ISearchPackageParams";
import { AddSearchParams } from "../redux/PackageSlice";

function Packages() {
    const { fetchData } = useAxiosAPI();
    const [packages, setPackages] = useState<IPackageBox[]>([]);
    const [packageDetails, setPackageDetails] = useState<any>();
    const [activeStep, setActiveStep] = useState(0);
    const [reservation, setReservation] = useState<IReservation>({ reservationId: 0, userId: 0, destinationId: 0, status: '', packageId: 0, reservationDate: '', startDate: '', endDate: '', noOfPeople: 0, totalPrice: 0, hotelId: 0, packageName: '', userName: '', userEmail: '', destination: '' });
    const authData = useAppSelector(s => s.RootReducer.Auth.authData);
    const searchParams = useAppSelector(s => s.RootReducer.Package.searchPackageParams);
    const dispatch = useAppDispatch();
    const modalRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setReservation((prevState => ({
            ...prevState,
            destinationId: packageDetails?.destinationId,
            packageId: packageDetails?.packageId,
            hotelId: packageDetails?.hotelDetails?.hotelId,
            totalPrice: packageDetails?.price,
            userId: authData?.user?.userId,
            destination: packageDetails?.destination,
            packageName: packageDetails?.packageName,
            userName: authData?.user?.firstName + " " + authData?.user?.lastName,
            userEmail: authData?.user?.email
        })
        ));

    }, [packageDetails]);

    const getData = async () => {

        const [minPrice, maxPrice] = searchParams.PriceRange;

        const { result, error } = await fetchData('get', `Package/GetPackages/?destinationId=${searchParams.DestinationId}&noOfPeople=${searchParams.NoofPeople}&minPrice=${minPrice}&maxPrice=${maxPrice}`, '');

        if (!result) {
            alert(error);
        }
        else {
            setPackages(result.data);

            const searchParams: ISearchPakageParams = {
                DestinationId: 0,
                NoofPeople: 0,
                PriceRange: [0, 0]
            }

            dispatch(AddSearchParams(searchParams));
        }
    }

    return (
        <>
            <div className="hero hero-inner" style={{ padding: "5rem 0 5rem 0" }}>
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

            <div className="modal fade" id="exampleModalLg" tabIndex={-1} aria-labelledby="exampleModalCenteredScrollableTitle" style={{ display: "none" }} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenteredScrollableTitle">Booking Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef} onClick={() => setActiveStep(0)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <VerticalLinearStepper modalRef={modalRef} packageDetails={packageDetails} activeStep={activeStep} setActiveStep={setActiveStep} reservation={reservation} setReservation={setReservation} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {packages.length > 0 ? <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        {packages.map(p => {
                            return <PackageBox PackageBox={p} setPackageDetails={setPackageDetails} />
                        })}
                    </div>
                </div>
            </div> : <div className="no-packages">
                <div className="no-packages-container">
                    <h2>No Packages Available</h2>
                </div>
            </div>}
        </>
    );
};

export default Packages;