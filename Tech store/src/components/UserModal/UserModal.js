import React from 'react'
import s from './UserModal.module.css'

export const UserModal = ({modalRef,editUser,handlerChangeImg}) => {
    
  return (
        <div className={s.myModal} ref={modalRef}>
            <h2>Edit User stats</h2>
          <form onSubmit={(e)=>editUser(e)}>
            <input placeholder='Name'  type='text'/>
            <input placeholder='Lastname'  type='text'/>
            <input onChange={(e)=>handlerChangeImg(e)} type='file'/>
            <button>Edit user</button>
          </form>
        </div>
  )
}
