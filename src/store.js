import {configureStore, createSlice} from "@reduxjs/toolkit";
import { timeStamp } from "./utils/utils";

const dateObj = new Date();
dateObj.setHours(dateObj.getHours()+9);
const todayBefore7Obj = dateObj.setDate(dateObj.getDate()-7);
const todayBefore7 = new Date(todayBefore7Obj).toJSON().slice(0,10);
const today = timeStamp().slice(0,10);

const globalState = createSlice({
    name : "globalStateReducer",
    initialState : {
        isLogin : false,
        currentStudyTimeId : null,
        timerOn : false,
        currentStatistics : 1,
        dailyDate : today,
        startDate : todayBefore7,
        endDate : today,
        isZeroShow : false,
    },
    reducers : {
        changeLogin : (state, action) => {
            state.isLogin = action.payload;
        },
        changeCurrentStudyTimeId : (state,action) =>{
            state.currentStudyTimeId = action.payload;
        },
        changeTimerOn : (state,action) => {
            state.timerOn = action.payload;
        },
        changeCurrentStatistics : (state, action) =>{
            state.currentStatistics = action.payload;
        },
        changeDailyDate : (state, action) =>{
            state.dailyDate = action.payload;
        },
        changeStartDate : (state, action) =>{
            state.startDate = action.payload;
        },
        changeEndDate : (state, action) =>{
            state.endDate = action.payload;
        },
        changeIsZeroShow : (state, action) =>{
            state.isZeroShow = action.payload;
        },
    }
});

const store = configureStore({reducer : globalState.reducer});

export const {
    changeLogin,
    changeCurrentStudyTimeId, 
    changeTimerOn, 
    changeCurrentStatistics,
    changeDailyDate,
    changeStartDate,
    changeEndDate,
    changeIsZeroShow,
} = globalState.actions;

export default store;