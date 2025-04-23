import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import close from '../../assets/icons/close.svg';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function AdminFeedback() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const [feedbacks, setFeedbacks] = useState({});
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [EmployeeData, setEmployeeData] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/feedback', config);
      setFeedbacks(response.data);
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to fetch feedback.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  const handleSubmit = async () => {
    if (!userName || !comment || rating === 0) {
      alert('All fields are required!');
      statusCode.current = 400;
      errorMessage.current = 'All fields are required!';
      setAlert({status:statusCode,message:errorMessage});
      return;
    }

    const feedbackData = {
      comment: comment,
      rating: rating,
      userName: userName,
    };

    try {
      await axios.post('http://localhost:8080/api/lumina/feedback', feedbackData, config);
      statusCode.current = 200;
      errorMessage.current = 'Feedback submitted successfully!';
      setAlert({status:statusCode,message:errorMessage});
      setComment('');
      setRating(0);
      setUserName('');
      fetchFeedbacks();
      setShowFeedbackPopup(false);
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to add feedback.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete?');
      if (confirmed) {
        await axios.delete(`http://localhost:8080/api/lumina/feedback/${feedbackId}`, config);
        statusCode.current = 200;
        errorMessage.current = 'Feedback deleted successfully!';
        setAlert({status:statusCode,message:errorMessage});
        fetchFeedbacks();
        console.log('Deleted successfully');
      }
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 400;
        errorMessage.current = "Failed to delete feedback.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const closePopup = () => {
    setShowFeedbackPopup(false);
  };

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'admin'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
              <button className="AsaButton" onClick={() => setShowFeedbackPopup(true)}>
                ADD FEEDBACK
              </button>
            </div>
            <h1>Feedbacks</h1>
            <div className="Aschedule">
              <>
                <div className="D-leaderboard" style={{ height: '350px' }}>
                  <table>
                    <tr style={{ textAlign: 'center',zIndex:"99" }} className="Ahead">
                      <th>Sender</th>
                      <th>Review Rate</th>
                      <th>Comment</th>
                      <th>Action</th>
                    </tr>
                    {feedbacks.length > 0 ? (
                      feedbacks.reverse().map((feedback) => (
                        feedback.feedbackStatus !='DELETED'?
                        <tr style={{ textAlign: 'center' }} key={feedback.feedbackId}>
                          <td>{feedback.feedbackEmail}</td>
                          <td>{feedback.rating}</td>
                          <td>{feedback.comment}</td>
                          <td onClick={() => deleteFeedback(feedback.feedbackId)} className="AdlButton">
                            <button>DELETE</button>
                          </td>
                        </tr>
                        :null
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          feedback Data Currently Not Available
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </>
            </div>
          </div>
        }
        {showFeedbackPopup && (
          <div
            style={{
              position: 'fixed',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
            }}
          >
            <Container>
              <Row className="feedback" style={{ display: 'flex', height: '300px', margin: 'auto' }}>
                <Col className="feedbackright" style={{ borderRadius: '30px' }}>
                  <div
                    className="exit"
                    style={{ position: 'absolute', right: '50px', cursor: 'pointer' }}
                    onClick={() => closePopup()}
                  >
                    <img src={close} alt="closeImage" />
                  </div>
                  <h1 style={{ backgroundColor: 'transparent', fontSize: '35px' }}>Feedback</h1>

                  <br />
                  <div className="inputclass">
                    <input
                      style={{
                        margin: '-10px 20px -10px 20px',
                        width: '90%',
                        color: 'white',
                        padding: '10px',
                        fontSize: '14px',
                        backgroundColor: 'transparent',
                        border: 'unset',
                        borderBottom: '1px solid white',
                      }}
                      className="INT"
                      type="text"
                      placeholder="Enter Your Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '20px',
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= (hover || rating) ? 'star filled' : 'star'}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                          fontSize: '2rem',
                          cursor: 'pointer',
                          color: star <= (hover || rating) ? '#FFD700' : '#ccc',
                          margin: '0 5px',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div>
                    <textarea
                      style={{ width: '90%', backgroundColor: 'transparent', fontSize: '14px' }}
                      placeholder="Enter Your Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <br />
                  <input
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '10px 30px',
                      borderRadius: '30px',
                      border: 'none',
                    }}
                    type="button"
                    className="submit-login"
                    value="SUBMIT"
                    onClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>

      {alert.status && (
        <FilledAlerts
          status={alert.status}
          message={alert.message}
          onClose={() => setAlert({ status: null, message: null })}
        />
      )}
    </>
  );
}
