import React, { useRef } from 'react'
import s from './CartProduct.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {selectUsers} from '../../store/slices/users/usersSlice'
import {fetchPatchDecCountCartProduct, fetchPatchDeleteCartProduct, fetchPatchIncCountCartProduct } from '../../store/slices/products/productsAPI'

export const CartProduct = ({product,showCart}) => {
    const {currentUser} = useSelector(selectUsers)
    const dispatch = useDispatch()
    const cartProductRef = useRef(null)

    function deleteCartProduct() {
        cartProductRef.current.classList.add(s.removeAnimation)
        setTimeout(() => {
            dispatch(fetchPatchDeleteCartProduct({productId:product?.id,currentUserId:currentUser?.id}))
            currentUser.cartProducts.length === 1 && showCart()
        }, 600);
    }
    
    return (
            <div className={s.cartItem} ref={cartProductRef} >
                <FontAwesomeIcon icon={faX} onClick={()=>deleteCartProduct()} />
                    <div className={s.imgInfo}>
                        <img src={product?.avatar} alt=' '/>
                    </div>
                    <div className={s.textInfo}>
                        <h3>{product?.title}</h3>
                        <p>{product?.totalPrice} $</p>
                            <div className={s.countBox}>
                                <span onClick={()=>dispatch(fetchPatchDecCountCartProduct({productId:product?.id,currentUserId:currentUser?.id}))}>-</span>
                                <span>{product?.quantity}</span>
                                <span onClick={()=>dispatch(fetchPatchIncCountCartProduct({productId:product?.id,currentUserId:currentUser?.id}))}>+</span>
                            </div>
                    </div>
            </div>  
    )
}
