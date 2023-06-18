import React from 'react'
import s from './Product.module.css'
import { useDispatch, useSelector} from 'react-redux'
import {selectUsers} from '../../store/slices/users/usersSlice'
import {fetchPatchAddToCartProduct } from '../../store/slices/products/productsAPI'

export const Product = ({product}) => {
  const {currentUser} = useSelector(selectUsers)
  const dispatch = useDispatch()

  function addtoCart(){
    dispatch(fetchPatchAddToCartProduct({product,id:currentUser?.id}))
  }
  return (
          <div className={s.product}>
                <h2>{product?.title} {product?.description}</h2>
                <img src={product?.avatar} alt=' '/>
                <p>{product?.price}$</p>
                <div className={s.information}>
                    <button onClick={currentUser ? ()=>addtoCart() : null} className={s.add}>Add to Cart</button>
                </div>
          </div>
)
}
