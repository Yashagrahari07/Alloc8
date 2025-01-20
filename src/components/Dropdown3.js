//-----------FOR ADMIN DASHBOARD----------------
import React from "react";
import '../dash.css';
export default function DropDown(){
    return(
        <div style={{display:"block",margin:"1vh"}}>
            <div className="dropdown"></div>
            <div className="menu">
                <a  href="/admin">MyProfile</a>
                <a href="/admin/remaining-students"> Check Students with no teams</a>
                <a href="/admin/view-mentor-slots"> View All Mentor Slots</a>
                <a href="/admin/un-allocated-teams"> Check Un-allocated Teams</a>
                <a href="/admin/create-team"> Add new mentor detail</a>
                <a href="/"> Logout</a>
            </div>
        </div>
        
    )
} 