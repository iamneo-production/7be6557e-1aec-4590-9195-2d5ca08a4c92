import React, { useState } from 'react';
import '../Assets/styles/InterviewForm.css'; // Import CSS file for styling
import HrNavbar from './HrNavbar';
import Footer from './Footer';
import axios from 'axios';

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    JobTitle: '',
    link: '',
    email:'',
    date: '',
    dept: '',
    time: '',
    mode: '',
    location: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.JobTitle.trim() === '') {
      newErrors.JobTitle = 'Job Title is required';
      isValid = false;
    }

    if (formData.link.trim() === '') {
      newErrors.link = 'Link is required';
      isValid = false;
    }

    if (formData.date.trim() === '') {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    if (formData.dept.trim() === '') {
      newErrors.dept = 'Department is required';
      isValid = false;
    }

    if (formData.time.trim() === '') {
      newErrors.time = 'Time is required';
      isValid = false;
    }

    if (formData.mode.trim() === '') {
      newErrors.mode = 'Mode is required';
      isValid = false;
    }

    if (formData.location.trim() === '') {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form or perform further actions
      console.log('Form submitted:', formData);
      // Reset the form
      setFormData({
        JobTitle: '',
        link: '',
        email:'',
        date: '',
        dept: '',
        time: '',
        mode: '',
        location: '',
      });
      setErrors({});

      // Send the interview data to the backend API
      const token = localStorage.getItem('token');
      axios
        .post('http://localhost:8181/api/interviews', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Interview posted successfully:', response.data);
        })
        .catch((error) => {
          console.log('Error posting interview:', error);
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
      <div className="interview-form-container">
        <div className="interview-caxrd">
          <h2 >Interview Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title:</label>
              <input
                type="text"
                name="JobTitle"
                placeholder="Job Title"
                value={formData.JobTitle}
                onChange={handleChange}
              />
              {errors.JobTitle && <div className="error">{errors.JobTitle}</div>}
            </div>
            <div className="form-group">
              <label>Link:</label>
              <input
                type="text"
                name="link"
                placeholder="Link"
                value={formData.link}
                onChange={handleChange}
              />
              {errors.link && <div className="error">{errors.link}</div>}
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="text"
                name="date"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <div className="error">{errors.date}</div>}
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
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                style={{width:"80%"}}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input
                type="text"
                name="time"
                placeholder="Time"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <div className="error">{errors.time}</div>}
            </div>
            <div className="form-group">
              <label>Mode:</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                
              >
                <option value="" style={{ fontSize: '15px', fontWeight: 'bolder', color: 'black' }}>
                  Select Mode
                </option>
                <option value="InPerson" style={{ fontSize: '15px', fontWeight: 'bolder', color: 'black' }}>
                  In-Person
                </option>
                <option value="Virtual" style={{ fontSize: '15px', fontWeight: 'bolder', color: 'black' }}>
                  Virtual
                </option>
              </select>
              {errors.mode && <div className="error">{errors.mode}</div>}
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
            <button type="submit" className="cta-button">
              Post Interview
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InterviewForm;
