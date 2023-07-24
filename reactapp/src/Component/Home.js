import React from "react";
import { FaUser} from "react-icons/fa";
import "../Assets/styles/Home.css";
import {BsArrowBarRight} from 'react-icons/bs';
import Footer from "./Footer";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios';
function HomePage() {
  const token = localStorage.getItem('token');
  const [lastThreeJobs, setLastThreeJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    const fetchLastThreeJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8181/api/jobs/lastThree",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "cache-control": "no-cache",
            },
          }
        );
        setLastThreeJobs(response.data);
      } catch (error) {
        console.log("Error fetching last three jobs: " + error);
      }
    };
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8181/api/jobs/applied",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "cache-control": "no-cache",
            },
          }
        );
        setAppliedJobs(response.data);
      } catch (error) {
        console.log("Error fetching applied jobs: " + error);
      }
    };

    fetchLastThreeJobs();
    fetchAppliedJobs();
  }, [token]);


  const recommendedJobs = [
    {
      id: 1,
      title: "UI/UX Designer",
      company: "Design Co.",
      location: "Los Angeles, USA",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Data Corp.",
      location: "Chicago, USA",
    },
    {
      id: 5,
      title: "Front-end Developer",
      company: "ABC Company",
      location: "New York, USA",
    },
    {
      id: 6,
      title: "Front-end Developer",
      company: "ABC Company",
      location: "New York, USA",
    },
    {
      "id": 10,
      "title": "Software Engineer",
      "company": "Amazon Web Services",
      "location": "Seattle, WA",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum urna non urna tincidunt, in tristique mauris gravida. Sed rhoncus felis quis metus tempus rutrum."
    }
    // Add more recommended job objects as needed
  ];

 
const user = useSelector((state)=>state.user);
const [userData, setUserData] = useState([]);
const userId = localStorage.getItem('userId');

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8181/api/v1/users/id/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "cache-control": "no-cache",
          },
        }
      );

      const userData = response.data;
      setUserData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        email: userData.email,
        contactNo: userData.contactNo,
        degree: userData.degree,
        specialization: userData.specialization,
        cgpa: userData.cgpa,
        passingYear: userData.passingYear,
      });
    } catch (error) {
      console.log("Error fetching Data " + error);
    }
  };

  fetchData();
}, [userId, token]);

  const showViewAllJobs = recommendedJobs.length > 3; // Check if there are more than 3 recommended jobs

  return (
    <>
      <Navbar/>
      <div className="home-page">
        <h1>{user.email}</h1>

        <div className="profile-card">
          <div className="profile-details">
            <div className="profile-info">
               <h3><FaUser size={20}/>{userData.firstName} {userData.lastName}</h3>
                <p>Email: {userData.email}</p>
                <p>{userData.contactNo}</p>
                <p>{userData.address}</p>
              
          
              <Link to="/editprofile"><button>Edit profile</button></Link>
         
        
            </div>
          </div>
        </div>

        <div className="new-job-section">
          <h2>Explore New Jobs</h2>
          <div className="job-cards">
          {lastThreeJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.jobTitle}</h3>
                <p>{job.dept}</p>
                <p>
                  <FaMapMarkerAlt className="icon" />
                  {job.location}
                </p>
                <div className="apply-link" onClick={()=>{
                 localStorage.setItem("job_id",job.id);
                 window.location.href="/View";
               }
               }>View Jobs</div>
              </div>
            ))}
          </div>
        </div>

        <div className="applied-jobs">
          <h2>Jobs Applied</h2>
          <div className="job-cards">
          {appliedJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.jobTitle}</h3>
                <p>{job.dept}</p>
                <p>
                  <FaMapMarkerAlt className="icon" />
                  {job.location}
                </p>
              </div>
            ))}
          </div>
      
        </div>

        <div className="job-section">
          <h2>Recommended Jobs</h2>
          <div className="job-cards">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p><FaMapMarkerAlt className="icon" />{job.location}</p>
              </div>
            ))}
          </div>
          {showViewAllJobs && (
            <div className="view-all-jobs">
              <Link to="/findjobs">View All Jobs <BsArrowBarRight /></Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
