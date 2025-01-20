import React, { useEffect, useState } from "react";
import '../dash.css';
import user from '../api/data'
export default function ViewStudents(){
    const [allStudents,setAllStudents]=useState([])
    const getAllStudents= async()=>{
        const response= await user.get('/user')
        let final=response.data.filter(element=>element.role=="S" && element.teamID===null)
        final.sort()
        setAllStudents(final)
    }
    useEffect(()=>{
        getAllStudents()
        console.log(allStudents)
    },[])

    const DispStudents=allStudents.map(item=>{
        console.log(item)
        return(
            
            <tr>
                <td>{item.erno}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phno}</td>
            </tr>
        )    
    })


    return(
        <div className="view-students">
             <table>
                <thead style={{backgroundColor:'rgb(189, 182, 171)'}}>
                    <td>Erno</td>
                    <td>Member Name</td>
                    <td>Email</td>
                    <td>Contact no.</td>                
                </thead>
                {DispStudents}
             </table>
        </div>
    )
}