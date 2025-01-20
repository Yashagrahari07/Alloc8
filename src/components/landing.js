import React from 'react';
import gif from '../icons/first.png';
import logo from '../icons/Project.gif';

export default function Landing(props){
  return(
  <div>     
  <header>
        <div className='header'>
        <img className='logo'src={logo} alt='logo' onClick={()=>{document.location.href='/'}}></img>
        <button className="menubuts" onClick={()=>{document.location.href='#log'}}>Login</button>  
        <button className="menubuts">About Us</button>    
        </div>
      <div className="navgrad"></div>
   </header>
   <div className='main'>
      <div>
        <div className='mainhead'>
          <p className='desc'>JUET Project Allocator </p>
          <div className="title">ALLOC <span>8</span></div>
          <p  className='desc'> Way to handle all project works at fingertips. </p>
      </div>
      <div className='side'><img src={gif} alt='sideimg'></img> </div>     
    </div>
  <div className='login-part'>
  <a id='log'><p className='magic'>LOGIN</p></a>
  </div>
  </div>   
  </div>
    
    )
}
