import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import user from '../api/data';

export default function Form(props){  

    const navigate=useNavigate()   

    const[data,setdata]=useState({
        id:"",
        password:""
    });

    function getData(e){
       const {name,value}=e.target;      
       setdata((prev)=>{
        return {...prev,[name]:value}
       }) 
    }

    async function submit(e){
       e.preventDefault(e)
       console.log(props)
    //props.log(data)

       localStorage.setItem("logindata", JSON.stringify(data));
       const saved = localStorage.getItem("logindata");
       const loginData = JSON.parse(saved);
      
       const response=await user.get('/user');
       const logins=response.data;
    //console.log(logins)
        
       if(loginData.id==="" || loginData.password==="") {        
        alert("Missing Fields")
        navigate('/')
       }

       else if(logins.find(element=>element.loginid===loginData.id)){
        
        //-------id is present----------

           let obj=logins.find(element=>element.loginid==loginData.id)
           //console.log(obj);
    
        //------check for password---- & redirect to required dashboard---------

           if(obj.password===loginData.password && obj.role=='S')
           {   //alert("logged in")
               navigate('/student')      
           }
           else if(obj.password===loginData.password && obj.role=='M'){
                navigate('/mentor')
           }
           else if(obj.password===loginData.password && obj.role=='A'){
                navigate('/admin')
           }
           else {
             alert("Wrong Password")
             navigate('/') }  
    } 

    else {
        alert("enter a valid ID ")   
        navigate('/')
    }
                    
   }
    
    useEffect(() => {
        let label=document.querySelectorAll('label').forEach(
            label=>{
                label.innerHTML=label.innerText.split('').map(
                    (letters,i)=>`<span style="transition-delay : ${i*50}ms">${letters}</span>`
                ).join('');
            }
        )
    }, []);

    return(      
    <form className="mainform"action="" >
        <h2>{props.acctype} Account</h2>
        <div  className="input-box">
            <input name="id" onChange={getData} type="text" required/>
            <label>ID</label>
        </div>  
        <div className="input-box">
            <input  name="password" onChange={getData} type="password" required/>
            <label>PassWord</label>
        </div>
        <div className="input-box">
            <input  onClick={submit} type="submit" value="Login"/>
        </div>
    </form>
    )
}