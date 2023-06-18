import {createSlice} from "@reduxjs/toolkit";
import {fetchAllProducts, fetchDeleteProduct,fetchPatchEditProduct, fetchPostAddProduct } from "./productsAPI";

const productsSlice = createSlice({
    name:'products',
    initialState:{
        productsData:[],
        filteredProductsData:{
            products:[],
            notFound:false,
            opacity:false
        }
    },
    reducers:{
        filterProducts(state,{payload}){
            state.filteredProductsData.products = payload;
            state.filteredProductsData.notFound = false
        },
        resetFilteredProducts(state){
            state.filteredProductsData.notFound = true;
        },
        setOpacity(state,{payload}){
            state.filteredProductsData.opacity = payload
        }
    },
    extraReducers:{
        [fetchAllProducts.fulfilled] : (state,{payload}) => {
            state.productsData = payload
        },
        [fetchDeleteProduct.fulfilled]: (state,{payload}) => {
            state.productsData = state.productsData.filter(product => product.id !== payload)
        },
        [fetchPatchEditProduct.fulfilled]:(state,{payload}) => {
           state.productsData =  state.productsData.map(product => product.id === payload.id ? {...payload} : product)
        },
        [fetchPostAddProduct.fulfilled]: (state,{payload}) => {
            state.productsData.push(payload)
        },
    },
})

export const selectProducts = state => state.products;


export const {filterProducts,setOpacity,resetFilteredProducts} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;