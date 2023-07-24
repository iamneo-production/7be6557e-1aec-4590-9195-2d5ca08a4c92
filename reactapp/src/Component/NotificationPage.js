import React, { useState } from 'react';
import '../Assets/styles/NotificationPage.css';
import Navbar from './NavBar';
import { FaArchive, FaReply, FaShare, FaTrash } from 'react-icons/fa';
import { BsFillCalendarHeartFill } from 'react-icons/bs';
import { AiFillCalendar } from 'react-icons/ai';
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Congratulations!',
      description: 'You have been shortlisted for the Software Engineer position at Amazon Web Services.',
      date: '2022-12-15',
      selected: false,
    },
    {
      id: 2,
      title: 'Interview Invitation',
      description: 'You have been invited for an interview at Google for the Data Scientist role.',
      date: '2022-12-18',
      selected: false,
    },
    {
      id: 3,
      title: 'Job Offer',
      description: 'Congratulations! You have received a job offer from Microsoft as a Cloud Solutions Architect.',
      date: '2022-12-20',
      selected: false,
    },
  ]);

  const [activeMailMenu, setActiveMailMenu] = useState('inbox');

  const handleMailMenuClick = (menu) => {
    setActiveMailMenu(menu);
  };

  const handleCheckboxChange = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return {
          ...notification,
          selected: !notification.selected,
        };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
  };

  const handleDeleteClick = () => {
    const updatedNotifications = notifications.filter((notification) => !notification.selected);
    setNotifications(updatedNotifications);
  };

  return (
    <>
      <Navbar />
      <div className="notification-page-container">
        <div className="notification-content">
          <div className="notification-header">
            <h2>Notifications</h2>
            <div className="notification-actions">
        
            </div>
          </div>
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <ul className="notification-list">
              {notifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  <div className="notification-header">
                    <span className='notification-title'><h3>{notification.title}</h3></span>
                    <div className="notification-actions">
                      <a href="#" className="notification-action">
                        <FaArchive />
                      </a>
                      <a href="#" className="notification-action">
                        <FaReply />
                      </a>
                      <a href="#" className="notification-action">
                        <FaShare />
                      </a>
                    </div>
                  </div>
                  <p className="notification-date"><AiFillCalendar className='icon'/>{notification.date}</p>
                  <p className="notification-description">{notification.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
