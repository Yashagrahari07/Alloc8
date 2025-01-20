import React, { useEffect, useState } from "react";
import '../dash.css';
import team from '../api/data';
import user from '../api/data';
import { useNavigate } from "react-router-dom";

export default function CreateTeam(){
    const navigate=useNavigate()

    const [member,setMember]=useState(
        {member1:{name:'',erno:'',phno:'',otp:''}},
        {member2:{name:'',erno:'',phno:'',otp:''}}
    ) 
    
    const handleSubmit=async (event)=>{
        event.preventDefault()
        const lname=event.target.leadername.value
        const lerno=event.target.lerno.value
        const lphno=event.target.lphno.value
        const mem1name=event.target.mem1name.value
        const erno1=event.target.erno1.value
        const phno1=event.target.phno1.value
        const mem2name=event.target.mem2name.value
        const erno2=event.target.erno2.value
        const phno2=event.target.phno2.value
        // const otp1=event.target.otp1.value
        // const otp2=event.target.otp2.value

    //---To auto increment IDs of new teams that are getting formed ------------  
        let TId=1
        const response = await team.get('/team')
        const teamIDs=[]
        response.data.forEach(element => {
            teamIDs.push([element.teamID])
        });
        teamIDs.sort()
        TId=((parseInt(teamIDs[teamIDs.length-1])+1))

    //console.log(TId)

    //---------make changes in user table also-------------
      //----fetch details then edit-----
       const resp= await user.get('/user')
        let checklder=true
        let checkmem1=true
        let checkmem2=true

        const ldr=resp.data.find(element=>element.erno===lerno)
        if(ldr && ldr.teamID!==null){ checklder=false;}

        const mem1=resp.data.find(element=>element.erno===erno1)
        if(mem1 && mem1.teamID!==null){ checkmem1=false;}

        const mem2=resp.data.find(element=>element.erno===erno2)
        if(mem2 && mem2.teamID!==null){ checkmem2=false}
     
        if(checklder && checkmem1 && checkmem2){
                
            ldr.teamID=TId
            console.log(ldr)
            await user.put(`/user/${ldr.id}`,ldr)

            mem1.teamID=TId
            console.log(mem1)
            await user.put(`/user/${mem1.id}`,mem1)

            mem2.teamID=TId
            console.log(mem2)
            await user.put(`/user/${mem2.id}`,mem2)

            //--------Add this to Team ------------
            const request={teamID:TId,leader:lerno,member1:erno1,member2:erno2,mentorID:null,acptPID:null}
            const res=await team.post('/team',request)
            console.log(res)
            alert("Created Team ")
            navigate('/student')
            window.location.reload()
    //
        }
        else{alert("Enter correct details")}
    //----updated changes-----     
        setMember({
         member1:{name:mem1name,erno:erno1,phno:phno1,otp:'123'}, 
         member2:{name:mem2name,erno:erno2,phno:phno2,otp:'456'}
        })
        
        event.target.reset();
    }
    return(
        <form onSubmit={handleSubmit} className="create-team">
            <label className="teamform">Team Leader Name </label>
            <input style={{position: 'relative',left: '4vw',marginTop:'2vh'}}className="inp" 
            type='text'
            name='leadername'
            id='leadername'
            placeholder="leader name" required></input>
            <div style={{marginTop:'3vh',marginBottom:'3vh'}}>
            <label className="teamform">Enrollment No </label>
            <input  style={{position: 'relative',left: '2vh',marginRight:'10%'}}className="inp"
            type='text'
            name='lerno'
            id='lerno' required></input>
            <label className="teamform">Phone number</label>
            <input style={{position: 'relative',left: '2vh'}} className="inp"
            type='text'
            name='lphno'
            id='lphno' required></input>
            </div>

            <div style={{marginTop:'3vh',marginBottom:'3vh'}}>

                <div style={{marginLeft:'10%', float:'left'}} className="memdetails">
                <label className="teamform">Member 1 </label>
                <input className="inp"
                type='text'
                name='mem1name'
                id='mem1name' required></input>
                <label className="teamform">Enrollment No </label>
                <input className="inp"
                type='text'
                name='erno1'
                id='erno1' required></input>
                <label className="teamform">Phone number</label>
                <input className="inp" 
                type='text'
                name='phno1'
                id='phno1' required></input>
                {/* <div className="buttons">
                    <button className="send"> Send otp</button>
                    <input className="inp" placeholder="enter" required></input>
                    <button className="check">Check</button>
                </div> */}
                </div>
                <div className="memdetails" style={{marginRight:'10%', float:'right'}}>
                <label className="teamform">Member 2 </label>
                <input className="inp"
                type='text'
                name='mem2name'
                id='mem2name' required></input>
                <label className="teamform">Enrollment No </label>
                <input className="inp"
                type='text'
                name='erno2'
                id='erno2' required></input>
                <label className="teamform">Phone number</label>
                <input className="inp"
                type='text'
                name='phno2'
                id='phno2' required></input>
                {/* <div className="buttons">
                    <button className="send"> Send otp</button>
                    <input className="inp" placeholder="enter" required></input>
                    <button className="check">Check</button>
                </div> */}
                </div>             
            </div> 
            <button style={{backgroundColor:'rgb(159, 85, 190)',color:'white',fontSize:'1em',border:'none',padding:'1vh'}}>SUBMIT</button>         
        </form>
    )
}