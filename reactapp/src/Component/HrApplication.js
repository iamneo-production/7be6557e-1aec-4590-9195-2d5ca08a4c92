import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Assets/styles/HrApplication.css"
import { Link } from 'react-router-dom';
import HrNavbar from './HrNavbar';

const AppliedUser = () => {
  const [users, setUsers] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get("http://localhost:8181/api/v1/users", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Fetch all jobs
        const jobsResponse = await axios.get("http://localhost:8181/api/jobs", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Fetch all resumes
        const resumesResponse = await axios.get("http://localhost:8181/resumes", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Extract emails from the resumes data
        const resumeEmails = resumesResponse.data.map(resume => resume.email);
        const resumeJob = resumesResponse.data.map(resume => resume.jobTitle);

        // Filter users with matching emails from the resumes
        const matchedUsers = usersResponse.data.filter(user => resumeEmails.includes(user.email));

        // Filter applied jobs based on the resumes data
        const appliedJobs = jobsResponse.data.filter(job => resumeJob.includes(job.jobTitle));

        // Update state with fetched data
        setUsers(matchedUsers);
        setAppliedJobs(appliedJobs);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mainq'>
        <HrNavbar/>
      <div className="card-container">
      <h2>Applicants: </h2>
        {users.map((user, index) => (
          <div key={user.id} className="job-cxard">
            <h3>{user.firstName} {user.lastName} </h3>
            <strong  style={{color:""}}>Email:</strong> {user.email} <br />

            {appliedJobs.map(job => (
              
              <div key={job.id}>
                <strong>Job Applied:</strong> {job.jobTitle} <br />
                <strong>Department:</strong> {job.dept} <br />
              </div>
              ))}
              <div className="Fullapplication"style={{color:"blue" , cursor:"pointer"}} onClick={()=>{
                 
                  localStorage.setItem("useid",user.id);
            window.location.href="/Fullapplication";
              }
              }>View Applicant</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedUser;
