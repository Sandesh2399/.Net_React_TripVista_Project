import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IUser } from "../Interfaces/IUserData";
import useAxiosAPI from "../API/AxiosService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../redux/Store";
import { setOpenProfile, UpdateUserData } from "../redux/AuthSlice";

const UserProfileUpdate = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>(null);
    const [userData, setUserData] = useState<IUser>({ userId: 0, firstName: '', lastName: '', email: '', phoneNumber: '',isActive: false ,imageUrl:''});
    const formData = new FormData();
    const { fetchData } = useAxiosAPI();
    const authData = useAppSelector(s=>s.RootReducer.Auth.authData);
    const isOpenProfile = useAppSelector(s=>s.RootReducer.Auth.isOpenProfile);
    const dispatch = useAppDispatch();
    
    useEffect(()=>{
       setUserData(authData?.user);
       setPreview(authData?.user?.imageUrl ?? null);
    },[authData]);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        formData.append('userId', userData.userId.toString());
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('email', userData.email);
        formData.append('phoneNumber', userData.phoneNumber);
        formData.append('isActive', userData.isActive ? 'true':'false');
        formData.append('image', selectedFile);
        formData.append('imageUrl', userData.imageUrl);

        const { result, error } = await fetchData('put', 'User/UpdateUser', formData);

        if (!result) {
            alert(error);
        }
        else {
            setOpen(true);
            const { result } = await fetchData('get', `User/GetImageUrl/${userData.userId}`, formData);
            dispatch(setOpenProfile(false));
            setUserData({ ...userData, imageUrl: result?.data });
            dispatch(UpdateUserData({ ...userData, imageUrl: result?.data }))
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {"Your profile is updated successfully!"}
                </Alert>
            </Snackbar>


            <Modal show={isOpenProfile}>
                <Modal.Header closeButton onClick={()=>dispatch(setOpenProfile(false))}>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-top">
                        <div className="me-4 col-4">
                            <img
                                src={preview || "../../images/Hotels/HotelBonanza.jpg"}
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <input
                                type="file"
                                id="profilePicture"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="col-8">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>First Name</Form.Label>
                                    <input type="text" name="firstName" style={{ width: "95%" }} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="First Name" value={userData?.firstName} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <input type="text" name="lastName" style={{ width: "95%" }} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Last Name" value={userData?.lastName} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <input type="email" name="email" style={{ width: "95%" }} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Email" value={userData?.email} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Phone No</Form.Label>
                                    <input type="text" name="phoneNumber" style={{ width: "95%" }} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Phone No" value={userData?.phoneNumber} onChange={handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserProfileUpdate;