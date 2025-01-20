import React, { useState } from 'react';
import mail from '../icons/mailbox.png';
import {
    FaGithubSquare,
    FaInstagramSquare,
    FaLinkedin, 
} from "react-icons/fa";

export default function Footer(){
    const[data,setdata]=useState({
        email:'',
        msg:""
    });
    const [array,setarray]=useState([])
    function getData(e){
      
        const {name,value}=e.target;
        setdata((prev)=>{
         return {...prev,[name]:value}
        })
     }
     function submit(e){
         if(data.email==="" || data.msg==="") {alert("Missing Fields");}
        e.preventDefault();
        console.log(data);
        setarray([...array,data]);
        console.log(array);
    }

    return(
        <div>
        <div className='navgrad'></div>       
        <footer>
        <div className='ftr-first'>
        <div className="write">
            <input name="email"  onChange={getData}placeholder="Your email"></input>
            <input name="msg"  onChange={getData}style={{height:'25vh'}} placeholder="Give us the message "></input>
            <button onClick={submit}>Send</button>                         
        </div>

        <div style={{backgroundColor:'transparent',height: '11vh', width: '10vw',position: 'absolute',bottom:'10%'}} >
        <img src={mail} alt='mail' style={{height:'25vh',width:'15vw',background:'transparent'}}></img></div>  
        </div>
       

            <div className='ftr-sec'>           
            <a className='links' 
            style={{ backgroundColor: 'transparent'}}
            href='https://github.com/' ><FaGithubSquare className='glow' /></a>

            <a className='links' 
            style={{ backgroundColor: 'transparent'}}
            href='#'><FaInstagramSquare className='glow'/></a>

            <a className='links' 
            style={{ backgroundColor: 'transparent'}}
            href='https://www.linkedin.com/'><FaLinkedin className='glow'/></a>
           </div>
        
        </footer>
            <div style={{height:'5vh',width:'100%',background:'black',color:'white'}}>&#169; 2023 Alloc8 SYN</div>
        </div>
    )
}
