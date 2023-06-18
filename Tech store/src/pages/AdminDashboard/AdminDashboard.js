import React, { useEffect, useRef, useState } from 'react'
import s from './AdminDashboard.module.css'
import { faClock, faLock, faPenToSquare, faTrash, faUnlock, faUser,faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { fetchAllBlockedUsers, fetchAllUsers, fetchDeleteUser, fetchPatchEditUser, fetchPostAddBlockedUser, fetchPostDeleteBlockedUser } from '../../store/slices/users/userAPI'
import { UserModal } from '../../components/UserModal/UserModal'

export const AdminDashboard = () => {
    const dispatch = useDispatch()
    const {usersData,blockedUsers} = useSelector(selectUsers)
    const [modal,setModal] = useState(false)
    const [avatarImg,setAvatarImg] = useState(null)
    const [userId,setUserId] = useState(null)
    const [time,setTime] = useState(null)
    const modalRef = useRef(null)

    useEffect(()=> {
        dispatch(fetchAllUsers())
        dispatch(fetchAllBlockedUsers())
        showTime()
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

    function showModal(id) {
        setUserId(id)
        setModal(true)
        modalRef.current.classList.add(s.moveModal)
        let myUser = usersData.find(user => user.id === id)
        let form = modalRef.current.children[1]
        const [name,lastname] = form.elements 
        name.value = myUser.name
        lastname.value = myUser.lastname
    }

    function closeModal() {
        setModal(false)
        modalRef.current.classList.remove(s.moveModal)
    }
    
    function editUser(e) {
        e.preventDefault()
        let user = usersData.find(user => user.id === userId)
        const [name,lastname,avatar] = e.target
        
        let myUser = {
            id:user.id,
            name:name.value.trim() ? name.value.trim() : user.name,
            lastname:lastname.value.trim() ? lastname.value.trim() : user.lastname,
            avatar:avatarImg
        }

        if(avatar.files.length === 0)  myUser.avatar = user.avatar  
        dispatch(fetchPatchEditUser(myUser))
        closeModal()
    }
    
    function showTime(){
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes(); 
        let s = date.getSeconds(); 
        let session = "AM";
        
        if(h == 0){
            h = 12;
        }
        else if(h > 12){
            h = h - 12;
            session = "PM"
        }
        
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        let time = h + ":" + m + ":" + s + " " + session;
        setTime(time)
        setTimeout(showTime, 1000);
    }


  return (
        <>
            <div>
                <h1 className={s.admin__title}>Dashboard</h1>
                <div className={s.blocks}>
                    <div className={s.block}>
                    <FontAwesomeIcon icon={faUser} className={s.users__icon}/>
                    <p className={s.block__usersCount}>{usersData?.length}</p>
                    <p className={s.block__title}>Users</p>
                    </div>
                    <div className={s.block}>
                        <FontAwesomeIcon className={s.clock} icon={faClock}/>
                        <p className={s.time}>{time}</p>
                    </div>
                    <div className={s.block}>
                    <FontAwesomeIcon icon={faUserSlash} className={s.blockedUsers__icon} />
                    <p className={s.block__usersCount}>{blockedUsers?.length}</p>
                    <p className={`${s.block__title} ${s.blockedUsers__icon}` }>Blocked Users</p>
                    </div>
                </div>
                    <table className={s.users__table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Avatar</th>
                                <th>Name </th>
                                <th>Lastname</th>
                                <th>Login </th>
                                <th>Email</th>
                                <th>Password </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map(user=> (
                                <tr className={blockedUsers.find(blockedUser => blockedUser?.id === user?.id) ? s.backgroundColorRed : null} key={user?.id}>
                                    <td>#{user?.id}</td>
                                    <td> <img src={user?.avatar} alt="" /></td>
                                    <td>{user?.name}</td>
                                    <td>{user?.lastname}</td>
                                    <td>{user?.login}</td>
                                    <td>{user?.email.split('').fill('*',2,-10)}</td>
                                    <td>{user?.password.split('').fill('*',1,-2) }</td>
                                    {user?.id === 1 ? <td className={s.untouchable}>Untouchable</td> : 
                                    <td>
                                        <button className={`${s.table_btn} ${s.blockBtn}`} onClick={()=>dispatch(fetchPostAddBlockedUser(user))} ><FontAwesomeIcon icon={faLock} /></button>
                                        <button className={`${s.table_btn} ${s.unBlockBtn}`} onClick={()=>dispatch(fetchPostDeleteBlockedUser(user?.id))}><FontAwesomeIcon icon={faUnlock} /></button>
                                        <button className={`${s.table_btn} ${s.editBtn}`} onClick={()=>showModal(user?.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        <button className={`${s.table_btn} ${s.deleteBtn}`} onClick={()=>dispatch(fetchDeleteUser(user?.id))}><FontAwesomeIcon icon={faTrash} /></button>
                                    </td>}
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                    </div>
                    <UserModal modalRef={modalRef} editUser = {editUser} handlerChangeImg={handlerChangeImg} />
                    {
                    modal && <div  className={s.coverDiv} onClick={closeModal} ></div>
                    }   
        </>
  )
}
