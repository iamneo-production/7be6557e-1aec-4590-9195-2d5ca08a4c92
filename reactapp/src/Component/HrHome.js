import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import HrNavbar from './HrNavbar';
import { FaMapMarkerAlt } from 'react-icons/fa';

const UserStatistics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [uniqueApplicantEmails, setUniqueApplicantEmails] = useState(0);
  const [lastThreeJobs, setLastThreeJobs] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
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

    const fetchUserStatistics = async () => {
      try {
        // Fetch total users count
        const usersResponse = await axios.get("http://localhost:8181/api/v1/users", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setTotalUsers(usersResponse.data.length);

        // Fetch total applicants count
        const applicantsResponse = await axios.get("http://localhost:8181/resumes/totalResumes", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setTotalApplicants(applicantsResponse.data);

        // Fetch unique applicant emails count
        const uniqueEmailsResponse = await axios.get("http://localhost:8181/resumes/uniqueApplicantEmailsCount", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setUniqueApplicantEmails(uniqueEmailsResponse.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchLastThreeJobs(); 
    fetchUserStatistics();
  }, []);

  // Define the chart options and data
  const chartOptions = {
    chart: {
      id: "user-stats",
      type: "pie",
      height: 350,
    },
    labels: ["Total Users", "Total Applications", "Unique Applicant Emails"],
    colors: ['#EB8C87', '#8CEB87', '#8787EB'], // Change colors for each slice
    dataLabels: {
      enabled: true,
    },
  };

  const chartData = [totalUsers, totalApplicants, uniqueApplicantEmails];

  return (
    <>
    <div>
      <HrNavbar />
      <h2>User Statistics:</h2>
      <ReactApexChart options={chartOptions} series={chartData} type="pie" height={350} />
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
    </>
  );
};

export default UserStatistics;
