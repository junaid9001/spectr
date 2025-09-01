import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

export default function AdminProtected() {
    const user=JSON.parse(localStorage.getItem("user"));

    if(user&&user.role==="admin"){
        return <Outlet/>
    }
    return <Navigate to='/' replace/>
}
