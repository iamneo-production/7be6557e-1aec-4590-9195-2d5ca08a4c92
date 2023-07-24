import React from 'react';
import '../Assets/styles/LandingPage.css';
import { CgProfile } from 'react-icons/cg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import {MdAdminPanelSettings} from 'react-icons/md';
const LandingPage = () => {
  return (
    <div className="landing-page">
      
      <nav className="navbar">
    <ul className="navbar__list">
    <div id="nav">
       <div id="title">
        <a id="logo">HirePro</a>
    </div>
     </div>
      <div id="last">
      <Link to="/Feed" style={{textDecoration:"none"}}>
      <button className='apply-btn' style={{marginRight:"20px"}}>Feedback</button>
      </Link>
    
      {/* <li className="navbar__item">
      {name}
      </li> */}
      </div>
    </ul>
  </nav>
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span id='logo' style={{fontSize:"40px", }}>HirePro</span></h1>
          <p>Streamline Your Job Search and Find Your Perfect Fit</p>
          <p>LOGIN AS</p>
          <Link to ="/Login" style={{textDecoration:"none", borderColor:"none"}} ><button className="cta-button" style={{marginRight:"10PX", borderColor:"none"}}><FaUser size={15} style={{marginRight:"3px"}}/> APPLICANT </button></Link>
          <Link to ="/HrLogin" ><button className="cta-button"> <MdAdminPanelSettings size={16} style={{marginRight:"3px"}}/>ADMIN</button></Link>
        </div>
      </section>
      <section className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>We understand that finding the right job and managing your job applications can be a challenging task. That's why we have developed this platform to simplify and streamline your job search process.

Our Application Tracking System offers a range of features and tools to help you effectively track and manage your job applications, allowing you to stay organized and focused on your career goals.</p>
          <a href="#" className="cta-button">Learn More</a>
        </div>
      </section>
      <div className='wave'>
      <section className="services-section">
      </section></div>
      <section className="servicesection">
        <h2 style={{marginLeft:"100px"}}>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Job Search</h3>
            <p>Job Search: Explore a wide range of job opportunities from various industries and sectors. Use advanced search filters to narrow down your options based on your preferences, including location, job type, experience level, and more.</p>
          </div>
          <div className="service-card">
            <h3>Application Management: </h3>
            <p>Keep track of your job applications in one central place. Save and manage your preferred jobs, view application status, and set reminders for important deadlines. Stay organized and never miss an opportunity.</p>
          </div>
          <div className="service-card">
            <h3>Career Resources</h3>
            <p>Communication: Communicate with employers and recruiters directly through our platform. Exchange messages, schedule interviews, and stay connected throughout the hiring process.</p>
          </div>
        </div></section>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
