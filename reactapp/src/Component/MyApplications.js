import React, { useState, useEffect } from 'react';
import '../Assets/styles/Jobs.css';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PiBagFill } from 'react-icons/pi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Footer from "./Footer";
import axios from 'axios';

// ... (import statements)

const MyApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email'); // Assuming the email of the logged-in user is stored in 'userEmail' in localStorage

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8181/api/jobs", {
          params: { userEmail }, // Pass the userEmail as a request parameter
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Filter the jobs with 'isApplied' set to true and email matches the logged-in user's email
        const appliedJobs = response.data.filter(job => job.applied && job.email === userEmail);
        setJobs(appliedJobs);
        setFilteredJobs(appliedJobs);
      } catch (error) {
        console.log("Error fetching Data " + error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email'); // Assuming the email of the logged-in user is stored in 'userEmail' in localStorage

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8181/api/savedjobs/${userEmail}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // Extract the jobTitles from the response
        const savedJobTitles = response.data.map(savedJob => savedJob.jobTitle);

        // Filter the jobs based on the savedJobTitles
        const filteredJobs = jobs.filter(job => savedJobTitles.includes(job.jobTitle));
        setFilteredJobs(filteredJobs);
      } catch (error) {
        console.log("Error fetching saved jobs: " + error);
      }
    };

    fetchSavedJobs();
  }, [jobs]);

  const handleExperienceFilterChange = (e) => {
    const filterValue = e.target.value;
    setExperienceFilter(filterValue);
  
    const filtered = filteredJobs.filter((job) => {
      return filterValue === '' || job.experience.includes(filterValue);
    });
  
    setFilteredJobs(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filtered = jobs.filter((job) => {
      const title = job.jobTitle.toLowerCase(); // Corrected the property name to 'jobTitle'
      const company = job.dept.toLowerCase();
      const location = job.location.toLowerCase();
  
      return title.includes(query) || company.includes(query) || location.includes(query);
    });
  
    setFilteredJobs(filtered.filter(job => job.applied));
  };
  
  return (
    <>
      <Navbar />
      <div className="job-list-container">
        <h2 style={{ marginTop: "30px", fontFamily: "poppins", marginBottom: "20px" }}>Saved Jobs</h2>
        <div className="filter-container">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                title='search using designation'
                value={searchQuery}
                className='search'
                onChange={handleSearchChange}
                placeholder="Search jobs..."
                style={{ fontFamily: "poppins", textAlign: "center" }}
              />
            </div>
          </div>
        </div>

        {filteredJobs.map((job) => (
          <div className="job-caxrd" key={job.id}>
            <h3>{job.jobTitle}</h3>
            <p className="company">{job.dept}</p>
            <p className="experience"><PiBagFill className="icon" />workExperience  :   {job.min_experience}-{job.max_experience}</p>
            <p className="location"><FaMapMarkerAlt className="icon" />{job.location}</p>
            <p className="description">{job.description}</p>
            <Link to="/Apply" className='apply-link'>Apply Now</Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MyApplications;

