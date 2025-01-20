import React, { useEffect } from "react";
import '../dash.css';
import propic from '../icons/user.png';
import { useState } from "react";
import mentor from '../api/data';
import team from '../api/data';
import user from '../api/data';
import proposals from '../api/data';
import { useLocation } from "react-router-dom";

export default function SendProposal(){
    const [sendprop,setprop]=useState(null)
    const [cont,setCont]=useState('')
    const location=useLocation()
    
    let title;
    if ( location.state===null){ 
        // const teamInfo = team.get('/team')
        // let t=teamInfo.data.find(element=>element.teamID)
        title='No proposal form filled, Fill a form to select mentor'
    }
    else {console.log(location.state.request);
         title=location.state.request.title }

    const [mentorDetails,setDetail]=useState([])
    const proposal=[]
     
    const getMentorDetails= async()=>{
        const response=await mentor.get('/mentor')
       setDetail(response.data)
        
    }
    const loggedUser = localStorage.getItem("logged_user");
    const Usererno = JSON.parse(loggedUser);  
    

    const checkTeam = async (Usererno)=>{
        const response=await user.get('/user')
        const logins=response.data
        console.log(logins)
        if(logins.find(element=>element.erno===Usererno.erno)){
            const obj=logins.find(element=>element.erno===Usererno.erno)
            // console.log(obj.teamID)
            if(obj.teamID===null){
                setCont(<h2>You are not a part of any team, Form a team first</h2>)
            }
            else if (obj.teamID){
                setCont(
                <div className="proposal-info">
                    <h2 style={{margin:'none'}}>{obj.teamID}</h2>
                    <span >{title}</span>
                </div>        
              )
            }
        }     
    }
    useEffect(()=>{
        getMentorDetails()
        checkTeam(Usererno)
        if(location.state){
            setprop(location.state.request)
        }
        //console.log(mentorDetails)
        const rows=Math.ceil(mentorDetails.length/4)

    },[])

    const elements=mentorDetails.map(item=>{
        return(
            <div className="mentor-details">
            <div className="info">
            <img src={propic} alt="qwijiqwjs"></img>
            <p style={{fontSize:'1.4em',fontWeight:'600'}}>{item.name}</p>
            <p>{item.email}</p>
            <p style={{fontWeight:'bold',left:'10%'}}>Areas of Interest : </p>
            <p>{item.desc}</p>
            </div>
            <button onClick={async()=>{

            //----check if form is filled, then only send
                if(sendprop===null)
                    {alert("First fill the Form")}

            //----Get which card is clicked upon-----
                else{
                    if(proposal.findIndex(element=>element==item.erno)===-1) {
                        const Proprequest={
                            pid: sendprop.pid,
                            teamID: sendprop.teamID,
                            mentorID: item.erno,
                            desc: sendprop.desc,
                            title: sendprop.title,
                            status: false
                        }
                        console.log(Proprequest)
                    //----creste post request to server 
                     if(item.slots==0) {alert("NO slots left!")}
                     else{
                        const response= await proposals.post('/proposals',Proprequest)
                        if(response) alert("sent")    
                     }              
                    }
                        proposal.push(item.erno)    //-----to avoid multiple entries of same data in proposals array
                    }    
                    // console.log(proposal)
                    
                //-----all mentors that get clicked, details collected to add to database
           
            }} >send</button>
            </div>
        )
    })
    
    return(
       <div className="send-proposal">
          {cont}
          <h3>Select Mentor : </h3>
          <div className="card-container">                 
                {elements.slice(0,4)}
          </div>
          <div className="card-container">                 
                {elements.slice(4,8)}
          </div>
          <div className="card-container">                 
                {elements.slice(8,12)}
          </div>
          <div className="card-container">                 
                {elements.slice(12,16)}
          </div>
       </div>
    )
}