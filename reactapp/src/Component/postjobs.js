import React, { useState } from 'react';
import '../Assets/styles/PostJobForm.css'; // Import CSS file for styling
import HrNavbar from './HrNavbar';
import Footer from './Footer';
import axios from 'axios';

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    dept: '',
    requirement:'',
    location: '',
    description: '',
    min_experience: '',
    max_experience: '',
    salary: '',
    mode: '',
    benefits: '',
    cemail: '',
    ocontact: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.jobTitle.trim() === '') {
      newErrors.jobTitle = 'Job Title is required';
      isValid = false;
    }

    if (formData.dept.trim() === '') {
      newErrors.dept = 'Department is required';
      isValid = false;
    }

    if (formData.location.trim() === '') {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (formData.description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (formData.min_experience.trim() === '') {
      newErrors.min_experience = 'Minimum Experience is required';
      isValid = false;
    }

    if (formData.max_experience.trim() === '') {
      newErrors.max_experience = 'Maximum Experience is required';
      isValid = false;
    }

    if (formData.salary.trim() === '') {
      newErrors.salary = 'Salary is required';
      isValid = false;
    }
    
    if (formData.mode.trim() === '') {
      newErrors.mode = 'Mode is required';
      isValid = false;
    }
    if (formData.requirement.trim() === '') {
      newErrors.requirement = 'Requirement is required';
      isValid = false;
    }
        // Validate email format
        if (formData.cemail.trim() === '') {
          newErrors.oemail = 'Office email address is required';
          isValid = false;
        } else if (!isValidEmail(formData.cemail)) {
          newErrors.cemail = 'Please enter a valid email address';
          isValid = false;
        }
    
        // Validate phone number format
        if (formData.ocontact.trim() === '') {
          newErrors.ocontact = 'Office contact number is required';
          isValid = false;
        } else if (!isValidPhoneNumber(formData.ocontact)) {
          newErrors.ocontact = 'Please enter a valid contact number';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    
      // Helper function to validate email format
      const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      };
    
      // Helper function to validate phone number format
      const isValidPhoneNumber = (phoneNumber) => {
        // Regular expression for phone number validation
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form or perform further actions
      console.log('Form submitted:', formData);
      // Reset the form
      setFormData({
        jobTitle: '',
        dept: '',
        location: '',
        requirement:'',
        description: '',
        min_experience: '',
        max_experience: '',
        salary: '',
        mode: '',
        benefits: '',
        cemail: '',
        ocontact: ''
      });
      setErrors({});

      // Send the job data to the backend API
      const token = localStorage.getItem('token');
      axios
        .post('http://localhost:8181/api/jobs', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Job posted successfully:', response.data);
        })
        .catch((error) => {
          console.log('Error posting job:', error);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <HrNavbar />
      <div className="post-job-container">
        <div className="post-job-card">
          <h2>Post a Job</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
              />
              {errors.jobTitle && <div className="error">{errors.jobTitle}</div>}
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                name="dept"
                placeholder="Department"
                value={formData.dept}
                onChange={handleChange}
              />
              {errors.dept && <div className="error">{errors.dept}</div>}
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <div className="error">{errors.location}</div>}
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <div className="error">{errors.description}</div>}
            </div>
            {/* Add Salary Field */}
            <div className="form-group">
              <label>Salary:</label>
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
              />
              {errors.salary && <div className="error">{errors.salary}</div>}
            </div>

            {/* Add Mode Field */}
            <div className="form-group">
              <label>Mode:</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                // style={{ width: '84%', padding: '12px', fontSize: '15px', fontWeight: '500', color: 'black' }}
              >
                <option value="" style={{ fontSize: '15px', fontWeight: 'bolder', color: 'black' }}>
                  Select Mode of Job
                </option>
                <option value="PartTime" style={{ fontSize: '15px', fontWeight: 'bolder', color: 'black' }}>
                  PartTime
                </option>
                <option value="FullTime" style={{ fontSize: '15px', fontWeight: 'bolder', color: 'black' }}>
                  FullTime
                </option>
              </select>
              {errors.mode && <div className="error">{errors.mode}</div>}
            </div>
            <div className="form-group">
                <label>Requirements:</label>
                <textarea
                  name="requirement"
                  placeholder="Requirements"
                  value={formData.requirement}
                  onChange={handleChange}
                />
                {errors.requirement && <div className="error">{errors.requirement}</div>}
              </div>
            <div className="form-row">
              <div className="form-group">
                <label>Minimum Experience:</label>
                <input
                  type="text"
                  name="min_experience"
                  placeholder="Minimum Experience"
                  value={formData.min_experience}
                  onChange={handleChange}
                  style={{width:"70%"}}
                />
                {errors.min_experience && <div className="error">{errors.min_experience}</div>}
              </div>
              <div className="form-group">
                <label>Maximum Experience:</label>
                <input
                  type="text"
                  name="max_experience"
                  placeholder="Maximum Experience"
                  value={formData.max_experience}
                  onChange={handleChange}
                  style={{width:"70%"}}
                />
                {errors.max_experience && <div className="error">{errors.max_experience}</div>}
              </div>
            </div>
            <div className="form-group">
        <label>Benefits:</label>
        <textarea
          name="benefits"
          placeholder="Benefits"
          value={formData.benefits}
          onChange={handleChange}
        />
        {errors.benefits && <div className="error">{errors.benefits}</div>}
      </div>
      <div className="form-group">
        <label>Office Email Address:</label>
        <input
          type="email"
          name="cemail"
          placeholder="Office Email Address"
          value={formData.cemail}
          onChange={handleChange}
        />
        {errors.cemail && <div className="error">{errors.cemail}</div>}
      </div>
      <div className="form-group">
        <label>Office Contact No:</label>
        <input
          type="text"
          name="ocontact"
          placeholder="Office Contact No"
          value={formData.ocontact}
          onChange={handleChange}
        />
        {errors.ocontact && <div className="error">{errors.ocontact}</div>}
      </div>
            <button type="submit" className="cta-button">
              Post Job
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostJobForm;
