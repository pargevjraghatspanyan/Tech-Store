import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendRequest} from "../../../helpers/sendRequest";

const {sendRequestGet,sendRequestPost,sendRequestDelete,sendRequestPatch} = sendRequest()

export const fetchAllProducts = createAsyncThunk(
    'users/fetchAllProducts',
    async ()=>{
        const result = await sendRequestGet('http://localhost:3001/products')
        return result
    }
)

export const fetchPostAddProduct = createAsyncThunk(
    'users/fetchPostAddProduct',
    async (data)=>{
        const result = await sendRequestPost('http://localhost:3001/products',data)
        return result
    }
)

export const fetchDeleteProduct = createAsyncThunk(
    'users/fetchDeleteProduct',
    async (id)=>{
        await sendRequestDelete(`http://localhost:3001/products/${id}`)
        return id
    }
)


export const fetchPatchEditProduct = createAsyncThunk(
    'users/fetchPatchEditProduct',
    async (data)=>{
        const result = await sendRequestPatch(`http://localhost:3001/products/${data.id}`,data)
        return result
    }
)


export const fetchPatchAddToCartProduct = createAsyncThunk(
    'users/fetchPatchAddToCartProduct',
    async (data)=>{
        const currentUser = await sendRequestGet(`http://localhost:3001/users/${data.id}`)
        const foundProduct = currentUser.cartProducts.find(cartProduct => cartProduct.id === data.product.id)
        const result = await sendRequestPatch(`http://localhost:3001/users/${data.id}`,{
            cartProducts: foundProduct ? [...currentUser.cartProducts.map(cartProduct => cartProduct.id === data.product.id ?
            {...cartProduct,quantity:cartProduct.quantity + 1,totalPrice:(cartProduct.quantity+1) *cartProduct.price} : cartProduct)]: [...currentUser.cartProducts,{...data.product,quantity:1,totalPrice:data.product.price}]
        })
        result.cartTotalPrice = result.cartProducts.reduce((a,b) =>a+b.totalPrice,0)
        return result
    }
)

export const fetchPatchDeleteCartProduct = createAsyncThunk(
    'users/fetchPatchDeleteCartProduct',
    async (data)=>{
        const currentUser = await sendRequestGet(`http://localhost:3001/users/${data.currentUserId}`)
        const result = await sendRequestPatch(`http://localhost:3001/users/${data.currentUserId}`,{
            cartProducts:[...currentUser.cartProducts.filter(cartProduct => cartProduct.id !== data.productId)],
        })
        result.cartTotalPrice = result.cartProducts.reduce((a,b) =>a+b.totalPrice,0)
        return result
    }
)



export const fetchPatchIncCountCartProduct = createAsyncThunk(
    'users/fetchPatchIncCountCartProduct',
    async (data)=>{
        const currentUser = await sendRequestGet(`http://localhost:3001/users/${data.currentUserId}`)
        const result = await sendRequestPatch(`http://localhost:3001/users/${data.currentUserId}`,{
            cartProducts:[...currentUser.cartProducts.map(cartProduct => cartProduct.id === data.productId ?
            {...cartProduct,quantity:cartProduct.quantity + 1, totalPrice: (cartProduct.quantity + 1)* cartProduct.price} : cartProduct)]
        })
        result.cartTotalPrice = result.cartProducts.reduce((a,b) =>a+b.totalPrice,0)
        return result
    }
)


export const fetchPatchDecCountCartProduct = createAsyncThunk(
    'users/fetchPatchDecCountCartProduct',
    async (data)=>{
        const currentUser = await sendRequestGet(`http://localhost:3001/users/${data.currentUserId}`)
        const result = await sendRequestPatch(`http://localhost:3001/users/${data.currentUserId}`,{
            cartProducts:[...currentUser.cartProducts.map(cartProduct => cartProduct.id === data.productId ?
            {...cartProduct,quantity:(cartProduct.quantity -1) || 1 , totalPrice: ((cartProduct.quantity -1) || 1 ) * cartProduct.price} : cartProduct)]
        })
        result.cartTotalPrice = result.cartProducts.reduce((a,b) =>a+b.totalPrice,0)
        return result
    }
)

