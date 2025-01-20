import React from "react";
import '../dash.css';
import userpic from '../icons/user.png';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from '../api/data';
import team from '../api/data'
import proposal from '../api/data'
import mentor from '../api/data'

export default function TeamDetails(){
    const navigate=useNavigate();
    
    //---get details of the user logged in------
    
    const saved = localStorage.getItem("logindata");
    const loginData = JSON.parse(saved);

    const [check,setcheck]=useState('F');
    
    const [mem1,setMem1]=useState({
        name:'',erno:'',phno:'',teamID:''
     });
     const [mem2,setMem2]=useState({
         name:'',erno:'',phno:'',teamID:''
     });
    
    function getTeaminfo(logins,erno,teamId){
        
        let element=logins.filter(element=>element.teamID===teamId && element.erno!=erno)
        console.log(element)
       
        if(element.length===2 && element[0].teamID===teamId && element[1].teamID===teamId){ 
            console.log(element[0], element[1])
            setMem1({name:element[0].name,erno:element[0].erno,phno:element[0].phno,teamID:element[0].teamID})
            setMem2({name:element[1].name,erno:element[1].erno,phno:element[1].phno,teamID:element[0].teamID})
         setcheck('T')
         }      
    } 

    const [info,setInfo]=useState(
        {
            projectTitle:'', allottedMentor:''
        }
    )
    const getAccountDetails= async()=>{
            
            const response=await user.get('/user')
            const logins=response.data

            if(logins.find(element=>element.loginid===loginData.id)){               
                // id is present 
                    let obj=logins.find(element=>element.loginid===loginData.id)
            //check for password
                    if(obj.password===loginData.password && obj.role==='S')
                    {   //alert("logged in")                     
                        //console.log(obj);   
                        getTeaminfo(logins,obj.erno,obj.teamID)  
                        
                        const teamresponse = await team.get('/team')
                        let teamNo=teamresponse.data.find(element=>element.teamID==obj.teamID) 
                        console.log(teamNo.mentorID)
                        const accepted=teamNo.acptPID
                        if(accepted===null){ 
                            setInfo({projectTitle:"No Proposal Accepted by Mentor",allottedMentor:'Not assigned'})
                        }
                        else {
                            const getMentor=await mentor.get('/mentor')
                            let mentorName= getMentor.data.find(element=>element.erno==teamNo.mentorID)

                            const getAllProposals=await proposal.get('/proposals')
                            let prop=getAllProposals.data.find(element=>element.id==accepted)
                            //console.log(prop)

                            setInfo({projectTitle:prop.title,allottedMentor:mentorName.name})
                        }

                    }
                    else {
                        alert("Some error occured, Login again.")
                        navigate('/') }  
                }  
            else {
                alert("Some error occured, Login again.")
                navigate('/')
             }  
    }
    useEffect(()=>{
        getAccountDetails();
    },[])
    return(
        <div className="team-details">

            <h1>Team No : {mem1.teamID} </h1>
            <h2>Team Name : {info.projectTitle}</h2>
            <h2>Mentor : {info.allottedMentor}</h2>
            <div className="member-details" >
                <div className="member" style={{marginRight:'10%'}}>
                    <img src={userpic} alt="qwijiqwjs"></img>
                    <p>{mem1.name}</p>
                    <p>{mem1.erno}</p>
                    <p>{mem1.phno}</p>
                </div>
                
                <div className="member">
                    <img src={userpic} alt="qwijiqwjs"></img>
                    <p>{mem2.name}</p>
                    <p>{mem2.erno}</p>
                    <p>{mem2.phno}</p>
                </div>
            </div>
        </div>
    )
}