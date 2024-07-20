import { useEffect, useState } from "react";
import { IPackage } from "../Interfaces/IPackage";
import useAxiosAPI from "../API/AxiosService";
import { IDestination } from "../Interfaces/IDestination";
import { number, object, ObjectSchema, string } from "yup";
import HotelDropdown from "./HotelDropdown";
import { IHotel } from "../Interfaces/IHotel";

type props = {
    setShow: (show: boolean) => void;
    travelPackage: IPackage;
    getData: () => void
    setOpen: (open:boolean) =>void
}

const schema: ObjectSchema<any> = object({
    destinationId: number().typeError('Number of rooms is required').required().test('notZero', 'Destination is required', function (value) {
        return value !== 0;
    }),
    packageName: string().required(),
    durationDays: number().typeError('Duration days is required').min(2).required().test('notZero', 'Duration days is required', function (value) {
        return value !== 0;
    }),
    price: number().typeError('Number of rooms is required').min(1000).required().test('notZero', 'Number of rooms is required', function (value) {
        return value !== 0;
    }),
    hotelId : number().typeError('Hotel is required').required().test('notZero', 'Hotel is required', function (value) {
        return value !== 0;
    }),
});

function PackageForm(props: props) {
    const [travelPackage, setPackage] = useState<IPackage>({ packageId: 0, packageName: '', destinationId: 0, description: '', price: 0, imageUrl: '', durationDays: 0, destination: '', hotelId: 0 });
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const { fetchData } = useAxiosAPI();
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>(null);
    const [validationObj, setValidationObj] = useState<any>({});
    const [hotels, setHotels] = useState<IHotel[]>([]);

    useEffect(() => {
        getHotels();
        setPackage(props.travelPackage);
        setPreview(props.travelPackage.imageUrl);
        getDestinations();
    }, []);

    const getHotels = async () => {
        const { result, error } = await fetchData('get', 'Hotel/GetHotels', '');

        if (!result) {
            alert(error);
        }
        else {
            setHotels(result.data);
        }
    }

    const getDestinations = async () => {
        const { result, error } = await fetchData('get', 'Destination/GetDestinations', '');

        if (!result) {
            alert(error);
        }
        else {
            setDestinations(result.data);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setPackage({ ...travelPackage, [name]: value });
        setValidationObj({ ...validationObj, [name]: '' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('packageId', travelPackage.packageId.toString());
        formData.append('destinationId', travelPackage.destinationId.toString());
        formData.append('hotelId', travelPackage.hotelId.toString());
        formData.append('packageName', travelPackage.packageName);
        formData.append('durationDays', travelPackage.durationDays.toString());
        formData.append('price', travelPackage.price.toString());
        formData.append('description', travelPackage.description ?? '');
        formData.append('image', selectedFile);
        formData.append('imageUrl', travelPackage.imageUrl ?? '');

        if (travelPackage.packageId == 0) {
            await schema.validate(travelPackage, { abortEarly: false })
                .then(async () => {
                    const { result, error } = await fetchData('post', 'Package/AddPackage', formData);

                    if (!result) {
                        alert(error);
                    }
                    else {
                        props.setShow(false);
                        handleClick();
                        props.getData();
                    }
                })
                .catch((err: any) => {
                    let errorArr = err?.inner || [];
                    let obj: any = {};
                    errorArr.map((err: any) => {
                        obj[err?.path] = err?.message;
                    });
                    setValidationObj(obj);
                });
        }
        else {

            await schema.validate(travelPackage, { abortEarly: false })
                .then(async () => {
                    const { result, error } = await fetchData('put', 'Package/UpdatePackage', formData);

                    if (!result) {
                        alert(error);
                    }
                    else {
                        props.setShow(false);
                        handleClick();
                        props.getData();
                    }
                })
                .catch((err: any) => {
                    let errorArr = err?.inner || [];
                    let obj: any = {};
                    errorArr.map((err: any) => {
                        obj[err?.path] = err?.message;
                    });
                    setValidationObj(obj);
                });
        }
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSelectHotel = (selectedHotel: IHotel) => {
        setPackage({ ...travelPackage, hotelId: selectedHotel.hotelId });
    };

    const handleClick = () => {
        props.setOpen(true);
    };

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{travelPackage.packageId == 0 ? "Add Package" : "Edit Package"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Hotel</label>
                                                <HotelDropdown hotelId={props.travelPackage.hotelId} hotels={hotels} onSelectHotel={handleSelectHotel} />
                                                <p style={{ color: "red" }}>{validationObj.hotelId}</p>
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Package Name</label>
                                                <input type="text" name="packageName" className="form-control" id="exampleInputName1" placeholder="Name" value={travelPackage.packageName} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.packageName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Destination</label>
                                                <select className="form-select" name="destinationId" value={travelPackage.destinationId} onChange={handleChange}>
                                                    {
                                                        destinations.length > 0 ?
                                                            <>
                                                                <option value={0}>Select Destination</option>
                                                                {destinations.map(d =>
                                                                    <option value={d.destinationId}>{d.destinationName}</option>
                                                                )}
                                                            </>
                                                            :
                                                            <option value={0}>No Data</option>
                                                    }
                                                </select>
                                                <p style={{ color: "red" }}>{validationObj.destinationId}</p>
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Days</label>
                                                <input type="number" name="durationDays" className="form-control" id="exampleInputName1" placeholder="Name" value={travelPackage.durationDays} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.durationDays}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Price</label>
                                                <input type="number" name="price" className="form-control" id="exampleInputName1" placeholder="Name" value={travelPackage.price} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.price}</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>File upload</label>
                                            <input type="file" accept="image/*" className="form-control file-upload-info" onChange={handleFileChange} />
                                            {preview && (
                                                <div className="mt-2">
                                                    <img src={preview} alt="Preview" style={{ maxWidth: '30%' }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea name="description" value={travelPackage?.description} className="form-control" id="exampleTextarea1" rows={4} onChange={handleChange}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                                        <button className="btn btn-light" onClick={() => props.setShow(false)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default PackageForm