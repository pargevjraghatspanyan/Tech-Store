import {Link, NavLink,Outlet, useLocation, useNavigate } from 'react-router-dom';
import s from './Layout.module.css'
import {useDispatch, useSelector} from "react-redux";
import { logOut, selectUsers } from '../../store/slices/users/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge,faGear,faShop,faTable } from '@fortawesome/free-solid-svg-icons';

export function Layout (){
    const {pathname} = useLocation()
    const {currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    function logOutFunction(){
        dispatch(logOut())
        navigate(`/`, {replace:true})
    }

    return(
        <>
       <aside className={s.sidebar}>
            <div className={s.admin}>
                <div className={s.admin__info}>
                    <div className={s.admin__img}>
                    <img src={currentUser?.avatar} alt="" />
                    </div>
                    <div className={s.logOutDiv}>
                        <p>{currentUser?.login}</p>
                        <button className={s.logOut} onClick={logOutFunction}>Log out</button>
                    </div>
                </div>
            </div>
            <nav className={s.menu}>
                <ul className={s.menu__list}>
                    <li className={s.menu__item}><NavLink to={'/admin/'} className={({isActive}) =>`${isActive || pathname === '/admin' ? s.active : ''}`}  ><FontAwesomeIcon icon={faGauge} /> Dashboard</NavLink></li>
                    <li className={s.menu__item}><NavLink to={'/admin/products'} className={({isActive}) =>`${isActive ? s.active : ''}`} ><FontAwesomeIcon icon={faTable} /> Products</NavLink></li>
                </ul>
                
            </nav>
            <div className={s.shop}>
                <Link to={'/shop'}><FontAwesomeIcon icon={faShop} /> Shop</Link>
            </div>
       </aside>
       <section className={s.admin__section}>
        <Outlet/>
       </section>
        </>
    )
}