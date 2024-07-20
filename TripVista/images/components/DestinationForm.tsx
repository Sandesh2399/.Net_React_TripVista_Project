import React, { useEffect, useState } from "react";
import { IDestination } from "../Interfaces/IDestination";
import useAxiosAPI from "../API/AxiosService";

type props = {
    setShow: (show: boolean) => void;
    destination: IDestination;
    getData: ()=>void
}

function DestinationForm(props: props) {
    const { fetchData } = useAxiosAPI();
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>(null);
    const [destination, setDestination] = useState<IDestination>({ destinationId: 0, destinationName: '', description: '', location: '', imageUrl: '' });

    useEffect(() => {
        setDestination(props.destination);
        setPreview(props.destination.imageUrl);
    }, []);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDestination({ ...destination, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('destinationId', destination.destinationId.toString());
        formData.append('DestinationName', destination.destinationName);
        formData.append('Description', destination.description ?? '');
        formData.append('image', selectedFile);
        formData.append('imageUrl', destination.imageUrl??'');

        if (destination.destinationId == 0) {
            const { result, error } = await fetchData('post', 'Destination/AddDestination', formData);

            if (!result) {
                alert(error);
            }
            else {
                props.setShow(false);
                props.getData();
            }
        }
        else {
            const { result, error } = await fetchData('put', 'Destination/UpdateDestination', formData);

            if (!result) {
                alert(error);
            }
            else {
                props.setShow(false);
                props.getData();
            }
        }
    }

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{destination.destinationId == 0? "Add Destination" : "Edit Destination"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Destination Name</label>
                                            <input type="text" name="destinationName" className="form-control" id="exampleInputName1" placeholder="Name" value={destination.destinationName} onChange={handleChange} />
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
                                            <textarea name="description" value={destination?.description} className="form-control" id="exampleTextarea1" rows={4} onChange={handleChange}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                                        <button className="btn btn-light" onClick={()=>props.setShow(false)}>Cancel</button>
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

export default DestinationForm