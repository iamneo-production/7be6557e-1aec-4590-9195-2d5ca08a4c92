import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apply from './Apply';
import Navbar from './NavBar';
import '../Assets/styles/JobDetails.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {HiBuildingOffice} from 'react-icons/hi2';
import { AiFillCloseCircle } from 'react-icons/ai';
const ViewJobs = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);

  const handleApplyClick = () => {
    setShowApplyForm(true);
  };
  const jobId = localStorage.getItem("job_id"); // Retrieve the stored job ID from local storage
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const token=localStorage.getItem('token');
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8181/api/jobs/${jobId}`,{
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setJobDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching job details: ", error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobDetails) {
    return <div>Job details not found.</div>;
  }

  return (
    
      <>
    <Navbar/>
    <div className="job-listing-container">
      <div className="job-carxd">
        <div className="job-header">
          <h2 className="job-title">{jobDetails.jobTitle}</h2>
        </div>
        <div className="job-description">
          <p>
         {jobDetails.description}
          </p>
        </div>
        <div className="job-details">
          <div className="company-info">
            <h3 className="company-name"><HiBuildingOffice style={{marginRight:"10px"}}/>{jobDetails.dept}</h3>
            <p className='job-experience'>Experience of Work Expected <> : </>  {jobDetails.min_experience} - {jobDetails.max_experience} yrs</p>
            <p className="location"><FaMapMarkerAlt className="icon" />{jobDetails.location}</p>
          </div>
          <div className="job-info">
            <p className="job-salary">Salary: ${jobDetails.salary}</p>
            <button className="apply-btn"onClick={()=>{
              window.location.href="/apply"
            }} >Apply Now</button>
          </div>
        </div>
        
        <div className="job-requirements">
  <h3 className="section-title">Job Requirements</h3>
  <ul>
    {jobDetails.requirement && jobDetails.requirement.split('.').map((requirement, index) => (
      requirement.trim() && <li key={index}>{requirement}</li>
    ))}
  </ul>
</div>
        <div className="job-benefits">
          <h3 className="section-title">Benefits</h3>
          <ul>
    {jobDetails.benefits&& jobDetails.benefits.split('.').map((benefits, index) => (
      benefits.trim() && <li key={index}>{benefits}</li>
    ))}
  </ul>
  <>
  office-email: <p className='job-experience' style={{color:"#0056b3"}}>{jobDetails.cemail}</p>
  office-contactNo:<p className='job-experience' style={{color:"#0056b3"}}>office-contactNo:{jobDetails.ocontact}</p>
  </>
      
     
        </div>
      </div>
      
    </div>
    </>
  );
};

export default ViewJobs;
