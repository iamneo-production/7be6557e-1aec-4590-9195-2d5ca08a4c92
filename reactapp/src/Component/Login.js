import React, { useState } from "react";
import '../Assets/styles/Login.css';
import { Link, useNavigate} from "react-router-dom";
import doodle_login from "../Assets/doodle_login3.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function Login() {
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
  const handleSubmit=async(e)=>{
   
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
      try{
        const response=await axios.post(
          "http://localhost:8181/api/v1/auth/authenticate",
          {
            email:email,
            password:password
          }
          ).then((response)=>{
            console.log(response.data);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('email',email);
            console.log(localStorage.getItem('token'));
          })
          
          window.alert("Sucessfully Logged In");
          
          
          
          dispatch({type:"LOGIN",payload:user});
          navigate("/dashboard");
        }catch(error){
          console.log(error);
          window.alert("Invalid Credentials");
        
      }

    }
   
  
  }
  return (
    <div className="main">
      <img src={doodle_login} alt="Logo" className="llogo" />
      <div className="login">
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
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
      <p style={{marginLeft:"40px"}}>Don't you have an account? <Link to ="/Register"  style={{textDecoration:"none", color:"#001dbe",fontWeight:"bolder"}}>SignUp</Link></p>
</div>
    </div>
  );

  }