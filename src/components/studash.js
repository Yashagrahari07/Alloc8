import React, { useState,useEffect } from 'react';
import '../dash.css';
import logo from '../icons/Project.gif';
import navbut from '../icons/nav_but.png';
import DropDown1 from './Dropdown1';
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import user from '../api/data'

export default function StuDash(){
    const [DrpdwnVisible,setDrpdwnVisible]=useState(false);
    const navigate=useNavigate()  
    //const loginData=props.log
    const saved = localStorage.getItem("logindata");
    const loginData = JSON.parse(saved);

    //console.log(loginData)
    const [student,setStudent]=useState({name:'',erno:'',email:'',phno:'',teamID:''})

    const logins=[]
    const [check,setcheck]=useState('F');

    function getTeaminfo(logins,erno,teamId){    
        let element=logins.filter(element=>element.teamID===teamId && element.erno!=erno)
        //console.log(element)
        if(element.length===2 && element[0].teamID===teamId && element[1].teamID===teamId){ 
         setcheck('T')
         }      
    } 

    const getAccountDetails= async()=>{
        const response=await user.get('/user')
        const logins=response.data
        if(logins.find(element=>element.loginid===loginData.id)){
            
            // id is present 
                let obj=logins.find(element=>element.loginid===loginData.id)
                console.log(obj);
            
            //check for password
                if(obj.password===loginData.password && obj.role==='S')
                {   //alert("logged in")
                    localStorage.setItem("logged_user", JSON.stringify(obj));
            
                    console.log(obj);   
                    setStudent({name:obj.name,erno:obj.erno,email:obj.email,phno:obj.phno,teamID:obj.teamID})
                    getTeaminfo(logins,obj.erno,obj.teamID)
                    //console.log(student)              
                }
                else {
                    alert("Wrong Password")
                    navigate('/') }  
            }     

    }
  
    useEffect(()=>{
       
        //console.log(getAccountDetails())
        getAccountDetails()
        
        console.log(logins)
        
    },[] )
      
    function teamDetails(){
        if(check==='T'){
            navigate('view-team')        
        }
        else   navigate('create-team')
    }


// jsx to student dashboard page
    return(
    <div>
        <header> 
        <div className='dashhead'>
        <img className='logo'src={logo} alt='logo' onClick={()=>{navigate('/student')}}></img>
        <button className="dbuts" onClick={()=>{navigate('/')}}>Logout</button> 
        <div>
            <img style={{height:'7vh',position:'relative'}}className='navbut'src={navbut} alt='navbut'
            onPointerEnter={()=>{setDrpdwnVisible(true)}} 
             
             ></img>
             <div onPointerLeave={()=>{setDrpdwnVisible(false)}}>
             {DrpdwnVisible && <DropDown1/>}
             </div>             
        </div>     
        </div> 
        </header>
        <div className='card'>
        <img className='pict' alt='pict'></img>
        <div className='profile'>
            <p>{student.name}</p>
            <p>{student.erno}</p>
            <p>{student.email}</p>
            <p>{student.phno}</p> 
        </div>
       </div>
       <div className='mainside'>
        <div className='top'>
            <button className='options' onClick={teamDetails}>Create/View Team</button>
            <button className='options' onClick={()=>navigate('view-proposal')} >View Proposal</button>
            <button className='options' onClick={()=>navigate('send-proposal')} >Send Proposal</button>
            <button className='options' onClick={()=>navigate('view-slots')}>View Slots</button>  
            <button className='options' onClick={()=>navigate('view-teams')}>View All Teams</button>       
        </div>
       <Outlet></Outlet>
       </div>  
    </div>
    )
}