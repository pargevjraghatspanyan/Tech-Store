import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendRequest} from "../../../helpers/sendRequest";

const {sendRequestGet,sendRequestPost,sendRequestDelete,sendRequestPatch} = sendRequest()

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async ()=>{
        const result = await sendRequestGet('http://localhost:3001/users')
        return result
    }
)

export const fetchPostAddUser = createAsyncThunk(
    'users/fetchPostAddUser',
    async (data)=>{
        const result = await sendRequestPost('http://localhost:3001/users',data)
        return result
    }
)

export const fetchDeleteUser = createAsyncThunk(
    'users/fetchDeleteUser',
    async (id)=>{
        await sendRequestDelete(`http://localhost:3001/users/${id}`)
        return id
    }
)

export const fetchPatchEditUser = createAsyncThunk(
    'users/fetchPatchEditUser',
    async (data)=>{
        const result = await sendRequestPatch(`http://localhost:3001/users/${data.id}`,data)
        return result
    }
)


export const fetchPostAddBlockedUser = createAsyncThunk(
    'users/fetchPostAddBlockedUser',
    async (data)=>{
        const result = await sendRequestPost('http://localhost:3001/blockedUsers',data)
        return result
    }
)


export const fetchPostDeleteBlockedUser = createAsyncThunk(
    'users/fetchPostDeleteBlockedUser',
    async (id)=>{
        await sendRequestDelete(`http://localhost:3001/blockedUsers/${id}`)
        return id
    }
)

export const fetchAllBlockedUsers = createAsyncThunk(
    'users/fetchAllBlockedUsers',
    async ()=>{
        const result = await sendRequestGet('http://localhost:3001/blockedUsers')
        return result
    }
)
