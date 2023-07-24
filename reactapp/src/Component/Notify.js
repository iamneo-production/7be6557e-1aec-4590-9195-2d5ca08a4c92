import React, { useState } from 'react';
import '../Assets/styles/Notify.css';
import axios from 'axios';

const Notify = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    email: '',
    mobileNo: '',
    resumeLink: '',
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
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Added 'Content-Type' header
            },
          }
        );

        // Handle the response if needed
        console.log('Response:', response.data);
        setServerResponse(response.data); // Set the server response in state if you want to display it in the UI
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="notification-application-form">
      <h2>Job Application</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className={errors.jobTitle ? 'error' : ''}
          />
          {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
       
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            placeholder="Mobile No"
            value={formData.mobileNo}
            onChange={handleChange}
            className={errors.mobileNo ? 'error' : ''}
          />
          {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
        </div> 

        <div className="form-group">
          <label htmlFor="resumeLink">Resume Link</label>
          <input
            type="text"
            id="resumeLink"
            name="resumeLink"
            placeholder="Resume Link"
            value={formData.resumeLink}
            onChange={handleChange}
            className={errors.resumeLink ? 'error' : ''}
          />
          {errors.resumeLink && <span className="error">{errors.resumeLink}</span>}
        </div>

        <button type="submit" className="apply-btn">
          Apply Now
        </button>
      </form>
    </div>
  );
};
export default Notify;