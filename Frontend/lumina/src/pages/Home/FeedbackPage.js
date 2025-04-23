import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Marquee from 'react-fast-marquee';
import NavBar from '../../components/Main/NavBar';
import Signin from './Signin';
import SignUp from './SignUp';
import '../../styles/Feedback.css';
import close from '../../assets/icons/close.svg';

import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Footer } from 'antd/es/layout/layout';
import SignedNavbar from '../../components/Main/SignedNavbar';

const FeedbackPage = () => {
  const token = localStorage.getItem('accessToken');
  const [feedbacks, setFeedbacks] = useState([]);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const DisplaySignIn = () => {
    setDisplaySignin(true);
    setDisplaySignup(false);
  };

  const DisplaySignup = () => {
    setDisplaySignin(false);
    setDisplaySignup(true);
  };

  const closePopup = () => {
    setDisplaySignin(false);
    setDisplaySignup(false);
    setShowFeedbackPopup(false);
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lumina/feedback', { headers: { Authorization: `Bearer ${token}` } });
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleSubmit = async () => {
    if (!userName || !comment || rating === 0) {
      alert('All fields are required!');
      return;
    }

    const feedbackData = {
      comment: comment,
      rating: rating,
      userName: userName,
    };

    try {
      await axios.post('http://localhost:8080/api/lumina/feedback', feedbackData, { headers: { Authorization: `Bearer ${token}` } });
      alert('Feedback submitted successfully!');
      setComment('');
      setRating(0);
      setUserName('');
      fetchFeedbacks();
      setShowFeedbackPopup(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div>
      {token?<SignedNavbar/>:<NavBar DisplaySignIn={DisplaySignIn} DisplaySignup={DisplaySignup} />}
      <div className="about-us">
        <h1>Feedbacks</h1>
        <p>
          We're here to help, whatever you need. Pick a way to get in touch and give us a buzz, drop us a line, or send
          us an old-fashioned letter.
        </p>
      </div>
      <div>
        {/* Feedback Marquee */}
        <Marquee
          behavior="scroll"
          direction="left"
          className="marquee"
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', height: '150px' }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="viewbox"
              style={{
                display: 'inline-block',
                marginRight: '20px',
              }}
            >
              <Card>
                <Card.Title>
                  {feedback.feedbackEmail ? feedback.feedbackEmail : <>Annonymous User</>}
                  <br />
                  {Array(feedback.rating).fill('★').join(' ')}{' '}
                  {Array(5 - feedback.rating)
                    .fill('☆')
                    .join(' ')}
                </Card.Title>
                <Card.Text className="feedback-cardtext">
                  <i>{feedback.comment}</i>
                </Card.Text>
              </Card>
            </div>
          ))}
        </Marquee>
        <Marquee
          behavior="scroll"
          direction="right"
          className="marquee"
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', height: '150px' }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="viewbox"
              style={{
                display: 'inline-block',
                marginRight: '20px',
              }}
            >
              <Card>
                <Card.Title>
                  {feedback.feedbackEmail ? feedback.feedbackEmail : <>Annonymous User</>}
                  <br />
                  {Array(feedback.rating).fill('★').join(' ')}{' '}
                  {Array(5 - feedback.rating)
                    .fill('☆')
                    .join(' ')}
                </Card.Title>
                <Card.Text className="feedback-cardtext">
                  <i>{feedback.comment}</i>
                </Card.Text>
              </Card>
            </div>
          ))}
        </Marquee>

        {/* Feedback Form Popup */}
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
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.0)',
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
                      style={{ width: '90%', backgroundColor: 'transparent' }}
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

        {/* Feedback Button */}
        <button
          style={{
            backgroundColor: '#007bff',
            position: 'absolute',
            bottom: '50px',
            left: '48%',
            padding: '8px 20px',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
          }}
          onClick={() => setShowFeedbackPopup(true)}
        >
          Feedback
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',

          zIndex: 9999,
        }}
      >
        {displaySignin && (
          <>
            <Signin closePopup={closePopup} DisplaySignup={DisplaySignup} />
          </>
        )}
        {displaySignup && (
          <>
            <SignUp closePopup={closePopup}  DisplaySignIn={DisplaySignIn}  />
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
