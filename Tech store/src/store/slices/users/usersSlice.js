import {createSlice} from "@reduxjs/toolkit";
import {fetchAllBlockedUsers, fetchAllUsers, fetchDeleteUser, fetchPatchEditUser, fetchPostAddBlockedUser, fetchPostDeleteBlockedUser} from "./userAPI";
import {fetchPatchAddToCartProduct,fetchPatchDecCountCartProduct, fetchPatchDeleteCartProduct, fetchPatchIncCountCartProduct } from "../products/productsAPI";

const usersSlice = createSlice({
    name:'users',
    initialState:{
        isAdmin:false,
        isBlocked:false,
        usersData:[],
        currentUser:null,
        blockedUsers:[],
    },
    reducers:{
        logIn:(state,{payload})=> {
            state.currentUser = payload
        },
        isAuthAdmin:(state) => {
            state.isAdmin = true
        },
        logOut:(state) => {
            state.currentUser = null
            state.isBlocked = false
            state.isAdmin = false
        },
        isAuthBlockedUser:(state) => {
            state.isBlocked = true
        }
        
    },
    extraReducers:{
        [fetchAllUsers.fulfilled] : (state,{payload}) => {
            state.usersData = payload
        },
        [fetchDeleteUser.fulfilled]: (state,{payload}) => {
            state.usersData = state.usersData.filter(user => user.id !== payload)
        },
        [fetchPatchEditUser.fulfilled]:(state,{payload}) => {
           state.usersData =  state.usersData.map(user => user.id === payload.id ? {...payload} : user)
        },
        [fetchPostAddBlockedUser.fulfilled]:(state,{payload}) => {
            state.blockedUsers.push(payload)
        },
        [fetchPostDeleteBlockedUser.fulfilled]: (state,{payload}) => {
            state.blockedUsers = state.blockedUsers.filter(user => user.id !== payload)
        },
        [fetchAllBlockedUsers.fulfilled]: (state,{payload})=> {
            state.blockedUsers = payload
        },
        [fetchPatchAddToCartProduct.fulfilled]:(state,{payload}) => {
            state.currentUser = payload
        },
        [fetchPatchDeleteCartProduct.fulfilled]:(state,{payload}) => {
            state.currentUser = payload
        },
        [fetchPatchIncCountCartProduct.fulfilled]:(state,{payload}) => {
            state.currentUser = payload
        },
        [fetchPatchDecCountCartProduct.fulfilled]:(state,{payload}) => {
            state.currentUser = payload
        },
    },
})

export const selectUsers = state => state.users;

export const {logIn,logOut,isAuthAdmin,isAuthBlockedUser} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;