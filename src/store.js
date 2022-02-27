import {configureStore, createSlice} from "@reduxjs/toolkit";


const isLogin = createSlice({
    name : "isLoginReducer",
    initialState : false,
    reducers : {
        changeLogin : (state, action) => {
            // state = action.payload;
            return action.payload;
        },
    }
});

const store = configureStore({reducer : isLogin.reducer});

export const {changeLogin} = isLogin.actions;

export default store;