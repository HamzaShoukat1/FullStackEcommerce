import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "../Store/features/cartSlice"
import { getDataFromBrowwer,saveDatainBrowser } from './localstorage';
const persistedState = getDataFromBrowwer()

export const Store = configureStore({
    reducer: {
        cart:cartSlice
    },
    preloadedState:{
        cart:persistedState
    }
});
Store.subscribe(()=> {

    saveDatainBrowser(Store.getState().cart)
})

export type  RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch