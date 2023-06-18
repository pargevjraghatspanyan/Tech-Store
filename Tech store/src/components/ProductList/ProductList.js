import React from 'react'
import s from './ProductList.module.css'
import { Product } from '../Product/Product'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../store/slices/products/productsSlice'

export const ProductList = () => {

  const {productsData,filteredProductsData} = useSelector(selectProducts)
  const productList = filteredProductsData.products.length ? filteredProductsData.products : productsData
  return (
        <div className={ filteredProductsData.opacity ? `${s.productList} ${s.opacity} ` : `${s.productList}`}>
            {filteredProductsData.notFound ?  <p>No exact matches found.</p> : productList.map(product => {
                  return <Product product = {product} key={product?.id}/>
            })}
        </div>   
  )
}
