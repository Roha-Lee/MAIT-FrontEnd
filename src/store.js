import {configureStore, createSlice} from "@reduxjs/toolkit";
import { FacemeshWorkerManager, generateDefaultFacemeshParams, generateFacemeshDefaultConfig } from "@dannadori/facemesh-worker-js";
import { HandPoseWorkerManager, generateDefaultHandPoseParams, generateHandPoseDefaultConfig } from '@dannadori/handpose-worker-js';
import { timeStamp } from "./utils/utils";

const dateObj = new Date();
dateObj.setHours(dateObj.getHours()+9);
const todayBefore7Obj = dateObj.setDate(dateObj.getDate()-7);
const todayBefore7 = new Date(todayBefore7Obj).toJSON().slice(0,10);
const today = timeStamp().slice(0,10);

const faceConfig = generateFacemeshDefaultConfig();
faceConfig.model.maxFaces = 1;
const faceParams = generateDefaultFacemeshParams();
const faceManager = new FacemeshWorkerManager();
faceManager.init(faceConfig);

const handConfig = generateHandPoseDefaultConfig();
handConfig.model.detectionConfidence = 0.6;
  // config.useTFWasmBackend = true;
const handParams = generateDefaultHandPoseParams();
const handManager = new HandPoseWorkerManager();
handManager.init(handConfig);
console.log("init!");
const globalState = createSlice({
    name : "globalStateReducer",
    initialState : {
        isLogin : false,
        // isLogin : true, //To Check
        currentStudyTimeId : null,
        timerOn : false,
        currentStatistics : 1,
        dailyDate : today,
        startDate : todayBefore7,
        endDate : today,
        isZeroShow : false,
        todoList : [],
        subjects : [],
        colorsIdtoCode : {},
        colorsCodetoId : {},
        faceManager : faceManager,
        faceParams : faceParams,
        handManager : handManager,
        handParams : handParams,
        currentUser : "", 
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
        changeTodoLists : (state, action) => {
            state.todoList = action.payload;
        },
        changeSubjects : (state,action) => {
            state.subjects = action.payload;
        },
        changeColorsCodetoId : (state, action) => {
            state.colorsCodetoId = action.payload;
        },
        changeColorsIdtoCode : (state, action) => {
            state.colorsIdtoCode = action.payload;
        },
        changeCurrentUser : (state , action) => {
            state.currentUser = action.payload;
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
    changeTodoLists,
    changeSubjects,
    changeColorsCodetoId,
    changeColorsIdtoCode,
    changeCurrentUser,
} = globalState.actions;

export default store;