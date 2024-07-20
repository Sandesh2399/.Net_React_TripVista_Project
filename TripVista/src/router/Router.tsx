import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAppSelector } from "../redux/Store";
import DestinationList from "../components/DestinationList";
import Destinations from "../components/Destinations";
import Login from "../components/Login";
import PackageList from "../components/PackageList";
import Packages from "../components/Packages";
import ReservationList from "../components/ReservationList";
import Services from "../components/Services";
import Signup from "../components/Signup";
import UserList from "../components/UserList";
import Home from "../Home";
import { useEffect } from "react";
import HotelList from "../components/HotelList";
import UserProfileUpdate from "../components/UserProfileUpdate";



export const router = () => {

    const authData = useAppSelector(s => s.RootReducer.Auth.authData);

    useEffect(() => { }, [authData]);

    const routes = createRoutesFromElements(
        <Route element={<Layout />}>
            {authData?.role == 'Admin' ? <>
                {/* <Route path="/*" element={<Dashboard />} /> */}
                <Route path="/*" element={<UserList />} />
                <Route path="/Destinations" element={<DestinationList />} />
                <Route path="/Hotels" element={<HotelList />} />
                <Route path="/Packages" element={<PackageList />} />
                <Route path="/Reservations" element={<ReservationList />} />
            </> : <><Route path="*" element={<Home />} />
                <Route path="/Services" element={<Services />} />
                <Route path="/Packages" element={<Packages />} />
                <Route path="/Destinations" element={<Destinations />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Profile" element={<UserProfileUpdate/>} />
            </>}
        </Route>
    )

    return createBrowserRouter(routes);
};