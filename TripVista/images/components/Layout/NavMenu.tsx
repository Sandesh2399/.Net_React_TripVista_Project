import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { AddAuthData } from "../../redux/AuthSlice";
import { IUserData } from "../../Interfaces/IUserData";

function NavMenu() {
    const authData = useAppSelector(s => s.RootReducer.Auth.authData);
    const dispatch = useAppDispatch();

    const handleLogout =()=>{
        const clearAuthData : IUserData = {
           token : '',
           refreshToken: '',
           role: 'User',
           user: {
            userId:0,
            firstName: '',
            lastName: '',
           }
        }
        dispatch(AddAuthData(clearAuthData));
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
                    <div className="site-navigation">
                        <a href="index.html" className="logo m-0">TripVista <span className="text-primary">.</span></a>

                        <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
                            <li className="active"><NavLink to="Home">Home</NavLink></li>
                            <li><NavLink to="Services">Services</NavLink></li>
                            <li><NavLink to="Destinations">Destinations</NavLink></li>
                            <li><NavLink to="Packages">Packages</NavLink></li>
                            <li><NavLink to="About">About</NavLink></li>
                            <li><NavLink to="ContactUs">Contact Us</NavLink></li>

                            {authData.token ?
                                <li className="has-children">
                                    <a href="#">{authData?.user?.firstName + " " + authData?.user?.lastName}</a>
                                    <ul className="dropdown">
                                        <li role="button"><NavLink to={"/"} role="button" onClick={handleLogout}>Logout</NavLink></li>
                                    </ul>
                                </li>
                                :
                                <li className="has-children">
                                    <a href="#">Login or Create Account</a>
                                    <ul className="dropdown">
                                        <li><NavLink to="Login">Login</NavLink></li>
                                        <li><NavLink to="Signup">Creat Account</NavLink></li>
                                    </ul>
                                </li>}
                        </ul>

                        <a href="#" className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light" data-toggle="collapse" data-target="#main-navbar">
                            <span></span>
                        </a>

                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavMenu;
