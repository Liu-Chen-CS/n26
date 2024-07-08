import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch} from "../index";

export type BillType = {
    type: string,
    money: number,
    date: string,
    useFor: "",
    id: number,
}

export type InitialStateType = {
    billList: BillType[];
}

const initialState: InitialStateType = {
    billList: [],
}
const billSlice = createSlice({
    name: "billSlice",
    initialState,
    reducers:{
        setBillList(state:InitialStateType, action: PayloadAction<BillType[]>):void{
            state.billList = action.payload;
        }
    },
});

export const fetchBillList = ()=>{
    return(
        async (dispatch: AppDispatch)=>{
        const {data} = await axios({
            method:"GET",
            url:"http://localhost:8888/data",
        });
        dispatch(setBillList(data));
    });
}

export const {setBillList} = billSlice.actions;
export default billSlice.reducer;