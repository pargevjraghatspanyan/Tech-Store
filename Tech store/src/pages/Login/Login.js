import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlockedUsers, fetchAllUsers } from '../../store/slices/users/userAPI';
import { isAuthAdmin, isAuthBlockedUser, logIn, selectUsers } from '../../store/slices/users/usersSlice';
import { Link, useNavigate } from 'react-router-dom';

import s from './Login.module.css'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {usersData,blockedUsers} = useSelector(selectUsers)

    useEffect(()=> {
        dispatch(fetchAllUsers())
        dispatch(fetchAllBlockedUsers())
    },[])
    
    function handlerSubmit(e){
        e.preventDefault()
        const [loginOrEmail,password] = e.target
        const wrongLoginMessage = e.target.children[2]
        const foundUser = usersData.find(user => (user.login === loginOrEmail.value.trim() || user.email === loginOrEmail.value.trim()) && user.password === password.value.trim() )
        const foundAdmin = usersData.find(user => (user.login === loginOrEmail.value.trim() || user.email === loginOrEmail.value.trim()) && user.password === password.value.trim() && user.admin )
        const blockedUser = blockedUsers.find(user => (user.login === loginOrEmail.value.trim() || user.email === loginOrEmail.value.trim()) && user.password === password.value.trim() )
        if(blockedUser){
            password.classList.remove(s.redBorder)
            loginOrEmail.classList.remove(s.redBorder)
            wrongLoginMessage.classList.remove(s.active)
            dispatch(isAuthBlockedUser())
            navigate('blockedUser')
            return
        }
        if(foundUser || foundAdmin) {
            password.classList.remove(s.redBorder)
            loginOrEmail.classList.remove(s.redBorder)
            wrongLoginMessage.classList.remove(s.active)
            dispatch(logIn(foundUser))
            foundAdmin && dispatch(isAuthAdmin()) 
            foundAdmin ? navigate('admin') : navigate('shop')
        }
        else {
            password.classList.add(s.redBorder)
            password.classList.add(s.shakeBorderAnimation)
            loginOrEmail.classList.add(s.redBorder)
            loginOrEmail.classList.add(s.shakeBorderAnimation)
            wrongLoginMessage.classList.add(s.active)
            
            setTimeout(() => {
                password.classList.remove(s.shakeBorderAnimation)
                loginOrEmail.classList.remove(s.shakeBorderAnimation)
            }, 1200);
        }
    }
    return (
        <section className={s.sectionLogin}>
            <div className={s.titleLogin}>
                <h1 className={s.title}>login</h1>
            </div>
            <form className={s.login} onSubmit={(e)=>handlerSubmit(e)}>
                <input type="text" placeholder="Login/email" autoFocus minLength={6} required />
                <input type="password" placeholder="Password" minLength={6} maxLength={20} required />
                <p className={s.wrongLogin}>
                    Invalid username password combination. Try again!</p>
                <button>Login</button>
                <p className={s.notMember}>Not a member?<Link to={'registration'}>SignUp</Link></p>
            </form>
        </section>
    )
};

export default Login;