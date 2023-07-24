import React, { useState, useEffect } from 'react';
import "../Assets/styles/profile.css";
import NavBar from './NavBar';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa'; // Imported additional icons
import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('token');
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const email=localStorage.getItem("email");

  const handleEditClick = () => {
    setEditMode(true);
  };
 const userId=localStorage.getItem("userId");
  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8181/api/v1/users/${userId}`,
        profileData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "cache-control": "no-cache",
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error updating profile: ", error);
    }
    setEditMode(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8181/api/v1/users/email/${email}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "cache-control": "no-cache",
          },
        });
        
        const userData = response.data; // Assuming the API returns the correct user data
        setProfileData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          contactNo: userData.contactNo,
          degree: userData.degree,
          specilization: userData.specilization,
          address: userData.address,
          passingYear: userData.passingYear,
          cgpa: userData.cgpa,
        });
        localStorage.setItem("userId",userData.id);
      } catch (error) {
        console.log("Error fetching Data " + error);
      }
    };

    fetchData();
  }, [userId, token]);


  
  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h1>Job Seeker Profile</h1>
        <div className="profile">
          <div className="profile-section">
            <label><FaUser className="icon" /> FirstName:</label>
            {editMode ? (
              <input
                type="text"
                name="firstName"
                value={profileData.firstName || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.firstName}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaUser className="icon" /> LastName:</label>
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={profileData.lastName || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.lastName}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaMapMarkerAlt className="icon" /> Address:</label>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={profileData.address || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.address}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaEnvelope className="icon" /> Email:</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={profileData.email || ''}
                onChange={handleInputChange}
                className='emailm'
              />
            ) : (
              <span>{profileData.email}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaPhone className="icon" /> ContactNo:</label>
            {editMode ? (
              <input
                type="text"
                name="contactNo"
                value={profileData.contactNo || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.contactNo}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaGraduationCap className="icon" /> Degree:</label>
            {editMode ? (
              <select
                name="degree"
                value={profileData.degree || ''}
                onChange={handleInputChange}
              >
                
                <option value="">Select Degree</option>
                <option value="Associate of Arts (AA)">Associate of Arts (AA)</option>
                <option value="Associate of Science (AS)">Associate of Science (AS)</option>
                <option value="Associate of Applied Science (AAS)">Associate of Applied Science (AAS)</option>
                <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
                <option value="Bachelor of Science (BS)">Bachelor of Science (BS)</option>
                <option value="Bachelor of Fine Arts (BFA)">Bachelor of Fine Arts (BFA)</option>
                <option value="Master of Arts (MA)">Master of Arts (MA)</option>
                <option value="Master of Science (MS)">Master of Science (MS)</option>
                <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                <option value="Master of Fine Arts (MFA)">Master of Fine Arts (MFA)</option>
                <option value="Doctor of Philosophy (PhD)">Doctor of Philosophy (PhD)</option>
                <option value="Doctor of Medicine (MD)">Doctor of Medicine (MD)</option>
                <option value="Juris Doctor (JD)">Juris Doctor (JD)</option>
                <option value="Bachelor of Laws (LLB)">Bachelor of Laws (LLB)</option>
                <option value="Bachelor of Engineering (BE)">Bachelor of Engineering (BE)</option>
                <option value="Bachelor of Technology (BTech)">Bachelor of Technology (BTech)</option>
                <option value="Master of Engineering (ME)">Master of Engineering (ME)</option>
                <option value="Master of Technology (MTech)">Master of Technology (MTech)</option>
                
              </select>
            ) : (
              <span>{profileData.degree}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaGraduationCap className="icon" />SKills:</label>
            {editMode ? (
              <input
                type="text"
                name="specilization"
                value={profileData.specilization || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.specilization}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaGraduationCap className="icon" />CGPA:</label>
            {editMode ? (
              <input
                type="number"
                name="cgpa"
                step="0.01"
                min="0"
                max="4"
                value={profileData.cgpa || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.cgpa}</span>
            )}
          </div>
          <div className="profile-section">
            <label><FaGraduationCap className="icon" /> PassingYear:</label>
            {editMode ? (
              <input
                type="text"
                name="passingYear"
                value={profileData.passingYear || ''}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.passingYear}</span>
            )}
          </div>
          <div className="profile-buttons">
            {editMode ? (
              <>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={() => setEditMode(false)}  style={{marginLeft:"20px"}}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditClick}>Edit</button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;
