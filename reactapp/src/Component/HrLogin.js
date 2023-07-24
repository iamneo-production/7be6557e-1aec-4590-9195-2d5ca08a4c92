import React, { useState } from "react";
import '../Assets/styles/Login.css';
import { Link, useNavigate} from "react-router-dom";
import doodle_login from "../Assets/doodle_login3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";
export default function HrLogin() {
  const navigate=useNavigate();
  const user=useSelector((state)=>state.user);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      clearError("email");
    } else if (name === 'password') {
      setPassword(value);
      clearError("password");
    }
  };
  const clearError = (fieldName) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[fieldName];
    setErrors(updatedErrors);
  };

  // function validateForm() {
  //   return email.length > 0 && password.length > 0;

  // }
  const dispatch=useDispatch();
  const handleSubmit=(e)=> {
   
    e.preventDefault();
    const validationErrors = {};
    

    if (!email) {
      validationErrors.email = 'Username is required';
    }
  
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }else{
      const user={
        email,
        password
      }
      navigate("/HrHome");

    }}
  return (
    <div className="main">
      <img src={doodle_login} alt="Logo" className="llogo" />
      <div className="login">
    <form onSubmit={handleSubmit}>
      <h3>Login<MdAdminPanelSettings size={30}/></h3>
      <div className="email">
      <input
          type="email" 
          value={email}
          name="email"
          onChange={handleInputChange}
        placeholder="Enter Email"/>
        {errors.password && <p class="error" style={{fontWeight:"600"}}>{errors.email}</p>}
      </div>
 
      <div  className="email">
      <label>
      <input 
          type="password" 
          name="password"
          value={password}
          onChange={handleInputChange}
        placeholder="Password"/>
        {errors.password && <p class="error">{errors.password}</p>}
      </label>
      </div>
      <div>
      <button type="submit">Sign In</button>
      </div>
     </form>
</div>
    </div>
  );

  }