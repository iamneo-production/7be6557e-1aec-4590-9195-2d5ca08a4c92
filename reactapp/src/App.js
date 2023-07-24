 import React from 'react';
import Login from './Component/Login';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Register from './Component/Register';
import FindJobs from './Component/FindJobs';
import MyApplications from './Component/MyApplications';
import HomePage from './Component/Home';
import ProfilePage from './Component/Profile';
import Apply from './Component/Apply';
import JobDetails from './Component/JobView';
import LandingPage from './Component/LandingPage';
import NotificationPage from './Component/NotificationPage';
import { Provider } from 'react-redux';
import store from './Component/Store';
import HrLogin from './Component/HrLogin';
import InterviewSchedule from './Component/InterviewSchedule';
import PostJobForm from './Component/postjobs';
import ViewJobs from './Component/JobView';
import InterviewForm from './Component/HrInterview';
import AppliedUsers from './Component/HrApplication';
import UserStatistics from './Component/HrHome';
import ViewFull from './Component/HrFullView';
import FeedbackForm from './Component/Feedback';

function App() {
  return (
  
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/dashboard" element={<HomePage/>}/>
        <Route path="/findjobs" element={<FindJobs/>}/>
        <Route path="/myApplications" element={<MyApplications/>}/>
        <Route path="/notifications" element={<NotificationPage/>}/>
        <Route path="/editprofile" element={<ProfilePage/>}/>
        <Route path="/Apply" element={<Apply/>}/>
        <Route path="/View" element={<ViewJobs/>} />
        <Route path="/HrLogin" element={<HrLogin/>}/>
        <Route path="/HrHome" element={<UserStatistics/>}/>
        <Route path="/postjobs" element={<PostJobForm/>}/>
        <Route path="/Fullapplication" element={<ViewFull/>}/>
        <Route path="/Interview" element={<InterviewSchedule/>}/>
        <Route path="/HrApplications" element={<AppliedUsers/>}/>
        <Route path="/InterviewSchedule" element={<InterviewForm/>}/>
        <Route path="/Feed" element={<FeedbackForm/>}/>
      </Routes>
      </BrowserRouter> 
    </div></Provider>
  );
}

export default App;