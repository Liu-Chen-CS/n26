import {configureStore} from "@reduxjs/toolkit";
import billList from "./slices/billList";
export const store = configureStore({
    reducer:{
        billList,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;