import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Component/NavBar';
import LandingPage from './Component/Home';
import EducationForm from './Component/EduRegister';


import Register from './Component/Register';
import ProfilePage from './Component/Profile';
import FindJobs from './Component/FindJobs';
import Form from './Component/Form';
import JobDetails from './Component/JobView';
import InterviewSchedule from './Component/InterviewSchedule';
import PostJobForm from './Component/postjobs';
import FeedbackForm from './Component/Feedback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
