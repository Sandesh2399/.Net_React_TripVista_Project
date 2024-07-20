import React, { useEffect, useState } from 'react'
import { IHotel } from '../Interfaces/IHotel';
import useAxiosAPI from '../API/AxiosService';
import { number, object, ObjectSchema, string } from 'yup';

type props = {
    setShow: (show: boolean) => void;
    hotel: IHotel;
    getData: () => void
    setOpen: (open:boolean) =>void
}

const schema: ObjectSchema<any> = object({
    name: string().required(),
    zipCode: string().required(),
    address: string().required(),
    numberOfRooms: number().typeError('Number of rooms is required').min(1).required().test('notZero', 'Number of rooms is required', function(value) {
        return value !== 0;
      }),
    rating: number().typeError('Rating is required').min(1).required().test('notZero', 'Rating is required', function(value) {
        return value !== 0;
      }),
});

function HotelForm(props: props) {
    const [hotel, setHotel] = useState<IHotel>({ hotelId: 0, name: '', address: '', zipCode: '', phoneNumber: '', email: '', website: '', numberOfRooms: 0, rating: 0, amenities: '', checkInTime: '', checkOutTime: '', imageUrl: '' });
    const { fetchData } = useAxiosAPI();
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>(null);
    const [validationObj, setValidationObj] = useState<any>({});

    useEffect(() => {
        setHotel(props.hotel);
        setPreview(props.hotel.imageUrl);
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
        setValidationObj({ ...validationObj, [name]: '' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('hotelId', hotel.hotelId.toString());
        formData.append('name', hotel.name);
        formData.append('zipCode', hotel.zipCode);
        formData.append('address', hotel.address);
        formData.append('amenities', hotel.amenities ?? '');
        formData.append('email', hotel.email ?? '');
        formData.append('numberOfRooms', hotel.numberOfRooms.toString());
        formData.append('image', selectedFile);
        formData.append('imageUrl', hotel.imageUrl ?? '');
        formData.append('checkInTime', hotel.checkInTime ?? '');
        formData.append('checkOutTime', hotel.checkOutTime ?? '');
        formData.append('phoneNumber', hotel.phoneNumber ?? '');
        formData.append('rating', hotel.rating.toString());

        if (hotel.hotelId == 0) {
            await schema.validate(hotel, { abortEarly: false })
                .then(async () => {
                    const { result, error } = await fetchData('post', 'Hotel/AddHotel', formData);

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
            await schema.validate(hotel, { abortEarly: false })
            .then(async () => {
                const { result, error } = await fetchData('put', 'Hotel/UpdateHotel', formData);

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

    const handleClick = () => {
        props.setOpen(true);
    };

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{hotel.hotelId == 0 ? "Add Hotel" : "Edit Hotel"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Name</label>
                                                <input type="text" name="name" className="form-control" id="exampleInputName1" placeholder="Name" value={hotel.name} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.name}</p>
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Number of Rooms</label>
                                                <input type="number" name="numberOfRooms" className="form-control" id="exampleInputName1" placeholder="Number of Rooms" value={hotel.numberOfRooms} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.numberOfRooms}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Amenities</label>
                                                <input type="text" name="amenities" className="form-control" id="exampleInputName1" placeholder="Amenities" value={hotel.amenities ?? ''} onChange={handleChange} />
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Rating</label>
                                                <input type="text" name="rating" className="form-control" id="exampleInputName1" placeholder="Rating" value={hotel.rating} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.rating}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Email</label>
                                                <input type="email" name="email" className="form-control" id="exampleInputName1" placeholder="Email" value={hotel.email ?? ''} onChange={handleChange} />
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Phone Number</label>
                                                <input type="text" name="phoneNumber" className="form-control" id="exampleInputName1" placeholder="Phone Number" value={hotel.phoneNumber ?? ''} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Zip Code</label>
                                                <input type="text" name="zipCode" className="form-control" id="exampleInputName1" placeholder="Zip Code" value={hotel.zipCode} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.zipCode}</p>
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Address</label>
                                                <input type="text" name="address" className="form-control" id="exampleInputName1" placeholder="Address" value={hotel.address} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.address}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 form-group">
                                                <label>Website</label>
                                                <input type="text" name="website" className="form-control" id="exampleInputName1" placeholder="website" value={hotel.website ?? ''} onChange={handleChange} />
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

export default HotelForm