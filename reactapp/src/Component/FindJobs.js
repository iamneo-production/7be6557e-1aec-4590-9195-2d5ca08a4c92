import React, { useState, useEffect } from 'react';
import '../Assets/styles/Jobs.css';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiBagFill } from 'react-icons/pi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Footer from "./Footer";
import axios from 'axios';


const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const token=localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8181/api/jobs", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.log("Error fetching Data " + error);
      }
    };

    fetchData();
  }, []);

  const handleExperienceFilterChange = (e) => {
    const filterValue = e.target.value;
    setExperienceFilter(filterValue);
  
    const filtered = jobs.filter((job) => {
      if (filterValue === '') {
        return true;
      }
  
      const [minExp, maxExp] = filterValue.split('-').map((exp) => exp.trim());
      const jobMinExp = parseInt(job.min_experience, 10);
      const jobMaxExp = parseInt(job.max_experience, 10);
  
      if (!isNaN(jobMinExp) && !isNaN(jobMaxExp)) {
        return jobMinExp >= parseInt(minExp, 10) && jobMaxExp <= parseInt(maxExp, 10);
      }
  
      return false;
    });
  
    setFilteredJobs(filtered);
  };
  
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filtered = jobs.filter((job) => {
      if (!job) return false; // Add a check for undefined job object
      const title = job.jobTitle.toLowerCase();
      const company= job.dept.toLowerCase();
      const location = job.location.toLowerCase();
  
      return title.includes(query) || company.includes(query) || location.includes(query);
    });
  
    setFilteredJobs(filtered);
  };
  const handleBookmarkClick = async (jobId) => {
    try {
      // Find the job with the given jobId
      const jobToUpdate = jobs.find(job => job.id === jobId);
  
      // Toggle the 'applied' field between true and false
      const updatedJob = { ...jobToUpdate, applied: !jobToUpdate.applied };
  
      // Get the logged-in user's email (Assuming you have it stored in localStorage)
      const userEmail = localStorage.getItem('email');
  
      // Include the logged-in user's email in the updated job data
      updatedJob.email = userEmail;
  
      // Make a PUT request to update the job with the new 'applied' field and the user's email
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8181/api/jobs/${jobId}`, updatedJob, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      // Update the jobs array with the updated job
      const updatedJobs = jobs.map(job => job.id === jobId ? updatedJob : job);
      setJobs(updatedJobs);
  
      // If 'applied' is true, save the job to the Savedjobs entity
      if (updatedJob.applied) {
        await axios.post("http://localhost:8181/api/savedjobs", {
          jobTitle: updatedJob.jobTitle,
          email: userEmail
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      } else {
        // If 'applied' is false, delete the job from the Savedjobs entity
        await axios.delete(`http://localhost:8181/api/savedjobs/${userEmail}/${updatedJob.jobTitle}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.log("Error updating job: ", error);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="job-list-container">
        <h2 style={{ marginTop: "30px", fontFamily: "poppins", marginBottom: "20px" }}>Explore New Jobs</h2>
        <p style={{ fontFamily: "poppins", fontSize: "13px", fontWeight: "bold", color: "grey" }}>
          "Discover the Possibilities: Embrace the Journey of New Careers!"
        </p>
        <div className="filter-container">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                value={searchQuery}
                className='search'
                onChange={handleSearchChange}
                placeholder="Search jobs..."
              />
            </div>
            <div className="form-group">
              <select id="experience-filter" value={experienceFilter} onChange={handleExperienceFilterChange}>
                <option value="">All</option>
                <option value="0-1 yrs">0-1 yrs</option>
                <option value="1-3 yrs">1-3 yrs</option>
                <option value="0-5 yrs">0-5 yrs</option>
              </select>
            </div>
          </div>
        </div>

        {filteredJobs.map((job) => (
          
            <div className="job-caxrd" key={job.id}>
              <h3>{job.jobTitle}<span style={{ float: "right", cursor: "pointer" }} onClick={() => handleBookmarkClick(job.id)}>
                {job.applied ? <AiFillHeart style={{ color: "red" }} /> : <AiOutlineHeart />}
              </span></h3>
            <p className="company">{job.dept}</p>
            <p className="experience"><PiBagFill className="icon" />workExperience  :   {job.min_experience}-{job.max_experience}</p>
            <p className="location"><FaMapMarkerAlt className="icon" />{job.location}</p>
            <p className="description">{job.description}</p>
            <div className="apply-link" onClick={()=>{
              localStorage.setItem("job_id",job.id);
              window.location.href="/View";
            }
            }>View Jobs</div>
          </div>
        ))}

      </div>
      <Footer />
    </>
  );
};

export default FindJobs;
