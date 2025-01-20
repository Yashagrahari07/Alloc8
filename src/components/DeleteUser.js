import React, { useEffect, useState } from "react";
import '../dash.css';
import user from '../api/data';
import mentor from '../api/data';
export default function DeleteUser(){
    const [delName,setdelName]=useState('')
    const [allUsers,setAll]=useState([])
    async function getAllUsers(){
        const res=await user.get('/user') 
        console.log(res.data)
        setAll(res.data) 

    }
    
    async function deleteErno(){
       const res=await user.get('/user')
       let Username=res.data.find(ele=>ele.erno===delName)
       if(Username!==undefined)
       {let id=Username.id
           
        const resp=await user.delete(`/user/${id}`)
        if(Username.role==="M"){
            const res=await mentor.get('/mentor')
            let Username=res.data.find(ele=>ele.erno===delName)
            let id=Username.id
            const resp=await mentor.delete(`/mentor/${id}`)
        }
        Username=Username.name    
        alert("Deleted "+Username)
        window.location.reload()
    }
        
       else alert("Enter correctly")
        
    }

    useEffect(()=>{
        getAllUsers()      
    },[])
    const DispUsers=allUsers.map(item=>{
        console.log(item)
        return(
            
            <tr>
                <td>{item.erno}</td>
                <td>{item.name}</td>
                <td>{item.loginid}</td>
                <td>{item.role}</td>
            </tr>
        )    
    })
    return(
        <div className="delete-user">
            <div className='delete'>
                <input  style={{width:'60%',height:'60%',outline:'none',fontSize:'100%'}}
                        type='text'
                        name='delete'
                        id='delete'
                        placeholder="Enter user erno. "
                        value={delName}
                        onChange={(e)=>{setdelName(e.target.value)}}>
                </input> 

                <button className='delete-button' onClick={deleteErno}>Delete</button>
            </div>
         <table>
                <thead style={{backgroundColor:'rgb(189, 182, 171)'}}>
                    <tr>
                    <td>Erno</td>
                    <td style={{width:"20vw"}}>Member Name</td>
                    <td>login ID</td>
                    <td>Role</td> 
                    </tr>               
                </thead>
                {DispUsers}
             </table>
        </div>
    )
}