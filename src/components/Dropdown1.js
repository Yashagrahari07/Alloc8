//-----------FOR STUDENT DASHBOARD----------------
import React from "react";
import '../dash.css';
export default function DropDown(){
    return(
        <div style={{display:"block",margin:"1vh"}}>
            <div className="dropdown"></div>
            <div className="menu">
                <a  href="/student">MyProfile</a>
                <a href="/student/remaining-students"> Check Students with no teams</a>
                <a href="/student/view-slots"> View All Mentors</a>
                <a href="/student/view-team"> Check ny Team</a>
                <a href="/"> Logout</a>
            </div>
        </div>
        
    )
} 