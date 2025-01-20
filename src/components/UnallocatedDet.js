import React from "react";
import '../dash.css';
import { useState,useEffect } from "react";
import teamtable from '../api/data';
import user from '../api/data';

export default function ViewTeams(){
    const [team,setTeam]=useState([])
    
    async function TeamInfo(){
        const teamsArray=[]
        //----get teams who have been allotted
        let tm=await teamtable.get('/team')
        tm=tm.data.filter(item=>item.acptID===null)
        console.log(tm)
        for(let i=0;i<tm.length;i++){
            let element=tm[i]
            //----get member names---------
            let name=await user.get('/user')
            let lname=name.data.find(item=>item.erno==element.leader)
                lname=lname.name
            let mem1=name.data.find(item=>item.erno===element.member1)
                mem1=mem1.name
            let mem2=name.data.find(item=>item.erno===element.member2)
                mem2=mem2.name
 
            
            teamsArray.push({
                tno:element.teamID,ldr:lname,m1:mem1,m2:mem2
            })
        }  
        console.log(teamsArray)  
        setTeam(teamsArray)  
    }

    useEffect(()=>{
        TeamInfo()
    },[])

    console.log(team)
    const d=team.map(item=>{
        console.log(item)
        return(  
                    
            <tr className="active">
                <td>{item.tno}</td>
                <td><p>{item.ldr}</p>
                    <p>{item.m1}</p>
                    <p>{item.m2}</p></td>              
            </tr>
        
    )
    })

    return(
        <div className="view-teams">
            <table className="table-view">
                <thead>
                    <tr>
                    <td>TeamNo</td>
                    <td style={{width:'70%'}}>Members</td>
                    </tr>                
                </thead>
                <tbody>
                    {d}
                </tbody>
            </table>
        </div>
    )
}