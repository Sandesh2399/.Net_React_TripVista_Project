import { useAppDispatch } from "../redux/Store"
import { NavLink, useNavigate } from "react-router-dom";
import { ILogin } from "../Interfaces/ILogin";
import { useState } from "react";
import { AddAuthData } from "../redux/AuthSlice";
import useAxiosAPI from "../API/AxiosService";
import axiosInstance from "../API/AxiosConfig";

function Login() {
    const {loading, fetchData} = useAxiosAPI();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<ILogin>({ email: '', password: '' });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const { result, error } = await fetchData('post', 'User/Login', credentials);

        if (!result) {
            alert(error);
        }
        else {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${result.data.Token}`;
            dispatch(AddAuthData(result.data));
            navigate("/");
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0" style={{ background: "#6998AB" }}>
                        <div className="row w-100 mx-0" style={{ background: "#6998AB" }}>
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="fw-light">Sign in to continue.</h6>
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                        <div className="form-group"> 
                                            <input type="email" name="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" value={credentials.email} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={credentials.password} onChange={handleChange} />
                                        </div>
                                        <div className="mt-3 d-grid gap-2">
                                            <button type="submit" className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn" value={loading?"Loading...":""}>SIGN IN</button>
                                        </div>
                                        {/* <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" /> Keep me signed in </label>
                                            </div>
                                            <a href="#" className="auth-link text-black">Forgot password?</a>
                                        </div> */}
                                        {/* <div className="mb-2 d-grid gap-2">
                                            <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                                                <i className="ti-facebook me-2"></i>Connect using facebook </button>
                                        </div> */}
                                        <div className="text-center mt-4 fw-light"> Don't have an account? <NavLink to="/Signup" className="text-primary">Create</NavLink>
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

export default Login