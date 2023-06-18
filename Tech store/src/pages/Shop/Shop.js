import React, { useEffect } from 'react'
import s from './Shop.module.css'
import { useDispatch } from 'react-redux'
import { fetchAllProducts } from '../../store/slices/products/productsAPI'
import Header from '../../components/Header/Header'
import {ProductList} from '../../components/ProductList/ProductList'

export const Shop = () => {
  const dispatch = useDispatch()
  
    useEffect(()=> {
      dispatch(fetchAllProducts())
    },[])

    return (
      <section className={s.shopSection}>
        <Header/>
        <div className ={s.container}>
        <div className={s.title}>
          <h1>Products</h1>
        </div>
        <ProductList/>
        </div>
      </section>
    )
}
