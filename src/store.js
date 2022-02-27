import {configureStore, createSlice} from "@reduxjs/toolkit";


const globalState = createSlice({
    name : "globalStateReducer",
    initialState : {
        isLogin : false,
        currentStudyTimeId : null,
        timerOn : false
    },
    reducers : {
        changeLogin : (state, action) => {
            state.isLogin = action.payload;
            // return action.payload;
        },
        changeCurrentStudyTimeId : (state,action) =>{
            state.currentStudyTimeId = action.payload;
        },
        changeTimerOn : (state,action) => {
            state.timerOn = action.payload;
        }
    }
});

const store = configureStore({reducer : globalState.reducer});

export const {changeLogin ,changeCurrentStudyTimeId,changeTimerOn} = globalState.actions;

export default store;