import { object, ObjectSchema, string } from "yup";
import { IUser } from "../Interfaces/IUserData";
import { useEffect, useState } from "react";
import useAxiosAPI from "../API/AxiosService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Checkbox } from "@mui/material";

type props = {
    setShow: (show: boolean) => void;
    user: IUser;
    getData: () => void;
    setOpen: (open:boolean) =>void
}

const schema: ObjectSchema<any> = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required(),
    phoneNumber: string().required()
});

function UserForm(props: props) {
    const [user, setUser] = useState<IUser>({ userId: 0, firstName: '', lastName: '', email: '', phoneNumber: '', imageUrl: '', isActive: false });
    const { fetchData } = useAxiosAPI();
    const [validationObj, setValidationObj] = useState<any>({});

    useEffect(() => {
        setUser(props.user);
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setValidationObj({ ...validationObj, [name]: '' });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', user.userId.toString());
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('phoneNumber', user.phoneNumber);
        formData.append('isActive', user.isActive ? 'true' : 'false');
        formData.append('imageUrl', user.imageUrl);

        await schema.validate(user, { abortEarly: false })
            .then(async () => {
                const { result, error } = await fetchData('put', 'User/UpdateUser', formData);

                if (!result) {
                    alert(error);
                }
                else {
                    props.setShow(false);
                    props.setOpen(true);
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


    const handleCheckBox = (isActive: boolean) => {
        setUser({ ...user, isActive: isActive });
    };

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">{"Edit User"} </h3>
                        <button className="btn btn-gradient-primary btn-fw" onClick={() => props.setShow(false)}>Go to list</button>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>First Name</label>
                                                <input type="text" name="firstName" className="form-control" id="exampleInputName1" placeholder="Name" value={user.firstName} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.firstName}</p>
                                            </div>

                                            <div className="col-6 form-group">
                                                <label>Last Name</label>
                                                <input type="text" name="lastName" className="form-control" id="exampleInputName1" placeholder="Number of Rooms" value={user.lastName} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.lastName}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>Email</label>
                                                <input type="email" name="email" className="form-control" id="exampleInputName1" placeholder="Email" value={user.email ?? ''} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.email}</p>
                                            </div>
                                            <div className="col-6 form-group">
                                                <label>Phone Number</label>
                                                <input type="text" name="phoneNumber" className="form-control" id="exampleInputName1" placeholder="Phone Number" value={user.phoneNumber ?? ''} onChange={handleChange} />
                                                <p style={{ color: "red" }}>{validationObj.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 form-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="isActive"
                                                        checked={user.isActive}
                                                        onChange={() => handleCheckBox(!user.isActive)}
                                                    />
                                                    IsActive
                                                </label>
                                                <p style={{ color: "red" }}>{validationObj.email}</p>
                                            </div>
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

export default UserForm