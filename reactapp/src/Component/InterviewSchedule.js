import React, { useState, useEffect } from 'react';
import "../Assets/styles/InterviewSchedule.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillCalendar } from 'react-icons/ai';
import { BiSolidTimeFive } from 'react-icons/bi';
import Navbar from './NavBar';
import axios from 'axios';

const InterviewSchedule = () => {
  const [interviews, setInterviews] = useState([]);


  useEffect(() => {
    // Fetch interview details from the backend API
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage
        const response = await axios.get("http://localhost:8181/api/interviews", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Get the user's email from localStorage
        const userEmail = localStorage.getItem('email');

        // Filter interviews based on the user's email
        const filteredInterviews = response.data.filter(interview => interview.email === userEmail);

        setInterviews(filteredInterviews);
      } catch (error) {
        console.log("Error fetching interview details:", error);
      }
    };

    fetchInterviews();
  }, []);
  return (
    <div className='er'>
      <Navbar/>
        <div className="interview-schedule">
      <h2>Interview Schedule</h2>
      {interviews.map((interview, index) => (
        <div className="interview-card" key={index}>
          <div className="interview-card-header">
            <h3>{interview.dept}</h3>
          </div>
          <div className="interview-card-body">
            <p className="notification-date"><strong><AiFillCalendar className='icon'/>Date:</strong> {interview.date}</p>
            <p className="notification-date"><strong><BiSolidTimeFive className='icon'/>Time:</strong> {interview.time}</p>
            <p className="location"><FaMapMarkerAlt className="icon" />{interview.location}</p>
            <p><strong>Mode: </strong> {interview.mode}</p>
            <p>Interview Link: {interview.link}</p>
           
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default InterviewSchedule;
