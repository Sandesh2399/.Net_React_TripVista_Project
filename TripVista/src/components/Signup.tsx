import { useState } from "react"
import { ISignup } from "../Interfaces/ISignup"
import useAxiosAPI from "../API/AxiosService";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/Store";
import axiosInstance from "../API/AxiosConfig";
import { AddAuthData } from "../redux/AuthSlice";

function Signup() {
    const { fetchData } = useAxiosAPI();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<ISignup>({firstName:'',lastName:'',email:'',username:'',phoneNumber:'',password:'',confirmPassword:''});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const { result, error } = await fetchData('post', 'User/Register', userData);

        if (!result) {
            alert(error);
        }
        else {
            await handleLogin();
        }
    }

    const handleLogin = async () => {

        const { result, error } = await fetchData('post', 'User/Login', {email:userData.email,password:userData.password});

        if (!result) {
            alert(error);
        }
        else {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${result.data.Token}`;
            dispatch(AddAuthData(result.data));
            navigate("/");
        }
    }

    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0" style={{ background: "#6998AB" }}>
                        <div className="row w-100 mx-0" style={{ background: "#6998AB" }}>
                            <div className="col-lg-6 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-5">
                                    <h4>New here?</h4>
                                    <h6 className="fw-light">Signing up is easy. It only takes a few steps</h6>
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                    <div className="row">
                                            <div className="form-group col-6">
                                                <input type="text" name="firstName" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="First Name" value={userData?.firstName} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group col-6">
                                                <input type="text" name="lastName" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Last Name" value={userData?.lastName} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-12">
                                                <input type="email" name="email" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Email" value={userData?.email} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-6">
                                                <input type="text" name="username" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" value={userData?.username} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group col-6">
                                                <input type="text" name="phoneNumber" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Phone No" value={userData?.phoneNumber} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-6">
                                                <input type="password" name="password"className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Password" value={userData?.password} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group col-6">
                                                <input type="password" name="confirmPassword" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Confirm Password" value={userData?.confirmPassword} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="mt-3 d-grid gap-2">
                                            <button type="submit" className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">SIGN UP</button>
                                        </div>
                                        <div className="text-center mt-4 fw-light"> Already have an account? <NavLink to="/Login" className="text-primary">Login</NavLink>
                                        </div>
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

export default Signup