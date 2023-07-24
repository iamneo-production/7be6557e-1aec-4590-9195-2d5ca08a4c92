import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apply from './Apply';
import Navbar from './NavBar';
import '../Assets/styles/JobDetails.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiBuildingOffice } from 'react-icons/hi2';
import { useId } from 'react';
import HrNavbar from './HrNavbar';
import Notify from './Notify';
import { Link } from 'react-router-dom';

const ViewFull = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const userId = localStorage.getItem("useid");
  const jobId = localStorage.getItem("jobhid");

  const handleApplyClick = () => {
    setShowApplyForm(true);
  };

  const [userData, setUserData] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8181/api/v1/users/id/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Fetch resume data based on user's email
        const resumeResponse = await axios.get(`http://localhost:8181/resumes`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Find the resume data that matches the user's email
        const matchedResume = resumeResponse.data.find(resume => resume.email === userResponse.data.email);

        setUserData(userResponse.data);
        setResumeData(matchedResume); // Set the matched resume data
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user details: ", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User details not found.</div>;
  }

  return (
    <>
      <HrNavbar />
      <div className="job-listing-container">
        <div className="job-carxd">
          <div className="job-header">
            <h2 className="job-title">{userData.firstName} {userData.lastName}</h2>
          </div>
      {resumeData && (
            <div className="resume-details">
              <p style={{color:"green"}}>Job Title: {resumeData.jobTitle}</p>
            </div>
          )}
          <div className="job-description">
            <p>
              {resumeData.description}
            </p>
          </div>
          <div className="job-details">
            <div className="company-info">
              <h3 className="company-name">{userData.degree}</h3>
              
              <p className="location"><FaMapMarkerAlt className="icon" />{userData.address}</p>
            </div>
            <div className="job-info">
              <p className="job-salary">Contact No: {userData.contactNo}</p>
               <div className="apply-link" style={{ backgroundColor:"#004182", padding:"10px", color:"white", cursor:"pointer"}} onClick={()=>{
              localStorage.setItem("res_email",resumeData.email);
              window.location.href="/InterviewSchedule";
            }
            }>Schedule Interview</div>
            </div>
          </div>

          <div className="job-requirements">

            <p>Specialization : {userData.specilization}</p>
          </div>

          <div className="job-requirements">
            <p>CGPA : {userData.cgpa}</p>
          </div>

          <div className="job-requirements">
            <p>PassingYear : {userData.passingYear}</p>
          </div>
          <div className="job-requirements">
            <p>CollegeName : {resumeData.collegeName}</p>
          </div>
          <div className="job-requirements">
            <p>Achivements</p>
          <ul>
    {resumeData.reason&& resumeData.reason.split('.').map((reason, index) => (
      reason.trim() && <li key={index}>{reason}</li>
    ))}
  </ul>
            <p>{}</p>
          </div>
        
        </div>
     
      </div>
    </>
  );
};

export default ViewFull;
