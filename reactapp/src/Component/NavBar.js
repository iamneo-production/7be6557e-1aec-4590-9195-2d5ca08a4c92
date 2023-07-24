import React from "react";
import '../Assets/styles/NavBar.css'
// import { useDispatch, useSelector } from "react-redux";
// import { logout, selectUser } from "../Features/userSlice";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import{ FiLogOut } from "react-icons/fi";
import {MdOutlineNotificationAdd} from "react-icons/md";

function Navbar(){
  return(
      
    <nav className="navbar">
    <ul className="navbar__list">
    <div id="nav">
       <div id="title">
       <Link To ="/" id="logo">HirePro</Link>
    </div>
     </div>
     <div id="item">
      <Link to="/dashboard" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      Home
      </li>
      </Link>
      <Link to="/findjobs" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      CareerQuest
      </li>
      </Link>
      <Link to="/myApplications" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      Your JobStash
      </li>
      </Link>
      <Link to="/Interview" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      My Interview
      </li>
      </Link>
      </div>
      <div id="last">
      <Link to="/notifications" style={{textDecoration:"none"}}>
      <li className="navbar__item">
      <MdOutlineNotificationAdd fontSize={25}/>
      </li>
      </Link>
      <Link to="/">       
      <li className="navbar__item" id="profile">
      <FiLogOut fontSize={27} />
      </li></Link>
      </div>
    </ul>
  </nav>

    
  )
}
export default Navbar;