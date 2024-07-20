import { combineReducers } from "@reduxjs/toolkit";
import PackageSlice  from "./PackageSlice";
import AuthSlice  from "./AuthSlice";

export const RootReducer = combineReducers({
    Package: PackageSlice,
    Auth: AuthSlice
});