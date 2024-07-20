import { Outlet } from "react-router-dom"
import NavMenu from "./NavMenu"
import Footer from "./Footer"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"
import { useAppSelector } from "../../redux/Store"

function Layout() {
    const authData = useAppSelector(s => s.RootReducer.Auth.authData);

    return (
        authData?.role == 'Admin' ?
            (
                <div className="container-scroller">
                    <AdminHeader />

                    <div className="container-fluid page-body-wrapper">
                        <AdminSidebar />
                        <Outlet />
                    </div>
                </div>
            )
            :
            (<>
                <NavMenu />
                <Outlet />
                <Footer />
            </>)
    )
}

export default Layout