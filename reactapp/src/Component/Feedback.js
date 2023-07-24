import React, { useState } from 'react';
import '../Assets/styles/FeedbackForm.css'; // Import your CSS file
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
const FeedbackForm = () => {
//   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const token=localStorage.getItem('token');
  useEffect(()=>{
    const fetchData=async()=>{
      console.log(token);
      
      try{
        const response=await axios.get(
          `http://localhost:8082/api/v1/feed/getFeedback`,
          {
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Credentials': 'true',
              "Authorization":`Bearer ${token}`,
              "cache-control":"no-cache",
            },
          }
        )
       
        console.log(response.data);
        setSubmittedFeedback(response.data);
      }
      catch(error){
        console.log("Error fetching Data"+error);
      }
    };
    fetchData();
   },[]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Create a new feedback object with the user input
    const newFeedback = {
      email,
      feedback,
      id: new Date().getTime(), // Generate a unique ID (you can use UUID library for better unique IDs)
    };

    // Add the new feedback to the submittedFeedback array
    setSubmittedFeedback([...submittedFeedback, newFeedback]);
    try{
        const response=await axios.post( `http://localhost:8082/api/v1/feed/addFeedback`,
        newFeedback,
        {
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true',
            "Authorization":`Bearer ${token}`,
            "cache-control":"no-cache",
          },
        })
        
      }catch(error){
        console.log(error);
      }
      // Clear the input fields after submission
    //   setName('');
      setEmail('');
      setFeedback('');
      }

  

  return (
    <>
        <Navbar/>
    <div className="feedback-card">
      <form onSubmit={handleSubmit}>
        <h2>Feedback Form</h2>
        <div className="form-group">
        
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your Feedback"
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>

      <div className="submitted-feedback-container">
        <h2>Submitted Feedback</h2>
        {submittedFeedback.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <ul>
            {submittedFeedback.map((feedback) => (
              <li key={feedback.id}>
                <p>
                  
                  <strong>Email:</strong> {feedback.email} <br />
                  <strong>Feedback:</strong> {feedback.feedback}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default FeedbackForm;