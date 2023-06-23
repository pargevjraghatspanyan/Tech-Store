import React from 'react'
import s from './ProductModal.module.css'

export const ProductModal = ({modalRef,editProduct,handlerChangeImg}) => {
    
  return (
        <div className={s.myModal} ref={modalRef}>
            <h2>Edit product stats</h2>
            <form onSubmit={(e)=>editProduct(e)}>
                    <input placeholder='Title'  type='text'/>
                    <input placeholder='Description'  type='text'/>
                    <input onChange={(e)=>e.target.value = e.target.value.replace(/[^\d]/g,'')}  placeholder='Price'  type='text'/>
                    <input onChange={(e)=>handlerChangeImg(e)} type='file'/>
                    <button>Edit product</button>
            </form>
        </div>
  )
}
