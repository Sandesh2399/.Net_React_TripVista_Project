import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../redux/Store";

function AdminSidebar() {
    const authData = useAppSelector(s => s.RootReducer.Auth.authData);

    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                            {/* <div className="nav-profile-image">
                                <span className="login-status online"></span>
                            </div> */}
                            <div className="nav-profile-text d-flex flex-column">
                                <span className="font-weight-bold mb-2">{authData?.user?.firstName + " " + authData?.user?.lastName}</span>
                            </div>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to="Dashboard">
                            <span className="menu-title">Dashboard</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </NavLink>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#users" aria-expanded="false" aria-controls="users">
                            <span className="menu-title">Users</span>
                            <i className="mdi mdi-contacts menu-icon" style={{color:"#b66dff"}}></i>
                        </a>
                        <div className="collapse" id="users">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Users">Users list</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#destinations" aria-expanded="false" aria-controls="destinations">
                            <span className="menu-title">Destinations</span>
                            <i className="fa fa-plane menu-icon" style={{color:"#b66dff"}}></i>
                        </a>
                        <div className="collapse" id="destinations">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Destinations">Destinations list</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#packages" aria-expanded="false" aria-controls="packages">
                            <span className="menu-title">Packages</span>
                            <i className="fa fa-picture-o menu-icon" style={{color:"#b66dff"}}></i>
                        </a>
                        <div className="collapse" id="packages">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Packages">Packages list</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#reservations" aria-expanded="false" aria-controls="reservations">
                            <span className="menu-title">Reservations</span>
                            <i className="mdi mdi-table-large menu-icon" style={{color:"#b66dff"}}></i>
                        </a>
                        <div className="collapse" id="reservations">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Reservations">Reservations list</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#hotels" aria-expanded="false" aria-controls="hotels">
                            <span className="menu-title">Hotels</span>
                            <i className="mdi mdi-table-large menu-icon" style={{color:"#b66dff"}}></i>
                        </a>
                        <div className="collapse" id="hotels">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="hotels">Hotels list</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminSidebar