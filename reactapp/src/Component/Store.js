import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
const initialState={
     user:{email:"gokul@123",password:"124"},
};
const reducer = (state = initialState, action)=>{
    console.log(action);
    switch (action.type)
    {
        case 'LOGIN':
            return{
                ...state,
                user:action.payload,
            };
        case 'LOGOUT':
            return{
                ...state,
                user:null,
            };
        default:
            return state;
    }
};
const store = createStore(reducer);
export default store;