import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { AddAuthData, setOpenProfile } from "../../redux/AuthSlice";
import { IUserData } from "../../Interfaces/IUserData";
import { useEffect } from "react";

function NavMenu() {
    const authData = useAppSelector(s => s.RootReducer.Auth.authData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{},[authData?.user]);

    const handleLogout = () => {
        const clearAuthData: IUserData = {
            token: '',
            refreshToken: '',
            role: 'User',
            user: {
                userId: 0,
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                isActive: false,
                imageUrl:''
            }
        }
        dispatch(AddAuthData(clearAuthData));
        navigate("/");
    }

    return (
        <>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icofont-close js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>
            <nav className="site-nav">
                <div className="container">
                    <div className="site-navigation d-flex justify-content-between align-items-center">
                        <a href="index.html" className="logo m-0">
                            TripVista <span className="text-primary">.</span>
                        </a>

                        <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/services" className="nav-link">
                                    Services
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/destinations" className="nav-link">
                                    Destinations
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/packages" className="nav-link">
                                    Packages
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact-us" className="nav-link">
                                    Contact Us
                                </NavLink>
                            </li>

                            {authData.token ? (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src={authData?.user?.imageUrl || "../../../images/Hotels/HotelBonanza.jpg"}
                                            alt="Profile"
                                            className="rounded-circle me-2"
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                        {authData?.user?.firstName + ' ' + authData?.user?.lastName}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <NavLink className="dropdown-item" to={location.pathname} onClick={()=>dispatch(setOpenProfile(true))}>
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item" to="/" onClick={handleLogout}>
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Login or Create Account
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <NavLink className="dropdown-item" to="/login">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item" to="/signup">
                                                Create Account
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>

                        <a
                            href="#"
                            className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
                            data-toggle="collapse"
                            data-target="#main-navbar"
                        >
                            <span></span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavMenu;
