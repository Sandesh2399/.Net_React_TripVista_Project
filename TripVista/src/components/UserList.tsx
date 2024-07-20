import { useEffect, useState } from "react";
import useAxiosAPI from "../API/AxiosService";
import { IUser } from "../Interfaces/IUserData";
import UserForm from "./UserForm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function UserList() {
    const { fetchData } = useAxiosAPI();
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser>({ userId: 0, firstName: '', lastName: '', email: '', phoneNumber: '', imageUrl: '', isActive: false });
    const [open, setOpen] = useState(false);

    const handleEdit = (user: IUser) => {
        setUser(user);
        setShow(true);
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { result, error } = await fetchData('get', 'User/GetUsers', '');

        if (!result) {
            alert(error);
        }
        else {
            setUsers(result.data);
        }
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
                    "User is updated successfully!"
                </Alert>
            </Snackbar>

            {
                show ? <UserForm setShow={setShow} user={user} getData={getData} setOpen={setOpen}/>
                    :
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> User Name </th>
                                                        <th> Email </th>
                                                        <th> Phone Number </th>
                                                        <th> IsActive </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        users.length > 0 ?

                                                            users.map((p) =>
                                                                <tr>
                                                                    <td>{p.firstName + " " + p.lastName}</td>
                                                                    <td>{p.email}</td>
                                                                    <td>{p.phoneNumber}</td>
                                                                    <td>{p.isActive ? 'Yes' : 'No'}</td>
                                                                    <td><span typeof="button" style={{ cursor: "pointer" }} onClick={() => handleEdit(p)}><i className="fa fa-edit"></i></span></td>
                                                                </tr>
                                                            )
                                                            :
                                                            <tr>
                                                                <td colSpan={5} style={{ textAlign: "center" }}>No data available</td>
                                                            </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="footer">
                            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023 <a href="https://www.bootstrapdash.com/" target="_blank">BootstrapDash</a>. All rights reserved.</span>
                                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i></span>
                            </div>
                        </footer>

                    </div>
            }
        </>
    )
}

export default UserList