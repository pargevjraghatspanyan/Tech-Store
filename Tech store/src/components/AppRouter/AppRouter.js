import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/slices/users/usersSlice';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Shop } from '../../pages/Shop/Shop';
import {AdminDashboard} from '../../pages/AdminDashboard/AdminDashboard'
import { Layout } from '../../pages/Layout/Layout';
import { BlockedUser } from '../../pages/BlockedUser/BlockedUser';
import { AdminProducts } from '../../pages/AdminProducts/AdminProducts';

const AppRouter = () => {
    const {isAdmin,isBlocked} = useSelector(selectUsers)
    return (
        <div>
            <Routes>
               {<Route path={'/shop'} element={<Shop/>}/>} 
                <Route path={'/'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
               { isAdmin && <Route path={'/admin/'} element={<Layout/>}>
                                        <Route index element={<AdminDashboard/>}/>
                                        <Route path={'products'} element={<AdminProducts/>}/>
                                   </Route>}
               <Route path='*' element={<NotFound/>}/>
               {(isAdmin || isBlocked) && <Route path='blockedUser' element={<BlockedUser/>}/>}
            </Routes>
        </div>
    );
};

export default AppRouter;