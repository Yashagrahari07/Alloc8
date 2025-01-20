import React from "react";
import '../dash.css';
import user from '../api/data';
import mentor from '../api/data';
export default function CreateUser(){
    async function AddOnSubmit(e){
        e.preventDefault()
        let password;
        const erno=e.target.erno.value
        const name=e.target.name.value
        const phno=e.target.phno.value
        const email=e.target.email.value
        const role=e.target.role.value
        const ProfilePic=e.target.ProfilePic.value
        const loginID=e.target.loginID.value
        const pass1=e.target.pass1.value
        const pass2=e.target.pass2.value
        const desc=e.target.desc.value
        const slots=e.target.slots.value
        
        if(pass1===pass2){
            password=pass1
        }
        else alert("Passwords do not match")
        const request={
            loginid:loginID, 
            password:password,
            erno:erno,
            name:name,
            phno:phno,
            email:email,
            role:role,
            ProfilePic:"",
            teamID:null
        }
        console.log(role)
        if(role==="S"){
            const res=await user.post('/user',request)
            console.log(role)
            alert("Created User Account")
            window.location.reload()
        }  
        if(role==="M"){
            const req={
                erno:erno,
                name:name,
                phno:phno,
                email:email,ProfilePic:'',
                slots:slots, 
                desc:desc
            }
            const res=await user.post('/user',request)
            const resp=await mentor.post('/mentor',req)
            console.log(res)
            console.log(resp)
            alert("Created Mentor Account ")
            window.location.reload()
        }   
    }
    return(
        <form onSubmit={AddOnSubmit} className="create-user">
            <div className="adduserdiv"><label>ErNo : </label>
                 <input required className="inp"
                 type="text" name="erno" id="erno"></input>
                 <div className="adduserdiv"><label>User Name : </label>
                 <input required className="inp"
                 type="text" name="name" id="name"></input>
            </div>
            </div>
            
            <div className="adduserdiv"><label>Phone No : </label>
                 <input required className="inp"
                 type="text" name="phno" id="phno"></input>
                 <div className="adduserdiv"><label>Email : </label>
                 <input required className="inp"
                 type="text"  id="email"></input>
            </div>
            </div>
            
            <div className="adduserdiv"><label>Profile Pic : </label>
                 <input placeholder="upload" className="inp"
                  name="ProfilePic" id="ProfilePic"></input>
                 <div className="adduserdiv"><label>Role : </label>
                 <input required placeholder=" S or M" className="inp"
                 type="text" name="role" id="role"></input>
            </div>
            </div>
            
            <div className="adduserdiv"><label>Description : </label>
                 <input placeholder="for mentor accounts only" className="inp"
                 type="text" name="desc" id="desc"></input>
                 <div className="adduserdiv"><label>Slots : </label>
                 <input placeholder="for mentor accounts only" className="inp"
                 type="text" name="slots" id="slots"></input>
            </div>
            </div>
            <br></br>
            <div className="adduserdiv"><label>Login ID : </label>
                 <input required className="inp"
                 type="text" name="loginID" id="loginID"></input>
            </div>
            <div className="adduserdiv"><label>Set Password : </label>
                 <input required  type="password" className="inp" 
                  name="pass1" id="pass1"></input>
            </div>
            <div className="adduserdiv"><label>Confirm Password : </label>
                 <input required type="password" className="inp"
                 name="pass2" id="pass2"></input>
            </div>
            <br></br>
            <button style={{backgroundColor:'rgb(159, 85, 190)',color:'white',fontSize:'1.2em',border:'none',padding:'1vh'}}>CREATE</button>
            
            
        </form>
    )
}