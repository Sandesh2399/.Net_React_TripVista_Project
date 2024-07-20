import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserData } from "../Interfaces/IUserData";

type authState = {
    authData: IUserData,
    isOpenProfile: boolean,
}

const initialState: authState = {
    authData: {
        token: '',
        refreshToken: '',
        role: 'User',
        user: { userId: 0, firstName: '', lastName: '', email:'', phoneNumber:'', isActive: false,imageUrl:''}
    },
    isOpenProfile: false
}

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        AddAuthData: (state, action: PayloadAction<IUserData>) => {
            state.authData = action.payload
        },
        setOpenProfile: (state,action:PayloadAction<boolean>)=>{
           state.isOpenProfile = action.payload
        },
        UpdateUserData: (state, action: PayloadAction<IUser>) => {
            state.authData.user = action.payload
        }
    }
});

export default AuthSlice.reducer;
export const { AddAuthData, setOpenProfile,UpdateUserData } = AuthSlice.actions;


