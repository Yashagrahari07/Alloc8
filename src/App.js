import React,{useEffect, useState} from 'react';
import {Route,Routes} from 'react-router-dom';
import Landing  from '../src/components/landing';
import Form from '../src/components/form';
import Footer from '../src/components/footer';
import './App.css';
import './dash.css';
import StuDash from './components/studash';
import CreateTeam from './components/CreateTeam';
import TeamDetails from './components/TeamDetails';
import ViewProposal from './components/ViewProposal';
import ViewSlots from './components/ViewSlots';
import SendProposal from './components/SendProposal';
import MentorDash from './components/MentorDash';
import Admin from './components/Admin';
import NewProposals from './components/NewProposals';
import AcceptedProposals from './components/AcceptedProposals';
import ViewTeams from './components/ViewTeams';
import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import ViewStudents from './components/ViewStudents';
import ViewMentors from './components/ViewMentors';
import GetProposal from './components/GetProposal';
import RemStudents from './components/RemStudents';
import UnallocatedDet from './components/UnallocatedDet';
function App() {
  let [acc,setacc]=useState("Admin")
  // let [loginCred,setlogin]=useState({
  //   id:'',password:''
  // })
  // function login(loginCred){
  //   console.log(loginCred)
  //   setlogin({id:loginCred.id,password:loginCred.password})
  // }
  
  return (
    <div>
    <Routes>   
      <Route path='/' 
          element={
            <div className='landing'>
              <Landing ></Landing>
              <div className='log-opts'>
              <button className='box' onClick={()=>{setacc("Admin")}}>
              <span className="actual-text">&nbsp;Administrator&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Administrator&nbsp;</span>
              </button>  
              <button className='box' onClick={()=>{setacc("Student")}} >
              <span className="actual-text">&nbsp;Student&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Student&nbsp;</span>
              </button>
              <button className='box' onClick={()=>{setacc("Mentor")}}>
              <span className="actual-text">&nbsp;Mentor&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Mentor&nbsp;</span>   
              </button>   
              </div>
              <Form acctype={acc} 
              //</div>log={login}
              />
              <div style={{height:'50vh',width:'100%'}}></div>
              <Footer/>
            </div>    
        }>
        </Route>              
        <Route path='/student' 
              element={
              <div className='studash'><StuDash/></div>} >
                  <Route path='create-team' element={<CreateTeam/>}/>
                  <Route path='view-team' element={<TeamDetails/>}/>
                  <Route path='view-proposal' element={<ViewProposal/>}/>
                  <Route path='send-proposal' element={<SendProposal/>}/>
                  <Route path='view-slots' element={<ViewSlots/>}/>
                  <Route path='view-teams' element={<ViewTeams/>}/>
                  <Route path='remaining-students' element={<RemStudents/>}/>
        </Route>
        <Route path='/mentor' 
              element={
              <div className='mentor'><MentorDash/></div>}>
                  <Route path='view' element={<GetProposal/>}/>
                  <Route path='new-proposals' element={<NewProposals/>}/>                 
                  <Route path='accepted-proposals' element={<AcceptedProposals/>}/>
                  <Route path='view-teams' element={<ViewTeams/>}/>
                  <Route path='view-mentor-slots' element={<ViewSlots/>}/>
        </Route>
        <Route path='/admin' 
        element={
        <div className='admin'><Admin/></div>}>
                  <Route path='create-user' element={<CreateUser/>}/>
                  <Route path='delete-user' element={<DeleteUser/>}/>
                  <Route path='view-student' element={<ViewStudents/>}/>
                  <Route path='view-mentor' element={<ViewMentors/>}/>
                  <Route path='view-teams' element={<ViewTeams/>}/>
                  <Route path='un-allocated-teams' element={<UnallocatedDet/>}/>
                  <Route path='remaining-students' element={<RemStudents/>}/>
                  <Route path='view-mentor-slots' element={<ViewSlots/>}/>
        </Route>
     </Routes>
    </div>
  );
}

export default App;