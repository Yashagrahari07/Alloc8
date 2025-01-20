import React, { useState,useEffect } from 'react';
import '../dash.css';
import Dropdown2 from './Dropdown2';
import logo from '../icons/Project.gif';
import navbut from '../icons/nav_but.png';
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import user from '../api/data'

export default function MentorDash(props){
    const navigate=useNavigate()
    const saved = localStorage.getItem("logindata");
    const loginData = JSON.parse(saved);
    
    const [DrpdwnVisible,setDrpdwnVisible]=useState(false);

    const [mentor,setMentor]=useState({name:'',erno:'',email:'',phno:'',slots:''})

    const getAccountDetails= async()=>{
        const response=await user.get('/user')
        const logins=response.data
        if(logins.find(element=>element.loginid===loginData.id)){
            
            // id is present 
                let obj=logins.find(element=>element.loginid===loginData.id)
                console.log(obj);
            
            //check for password
                if(obj.password===loginData.password && obj.role==='M')
                {   //alert("logged in")
                    //go to destination page by passing props using 'state'    
                    setMentor({name:obj.name,erno:obj.erno,email:obj.email,phno:obj.phno})
                    localStorage.setItem("logged_user", JSON.stringify(obj));
                    //console.log(student)              
                }
                else {
                    alert("Wrong Password")
                    navigate('/') }  
            }     
    }
    useEffect(()=>{
        getAccountDetails()
    },[])
    return(
    <div>
        <header> 
        <div className='dashhead'>
        <img className='logo'src={logo} alt='logo' onClick={()=>{navigate('/mentor')}}></img>
        <button className="dbuts" onClick={()=>{navigate('/')}}>Logout</button>  
        <div>
            <img style={{height:'7vh',position:'relative'}}className='navbut'src={navbut} alt='navbut'
            onPointerEnter={()=>{setDrpdwnVisible(true)}} 
             
             ></img>
             <div onPointerLeave={()=>{setDrpdwnVisible(false)}}>
             {DrpdwnVisible && <Dropdown2/>}
             </div>  
        </div>
        </div>
        </header>
        <div className='card'>
        <img className='pict' alt='pict'></img>
        <div className='profile'>
            <p>{mentor.name}</p>
            <p>{mentor.erno}</p>
            <p>{mentor.email}</p>
            <p>{mentor.phno}</p>
            <p>{mentor.slots}</p>
        </div>
       </div>
       <div className='mainside'>
        <div className='top'>
            <button className='options' onClick={()=>navigate('new-proposals')}>New Proposals</button>
            <button className='options' onClick={()=>navigate('accepted-proposals')} >Accepted Proposals</button>
            <button className='options' onClick={()=>navigate('view-teams')} >View All Teams</button>   
        </div>
       <Outlet></Outlet>
       </div>  
    </div>
    )
}