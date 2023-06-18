import React from 'react'
import s from './BlockedUser.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/slices/users/usersSlice'

export const BlockedUser = () => {
  const dispatch = useDispatch()
  return (
    <div className={s.blockedUser}>
        <h1>You are blocked!</h1>
        <h2>{<FontAwesomeIcon icon={faXmark}/>}</h2>
        <Link to='/' onClick={()=>dispatch(logOut())}>Back to Login Page </Link>
    </div>
  )
}
