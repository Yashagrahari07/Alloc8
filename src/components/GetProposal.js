import React, { useEffect, useState } from "react";
import '../dash.css';
import user from '../api/data';
import proposal from '../api/data';
import teamtable from '../api/data';
import mentor from '../api/data';
import { useLocation, useNavigate } from "react-router-dom";
export default function NewProposals(){
    //----get id of the mentor who has logged into their dashboard
    const loggedUser = localStorage.getItem("logged_user");
    let Usererno = JSON.parse(loggedUser)
    Usererno=Usererno.erno

    const [Buttons,setBut]=useState('')

    const navigate=useNavigate()
    const location=useLocation()
    const id=location.state
    const [team,setMem]=useState([])
    const [form,setForm]=useState({})
    async function getFormDetails(){
        const getid=await proposal.get('/proposals')
        let pid=getid.data.find(ele=>ele.id===id)
        //console.log(pid.desc)
        setForm({
            title:pid.title,
            info1:pid.desc.info1,
            info2:pid.desc.info2,
            info3:pid.desc.info3,
            info4:pid.desc.info4,
            info5:pid.desc.info5,
            info6:pid.desc.info6
        })
        const getTeam=await user.get('/user')
        let members=getTeam.data.filter(ele=>ele.teamID===pid.teamID)
        setMem([members[0].name,members[1].name,members[2].name])

    }
    async function AcceptFunc(){
        const getid=await proposal.get('/proposals')
        let pid=getid.data.find(ele=>ele.id===id) 
        console.log(pid.id)
        pid.status=true;
        const teamno=pid.teamID
        await proposal.put(`/proposals/${id}`,pid)

    //------set all proposal statuses sent by this team to true once it gets accepted by any one mentor-------
        let send=getid.data.filter(ele=>ele.teamID===teamno)
        send.forEach(async(prop)=>{
            prop.status=true
            await proposal.put(`/proposals/${prop.id}`,prop)

        })
    //-----make changes in team details regarding accepted proposal id and id of mentor who has accepted it-----
        const getteam= await teamtable.get('/team')
        let thisteam=getteam.data.find(team=>team.teamID===teamno)
        thisteam.acptPID=pid.id
        thisteam.mentorID=Usererno
        await teamtable.put(`/team/${thisteam.id}`,thisteam)

    //-----Decrement mentor slots------------------------
        const men= await mentor.get('/mentor')
        let mentorDetails=men.data.find(ele=>ele.erno===Usererno)
        mentorDetails.slots=parseInt(mentorDetails.slots)-1
        await mentor.put(`/mentor/${mentorDetails.id}`,mentorDetails)
        alert("Proposal Accepted")
        navigate('/mentor/new-proposals')
    }
    async function DecFunc(){

    }
    //-----Check whether this proposal is accepted or not, else it appears in accepted section with no buttons-----
    async function StatusInfo(){
        const getid=await proposal.get('/proposals')
        let pid=getid.data.find(ele=>ele.id===id)
        if(pid.status!==true){
            setBut(<div style={{display:'block'}}>
            <button className="accept" onClick={AcceptFunc}>Accept</button> 
            <button className="decline" onClick={DecFunc}>Decline</button>
            </div>)
        }
        
    }
    useEffect(()=>{
        getFormDetails()
        StatusInfo()
        
    },[])
    return(
        <div className="get-proposals">
            
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}> 
           <h2 style={{marginRight:'5%'}}>Members :</h2>
            <div><h3>{team[0]}</h3>
            <h3>{team[1]}</h3>
            <h3>{team[2]}</h3>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <table className="desc-table">
            <tr>
                <td><b>Title</b></td>
                <td>{form.title}</td>
            </tr>
            <tr>
                <td><b>Languages Used</b></td>
                <td>{form.info1}</td>
            </tr>
            <tr>
                <td><b>Prerequisite knowledge</b></td>
                <td>{form.info2}</td>
            </tr>
            <tr>
                <td><b>Subjects</b></td>
                <td>{form.info3}</td>
            </tr>
            
            <tr>
                <td><b>Software Tools</b></td>
                <td>{form.info4}</td>
            </tr>
            <tr>
                <td><b>Brief Description</b></td>
                <td>{form.info5}</td>
            </tr>
            <tr>
                <td><b>Outcome</b></td>
                <td>{form.info6}</td>
            </tr>
        </table>
          </div>
          {Buttons}
        </div>
    )
}