//-----------FOR MENTOR DASHBOARD----------------
import React from "react";
import '../dash.css';
export default function DropDown(){
    return(
        <div style={{display:"block",margin:"1vh"}}>
            <div className="dropdown"></div>
            <div className="menu">
                <a  href="/mentor">My Profile</a>
                <a href="/mentor/view-mentor-slots"> View All Mentor Slots</a>
                <a href="/mentor/accepted-proposals"> View Teams under my guidance</a>
                <a href="/"> Logout</a>
            </div>
        </div>
        
    )
} 
