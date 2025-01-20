import React, { useEffect, useState } from "react";
import '../dash.css';
import proposal from '../api/data'
import { useNavigate } from "react-router-dom";
export default function NewProposals(){
    const navigate=useNavigate()
    //----get id of the mentor who has logged into their dashboard
    const loggedUser = localStorage.getItem("logged_user");
    const Usererno = JSON.parse(loggedUser)

    const [allProps,setProps]=useState([])

    const getAllProps=async ()=>{
        const res= await proposal.get('/proposals')
        let filtered=res.data.filter(element=>element.mentorID==Usererno.erno && element.status==false)
        setProps(filtered)
    }
    // async function ViewFunc(){
    //     console.log(allProps)
    // }
    useEffect(()=>{
        getAllProps();
    },[])
    const DispProps=allProps.map(item=>{
        return(
            <div className="disp-proj">
                <div className="id">{item.teamID}</div>
                <h6 className="prop-title">{item.title}</h6>
                <button onClick={()=>{navigate('/mentor/view',{state:item.id})}}>View</button>
            </div>
        )
    })
    return(
        <div className="new-proposals">
            <br></br>
            {DispProps}
        </div>
    )
}