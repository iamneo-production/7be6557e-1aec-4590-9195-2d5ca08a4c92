import React, { useState } from 'react';
import '../Assets/styles/Register.css';
import { Link } from 'react-router-dom';
import doodle_login from "../Assets/doodle_login3.jpg";
import axios from 'axios';
const Regiser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNo: '',
    address: '',
    degree: '',
    passingYear: '',
    cgpa: '',
    specilization: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // First Name validation
    if (formData.firstName.trim() === '') { 
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    // Last Name validation
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.match(emailPattern)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long';
      isValid = false;
    }

    // Contact No validation
    if (formData.contactNo.trim() === '') {
      newErrors.contactNo = 'Invalid Contact Number';
      isValid = false;
    }

    // Address validation
    if (formData.address.trim() === '') {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Degree validation
    if (formData.degree.trim() === '') {
      newErrors.degree = 'Degree is required';
      isValid = false;
    }

    // Passing Year validation
    if (formData.passingYear.trim() === '') {
      newErrors.passingYear = 'Passing Year is required';
      isValid = false;
    }

    // CGPA validation
    if (formData.cgpa.trim() === '') {
      newErrors.cgpa = 'CGPA is required';
      isValid = false;
    }

    // Specialization validation
    if (formData.specilization.trim() === '') {
      newErrors.specilization = 'Specialization is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      try{
        const response=await axios.post(
          "http://localhost:8181/api/v1/auth/register",
          {
            firstName:formData.firstName,
            lastName:formData.lastName,
            address:formData.address,
            contactNo:formData.contactNo,
            degree:formData.degree,
            specilization:formData.specilization,
            cgpa:formData.cgpa,
            passingYear:formData.passingYear,
            email:formData.email,
            password:formData.password
          }
        );
        console.log(response.data);
        window.alert("Registration Sucessful");
        console.log('Form submitted:', formData);
        // Reset the form
        setFormData({
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          password: '',
          contactNo: '',
          collegeName:'',
          degree:'',
          passingYear:'',
          cgpa:'',
          specilization:''
        });
        setErrors({});
        window.location.href="/login";
      }catch(error){
        console.error(error);
      }
    
    }
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mainr">
      <img src={doodle_login} alt="Logo" className="logo" />
      <div className="register">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Registration</h2>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div style={{ color: 'red', fontSize: '13px' }}>{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className='error' style={{ color: 'red', fontSize: '13px' }}>{errors.lastName}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                style={{width:"80%"}}
              />
              {errors.email && <div style={{ color: 'red', fontSize: '13px' }}>{errors.email}</div>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div style={{ color: 'red', fontSize: '13px' }}>{errors.password}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="contactNo"
                placeholder='Mobile No'
                value={formData.contactNo}
                onChange={handleChange}
              />
              {errors.contactNo && <div style={{ color: 'red', fontSize: '13px' }}>{errors.contactNo}</div>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="address"
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div style={{ color: 'red', fontSize: '13px' }}>{errors.address}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              >
                <option value="">Select Degree</option>
                <option value="Associate of Arts (AA)">Associate of Arts (AA)</option>
                <option value="Associate of Science (AS)">Associate of Science (AS)</option>
                <option value="Associate of Applied Science (AAS)">Associate of Applied Science (AAS)</option>
                <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                <option value="Bachelor of Science (BS)">Bachelor of Science (BS)</option>
                <option value="Bachelor of Fine Arts (BFA)">Bachelor of Fine Arts (BFA)</option>
                <option value="Master of Arts (MA)">Master of Arts (MA)</option>
                <option value="Master of Science (MS)">Master of Science (MS)</option>
                <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                <option value="Master of Fine Arts (MFA)">Master of Fine Arts (MFA)</option>
                <option value="Doctor of Philosophy (PhD)">Doctor of Philosophy (PhD)</option>
                <option value="Doctor of Medicine (MD)">Doctor of Medicine (MD)</option>
                <option value="Juris Doctor (JD)">Juris Doctor (JD)</option>
                <option value="Bachelor of Laws (LLB)">Bachelor of Laws (LLB)</option>
                <option value="Bachelor of Engineering (BE)">Bachelor of Engineering (BE)</option>
                <option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
                <option value="Master of Engineering (ME)">Master of Engineering (ME)</option>
                <option value="Master of Technology (MTech)">Master of Technology (MTech)</option>
                
              </select>
              {errors.degree && <div style={{ color: 'red', fontSize: '13px' }}>{errors.degree}</div>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="passingYear"
                placeholder='Passing Year'
                value={formData.passingYear}
                onChange={handleChange}
              />
              {errors.passingYear && <div style={{ color: 'red', fontSize: '13px' }}>{errors.passingYear}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="cgpa"
                placeholder='CGPA'
                value={formData.cgpa}
                onChange={handleChange}
              />
              {errors.cgpa && <div style={{ color: 'red', fontSize: '13px' }}>{errors.cgpa}</div>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="specilization"
                placeholder='Specialization'
                value={formData.specilization}
                onChange={handleChange}
              />
              {errors.specilization && <div style={{ color: 'red', fontSize: '13px' }}>{errors.specilization}</div>}
            </div>
          </div>

            <button>Register</button>
          
        </form>
        <p style={{ marginLeft: "290px" }}>Don't you have an account? <Link to="/Login" style={{ textDecoration: "none", color: "#001dbe", fontWeight: "bolder" }}>Sign in</Link> </p>
      </div>
    </div>
  );
};
export default Regiser;
