import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { selectUsers} from "../../store/slices/users/usersSlice";
import {fetchAllUsers, fetchPostAddUser} from "../../store/slices/users/userAPI";
import { Link, useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generatorId } from '../../helpers/generatorId';
import s from './Registration.module.css'

const Registration = () => {

    const [icon,setIcon] = useState(false)
    const [avatarImg,setAvatarImg] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {usersData} = useSelector(selectUsers)
    useEffect(()=>{
        dispatch(fetchAllUsers())
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
       const [name,lastname,login,email,password,confirmPassword] = e.target
       
       if(password.value.trim() !== confirmPassword.value.trim()){
        alert('Those passwords didnt match. Try again.')
        return
       }
       if(!usersData.find(user => user.login === login.value.trim() || user.email === email.value.trim())){
         const myUser = {
             id:generatorId(usersData),
             name:name.value.trim(),
             lastname:lastname.value.trim(),
             login:login.value.trim(),
             email:email.value.trim(),
             password:password.value.trim(),
             avatar:avatarImg,
         }
         dispatch(fetchPostAddUser(myUser))
         navigate('/')

       }
       else {
        alert('This login or Email address is already in use !')
       }
    }
    return (
        <section className={s.sectionRegistration}>
            <div className={s.titleLogin}>
                <h1 className={s.title}>Registration</h1>
            </div>
            <form className={s.login} onSubmit={handlerSubmit}>
                <input type="text" placeholder='name'minLength={4} autoFocus  required/>
                <input type="text" placeholder='lastname' minLength={4} required/>
                <input type="text" placeholder='login' minLength={6}  required/>
                <input type="email" placeholder='email' minLength={6} required/>
                <div className={s.passwordDiv}>
                <input type={icon ? 'text' : 'password'} placeholder='password' minLength={6} maxLength={20} required/>{icon ? <FontAwesomeIcon onClick={()=> setIcon(!icon)} icon={faEye} /> : <FontAwesomeIcon onClick={()=> setIcon(!icon)} icon={faEyeSlash} />}
                </div>
                <input type="password" placeholder='confirm password' minLength={6} maxLength={20} required/>
                <input type="file" onChange={(e)=>handlerChangeImg(e)}  required/>
                <button className={s.registerButton}>Register</button>
                <p className={s.notMember}>Already registered?<Link to={'/'}>SignIn</Link></p>
            </form>
    </section>
    );
};

export default Registration;