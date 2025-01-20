import React, { useEffect, useState } from "react";
import mentor from '../api/data';

export default function ViewSlots(){
    const [mentors,setMentors]=useState([])
    const getMentor= async()=>{
        const response= await mentor.get('/mentor')
        const Mentors=response.data
        console.log(Mentors)
        setMentors(Mentors)

    }
    useEffect(()=>{
        getMentor()
        console.log(mentors)

    },[])
 
    const allMentors=mentors.map(item=>{
        console.log(item)
        return(
            <div> 
                <p class="fn">{item.name}</p>
                <p class="slot">{item.slots}</p>
            </div>
        )    
    })
    console.log(allMentors)
    return(
            <div className="second">
                <div class="s1">
                    {allMentors.slice(0,7)}
                </div>
                <div class="s2">
                    {allMentors.slice(7,14)}
                </div>
            </div>
    )
}