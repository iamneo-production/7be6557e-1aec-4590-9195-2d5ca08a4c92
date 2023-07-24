import React from "react";
import '../Assets/styles/NavBar.css'
// import { useDispatch, useSelector } from "react-redux";
// import { logout, selectUser } from "../Features/userSlice";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import{CgProfile} from "react-icons/cg";
import {MdOutlineNotificationAdd} from "react-icons/md";

function HrNavbar(){
  return(
      
    <nav className="navbar">
    <ul className="navbar__list">
    <div id="nav">
       <div id="title">
       <Link To ="/" id="logo">HirePro</Link>
    </div>
     </div>
     <div id="item">
      <Link to="/HrHome" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      Home
      </li>
      </Link>
      <Link to="/postjobs" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      CreateJobs
      </li>
      </Link>
      <Link to="/HrApplications" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      Applications
      </li>
      </Link>
      <Link to="/InterviewSchedule" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      Interview Schedule
      </li>
      </Link>
      </div>
      <div id="last">
      <Link to="/Createnotification" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      <MdOutlineNotificationAdd fontSize={25}/>
      </li>
      </Link>
      <Link to="/">       
      <li className="navbar__item" id="profile">
        <CgProfile fontSize={27}/>
      </li></Link>
      </div>
    </ul>
  </nav>

    
  )
}
export default HrNavbar;