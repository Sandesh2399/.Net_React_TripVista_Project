import { useEffect, useState } from "react";
import { IPackage } from "../Interfaces/IPackage";
import useAxiosAPI from "../API/AxiosService";
import { IDestination } from "../Interfaces/IDestination";

type props = {
    setShow: (show: boolean) => void;
    travelPackage: IPackage;
    getData: ()=>void
}

function PackageForm(props: props) {
    const [travelPackage, setPackage] = useState<IPackage>({ packageId: 0, packageName: '', destinationId: 0, description: '', price: 0, imageUrl: '', durationDays: 0,destination:'' });
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const { fetchData } = useAxiosAPI();
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>(null);

    useEffect(() => {
        setPackage(props.travelPackage);
        setPreview(props.travelPackage.imageUrl);
        getDestinations();
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

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setPackage({ ...travelPackage, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('packageId', travelPackage.packageId.toString());
        formData.append('destinationId', travelPackage.destinationId.toString());
        formData.append('packageName', travelPackage.packageName);
        formData.append('durationDays', travelPackage.durationDays.toString());
        formData.append('price', travelPackage.price.toString());
        formData.append('description', travelPackage.description ?? '');
        formData.append('image', selectedFile);
        formData.append('imageUrl', travelPackage.imageUrl ?? '');

        if (travelPackage.packageId == 0) {
            const { result, error } = await fetchData('post', 'Package/AddPackage', formData);

            if (!result) {
                alert(error);
            }
            else {
                props.setShow(false);
                props.getData();
            }
        }
        else {
            const { result, error } = await fetchData('put', 'Package/UpdatePackage', formData);

            if (!result) {
                alert(error);
            }
            else {
                props.setShow(false);
                props.getData();
            }
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

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{travelPackage.packageId == 0? "Add Package" : "Edit Package"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Package Name</label>
                                                <input type="text" name="packageName" className="form-control" id="exampleInputName1" placeholder="Name" value={travelPackage.packageName} onChange={handleChange} />
                                            </div>

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
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Days</label>
                                                <input type="number" name="durationDays" className="form-control" id="exampleInputName1" placeholder="Name" value={travelPackage.durationDays} onChange={handleChange} />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Price</label>
                                                <input type="number" name="price" className="form-control" id="exampleInputName1" placeholder="Name" value={travelPackage.price} onChange={handleChange} />
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
                </div>
            </div>
        </>
    )
}

export default PackageForm