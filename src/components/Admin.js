import React, { useState,useEffect } from 'react';
import '../dash.css';
import Dropdown3 from './Dropdown3';
import logo from '../icons/Project.gif';
import navbut from '../icons/nav_but.png';
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import user from '../api/data';

export default function Admin(){
    const navigate=useNavigate()

    const saved = localStorage.getItem("logindata");
    const loginData = JSON.parse(saved)

    const [DrpdwnVisible,setDrpdwnVisible]=useState(false);

    const [admin,setAdmin]=useState('')

    const getAccountDetails= async()=>{
        const response=await user.get('/user')
        const logins=response.data
        let obj=logins.find(element=>element.loginid===loginData.id)
        console.log(obj);
            
        //------check for password------

    if(obj.password===loginData.password && obj.role==='A')
        {   //alert("logged in")
             setAdmin({name:obj.name,erno:obj.erno,email:obj.email,phno:obj.phno})
        }
    else {
        alert("Wrong Password")
        navigate('/') }  
            
    }

    useEffect(()=>{
        getAccountDetails()
    },[])

    return(
    <div>
        <header> 
        <div className='dashhead'>
        <img className='logo'src={logo} alt='logo' onClick={()=>{navigate(0)}}></img>
        <button className="dbuts" onClick={()=>{navigate('/')}}>Logout</button>  
        <div>
            <img style={{height:'7vh',position:'relative'}}className='navbut'src={navbut} alt='navbut'
            onPointerEnter={()=>{setDrpdwnVisible(true)}} 
             
             ></img>
             <div onPointerLeave={()=>{setDrpdwnVisible(false)}}>
             {DrpdwnVisible && <Dropdown3/>}
             </div>  
        </div>
        </div>
        </header>
        <div className='card'>
        <img className='pict' alt='pict'></img>
        <div className='profile'>
            <p>{admin.name}</p>
            <p>{admin.erno}</p>
            <p>{admin.email}</p>
            <p>{admin.phno}</p>
        </div>
       </div>
       <div className='mainside'>
        <div className='top'>
            <button className='options' onClick={()=>navigate('create-user')}>Create User</button>
            <button className='options' onClick={()=>navigate('delete-user')} >Delete User</button>
            <button className='options' onClick={()=>navigate('view-student')} >View Students</button>
            <button className='options' onClick={()=>navigate('view-mentor')} >View Mentors</button>
            <button className='options' onClick={()=>navigate('view-teams')}>View Teams</button>        
        </div>
       <Outlet></Outlet>
       </div>  
    </div>
    )
}