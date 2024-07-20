import { useEffect, useState } from 'react';
import useAxiosAPI from '../API/AxiosService';
import { IDestination } from '../Interfaces/IDestination';
import { IPackage } from '../Interfaces/IPackage';
import { IReservation } from '../Interfaces/IReservation';
import { IPackageBox } from '../Interfaces/IPackageBox';
import { date } from 'yup';

type props = {
    packageDetails: IPackageBox,
    reservation: IReservation,
    setReservation: (reservation: IReservation) => void,
    validationObj: any,
    setValidationObj: (validationObj: any) => void,
}

function BookingForm(props: props) {
    const { fetchData } = useAxiosAPI();
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const [travelPackages, setPackages] = useState<IPackage[]>([]);

    useEffect(() => {
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
        props.setReservation({ ...props.reservation, [name]: value });
        props.setValidationObj({ ...props.validationObj, [name]: '' });
    }

    const addDays = (date: any, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    };

    return (
        <>
            <form className="forms" style={{ width: "582px" }}>
                <div className="row">
                    <div className="col-6 form-group">
                        <label>Destination</label>
                        <select className="form-select" name="destinationId" value={props.reservation?.destinationId} onChange={handleChange} disabled>
                            {
                                destinations.length > 0 ?
                                    <>
                                        <option value={0}>Select Destination</option>
                                        {destinations.map(d =>
                                            <option value={d?.destinationId}>{d?.destinationName}</option>
                                        )}
                                    </>
                                    :
                                    <option value={0}>No Data</option>
                            }
                        </select>
                        <p style={{ color: "red" }}>{props.validationObj.destinationId}</p>
                    </div>

                    <div className="col-6 form-group">
                        <label>Package</label>
                        <select className="form-select" name="packageId" value={props.reservation?.packageId} onChange={handleChange} disabled>
                            {
                                travelPackages.length > 0 ?
                                    <>
                                        <option value={0}>Select Package</option>
                                        {travelPackages.map(d =>
                                            <option value={d?.packageId}>{d?.packageName}</option>
                                        )}
                                    </>
                                    :
                                    <option value={0}>No Data</option>
                            }
                        </select>
                        <p style={{ color: "red" }}>{props.validationObj.packageId}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 form-group">
                        <label>Check In</label>
                        <input type="date" name="startDate" className="form-control" id="exampleInputName1" placeholder="Check In" min={addDays(new Date(), 0)} value={props.reservation?.startDate} onChange={handleChange} />
                        <p style={{ color: "red" }}>{props.validationObj.startDate}</p>
                    </div>
                    <div className="col-6 form-group">
                        <label>Check Out</label>
                        <input type="date" name="endDate" className="form-control" id="exampleInputName1" placeholder="Check Out" min={props.reservation?.startDate ? addDays(props.reservation?.startDate, 1) : addDays(new Date(), 1)} value={props.reservation?.endDate} onChange={handleChange} />
                        <p style={{ color: "red" }}>{props.validationObj.endDate}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 form-group">
                        <label>NoOfPeople</label>
                        <input type="number" name="noOfPeople" className="form-control" id="exampleInputName1" placeholder="# People" value={props.reservation?.noOfPeople} onChange={handleChange} />
                        <p style={{ color: "red" }}>{props.validationObj.noOfPeople}</p>
                    </div>
                </div>
            </form>
        </>
    );
}

export default BookingForm