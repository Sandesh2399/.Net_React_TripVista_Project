import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootReducer } from "./RootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const Store = configureStore(
    {
        reducer:{
           RootReducer: persistedReducer
        }
    }
)

export const persistor = persistStore(Store);

export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof Store.getState>> = useSelector;
