import React, { useEffect, useState } from "react";
import '../dash.css';
import mentor from '../api/data'
export default function ViewMentors(){
    const [allMentors,setallMentors]=useState([])
    const getallMentors= async()=>{
        const response= await mentor.get('/mentor')
        let final=response.data
        setallMentors(final)
    }
    useEffect(()=>{
        getallMentors()
        
    },[])

    const DispMentors=allMentors.map(item=>{
        
        return(

            <tr>
                <td>{item.erno}</td>
                <td>{item.name}</td>
                {/* <td>{item.phno}</td> */}
                <td>{item.email}</td>
                <td>{item.desc}</td>
                <td>{item.slots}</td>
            </tr>
        )    
    })

    return(
        <div className="view-mentors" style={{fontSize:'80%'}}>
            <table>
            <thead style={{backgroundColor:'rgb(189, 182, 171)'}}>
                    <td style={{width:'7%'}}>Erno</td>
                    <td style={{width:'20%'}}>Member Name</td>
                    {/* <td style={{width:'10%'}}>Phone</td> */}
                    <td style={{width:'7%'}}>Email</td>  
                    <td style={{width:'40%'}}>Desciption</td>  
                    <td style={{width:'5%'}}>Slots</td>                
                </thead>
                {DispMentors}
            </table>
        </div>
    )
}