import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchPakageParams } from "../Interfaces/ISearchPackageParams";

type PackageState = {
    searchPackageParams: ISearchPakageParams,
    isLogin: boolean
}

const initialState: PackageState = {
    searchPackageParams: { DestinationId: 0, NoofPeople: 0, PriceRange: [0,0] },
    isLogin: false
}

export const PackageSlice = createSlice({
    name: 'Package',
    initialState: initialState,
    reducers: {
        AddSearchParams: (state, action: PayloadAction<ISearchPakageParams>) => {
            state.searchPackageParams = action.payload
        },
        setIsLogin:(state, action:PayloadAction<boolean>)=>{
            state.isLogin = action.payload
        }
    }
});

export default PackageSlice.reducer;
export const {AddSearchParams,setIsLogin} = PackageSlice.actions;