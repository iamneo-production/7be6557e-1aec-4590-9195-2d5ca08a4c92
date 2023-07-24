import React, { useState } from 'react';
import '../Assets/styles/Apply.css';
import axios from 'axios';

const Apply = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    email: '',
    mobileNo: '',
    resumeLink: '',
    description: '',
    collegeName: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.jobTitle.trim() === '') {
      newErrors.jobTitle = 'Job title is required';
      isValid = false;
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (formData.mobileNo.trim() === '') {
      newErrors.mobileNo = 'Mobile number is required';
      isValid = false;
    } else if (!isValidMobileNo(formData.mobileNo)) {
      newErrors.mobileNo = 'Invalid mobile number';
      isValid = false;
    }

    if (formData.resumeLink.trim() === '') {
      newErrors.resumeLink = 'Resume link is required';
      isValid = false;
    }
    if (formData.collegeName.trim() === '') {
      newErrors.collegeName = 'CollegeName is required';
      isValid = false;
    }
    
    if (formData.description.trim() === '') {
      newErrors.description = 'description is required';
      isValid = false;
    }
    if (formData.reason.trim() === '') {
      newErrors.reason = 'reason is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobileNo = (mobileNo) => {
    const mobileNoRegex = /^\d{10}$/;
    return mobileNoRegex.test(mobileNo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Make a POST request to the backend
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:8181/resumes',
          {
            jobTitle: formData.jobTitle,
            email: formData.email,
            mobileNo: formData.mobileNo,
            resumeLink: formData.resumeLink,
            description: formData.description,
            collegeName: formData.collegeName,
            reason: formData.reason,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Handle the response if needed
        console.log('Response:', response.data);
        setServerResponse(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
      
    }
  };

  return (
    <div className="job-application-form">
      <h2>Job Application</h2>
      {serverResponse && <div className="server-response">{serverResponse.message}</div>}
      <form onSubmit={handleSubmit}>
       <div className='form-row'>
        <div className="form-group">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            style={{width:"80%"}}
            className={errors.jobTitle ? 'error' : ''}
          /><br/>
          {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
           
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{width:"80%"}}
            className={errors.email ? 'error' : ''}
          /><br/>
          {errors.email && <span className="error">{errors.email}</span>}
        </div></div>
<div className='form-row'>
        <div className="form-group">
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            placeholder="Mobile No"
            value={formData.mobileNo}
            onChange={handleChange}
            className={errors.mobileNo ? 'error' : ''}
          /><br/>
          {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="resumeLink"
            name="resumeLink"
            placeholder="Resume Link"
            value={formData.resumeLink}
            onChange={handleChange}
            className={errors.resumeLink ? 'error' : ''}
          /><br/>
          {errors.resumeLink && <span className="error">{errors.resumeLink}</span>}
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description about the applicant</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            style={{height:"70px"}}
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          /><br/>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            className={errors.collegeName ? 'error' : ''}
          />
          <br/>
          {errors.collegeName && <span className="error">{errors.collegeName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="reason">Why did you apply for this job?</label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Enter your reason for applying"
            value={formData.reason}
            onChange={handleChange}
            style={{height:"70px"}}
            className={errors.reason ? 'error' : ''}
          /><br/>
          {errors.reason && <span className="error">{errors.reason}</span>}
        </div>

        <button type="submit" className="apply-btn">
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default Apply;
