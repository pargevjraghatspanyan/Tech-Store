import React, { useEffect, useRef, useState } from 'react'
import s from './AdminProducts.module.css'
import { faBoxOpen, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchDeleteProduct,fetchPatchEditProduct } from '../../store/slices/products/productsAPI'
import { selectProducts } from '../../store/slices/products/productsSlice'
import {generatorId} from '../../helpers/generatorId'
import { fetchPostAddProduct } from '../../store/slices/products/productsAPI'
import { ProductModal } from '../../components/ProductModal/ProductModal'


export const AdminProducts = () => {
    const dispatch = useDispatch()
    const {productsData} = useSelector(selectProducts)
    const [modal,setModal] = useState(false)
    const [avatarImg,setAvatarImg] = useState(null)
    const [productId,setproductId] = useState(null)
    const modalRef = useRef(null)

    useEffect(()=> {
        dispatch(fetchAllProducts())
    },[])

    function handlerChangeImg(e) {
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload =() => {
        setAvatarImg(reader.result)
        }
    }

    function handlerSubmit(e){
        e.preventDefault()
        const [title,description,price] = e.target
     
       if(!productsData.find(product => product.title.toLowerCase() === title.value.trim().toLowerCase())){

         const myProduct = {
             id:generatorId(productsData),
             title:title.value.trim(),
             description:description.value.trim(),
             price:Number(price.value),
             avatar:avatarImg,
         }
         dispatch(fetchPostAddProduct(myProduct))
         e.target.reset()
       }
       else {
        alert('This product is already added!')
       }
    }

    function showModal(id) {
        setproductId(id)
        setModal(true)
        modalRef.current.classList.add(s.moveModal)
        let myProduct = productsData.find(product => product.id === id)
        let form = modalRef.current.children[1]
        const [title,description,price] = form.elements
        title.value = myProduct.title
        description.value = myProduct.description
        price.value = myProduct.price
    }

    function closeModal() {
        setModal(false)
        modalRef.current.classList.remove(s.moveModal)
    }
    
    function editProduct(e) {
        e.preventDefault()
        let product = productsData.find(product => product.id === productId)
        const [title,description,price,avatar] = e.target
        
        let myProduct = {
            id:product.id,
            title:title.value.trim() ? title.value.trim() : product.title,
            description:description.value.trim() ? description.value.trim() : product.description,
            price:price.value ? Number(price.value): product.price,
            avatar:avatarImg,
        }

        if(avatar.files.length === 0)  myProduct.avatar = product.avatar  
        dispatch(fetchPatchEditProduct(myProduct))
        closeModal()
    }

  return (
            <>
                <div>
                    <h1 className={s.admin__title}>Products</h1>
                    <div className={s.blocks}>
                        <div className={s.block}>
                        <FontAwesomeIcon icon={faBoxOpen} className={s.products__icon}/>
                        <p className={s.block__productsCount}>{productsData?.length}</p>
                        <p className={s.block__title}>Products</p>
                        </div>
                        <div className={`${s.block} ${s.editSize}`}>
                            <h2 className={s.addProduct}>Add Product</h2>
                            <form className={s.productAddForm} onSubmit={(e)=>handlerSubmit(e)}>
                                <div className={s.formDiv1}>
                                        <input type='text' placeholder='Title' required/>
                                        <input type='text' placeholder='Description' required/>
                                        <input type='text' onChange={(e)=>e.target.value = e.target.value.replace(/[^\d]/g,'')} placeholder='Price' required/>
                                        <input className={s.formFileInput}  type='file' onChange={(e)=>handlerChangeImg(e)} required/>
                                </div>
                                <div className={s.formButton}>
                                    <button>Add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                        <table className={s.products__table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Avatar</th>
                                    <th>Title </th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData.map(product=> (
                                    <tr key={product?.id}>
                                        <td>#{product?.id}</td>
                                        <td> <img src={product?.avatar} alt="" /></td>
                                        <td>{product?.title}</td>
                                        <td>{product?.description}</td>
                                        <td>{product?.price}$</td>
                                        <td>
                                            <button className={`${s.table_btn} ${s.editBtn}`} onClick={()=>showModal(product?.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            <button className={`${s.table_btn} ${s.deleteBtn}`} onClick={()=>dispatch(fetchDeleteProduct(product?.id))}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                ) )}
                            </tbody>
                        </table>
                </div>
                        { <ProductModal modalRef={modalRef} editProduct={editProduct} handlerChangeImg={handlerChangeImg} />}
                        {modal && <div  className={s.coverDiv} onClick={closeModal} ></div>}   
            </>
  )
}
