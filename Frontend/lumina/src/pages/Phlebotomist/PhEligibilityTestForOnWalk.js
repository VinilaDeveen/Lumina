import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidemenuComponent from '../../components/SidemenuComponent';
import TopBannerComponent from '../../components/TopBannerComponent';
import FilledAlerts from '../../components/Main/FilledAlerts';

export default function PhEligibilityTestForOnWalk() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

  const token = localStorage.getItem('accessToken');
  const { userId } = useParams();
  const { path } = useParams();
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [questions, setQuestions] = useState([
    'Do you have AIDS, syphilis, or any sexually transmitted diseases?',
    'Is your sexual relationship limited to one person?',
    'Have you worked in the sex industry or engaged in sex work in the past 12 months?',
    'Have you ever engaged in homosexual relations?',
    'Have you ever used drugs intravenously?',
    'Are you or your partner suspected of having AIDS or another sexually transmitted disease?',
    'Do you or your partner belong to any of the above categories (AIDS, syphilis, drug use, etc.)?',
  ]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(false));

  const handleAnswerChange = (index) => {
    setAnswers((prevAnswers) => prevAnswers.map((answer, i) => (i === index ? !answer : answer)));
  };

  const submitEligibilityTest = async () => {
    const answersObj = answers.reduce((obj, answer, index) => {
      obj[`question${index + 1}`] = answer;
      return obj;
    }, {});

    try {
      const response = await axios.post(`http://localhost:8080/api/lumina/eligibilityTest/user?userId=${userId}`,answersObj, config);
      if (response.data === true) {
        statusCode.current = 200;
        errorMessage.current = "Eligible to donate blood";
        setAlert({status:statusCode,message:errorMessage});
        setTimeout(() => {
          navigate(`/phlebotomist/donationsProcess/${userId}`);
        },3000)
      } else {
        statusCode.current = 400;
        errorMessage.current = "Not eligible to donate blood";
        setAlert({status:statusCode,message:errorMessage});
        setTimeout(() => {
          navigate('/phlebotomist/onWalk');
        },3000)
      }
    } catch (error) {
      if(error.response){
        statusCode.current = error.response.status;
        errorMessage.current = error.response.data;
      }else{
        statusCode.current = 100;
        errorMessage.current = "Failed to connect to the server.";
      }
      setAlert({status:statusCode,message:errorMessage});
    }
  };

  const handleCancel = () => {
    const confirmed = window.confirm("Are you sure you want to cancell ?");
    if(confirmed){
      if (path === '1') {
        navigate('/phlebotomist/appointments');
      } else if (path === '2') {
        navigate('/phlebotomist/bloodCamp');
      }else{
        navigate('/phlebotomist');
      }
    }
  };

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'phlebotomist'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Eligibility Test</h1>
            <form>
              <div className="Main-form" style={{ height: '430px', overflow: 'auto' , paddingBottom:"20px"}}>
                <div className="trueFalse" style={{backgroundColor:"#3B3B3B",paddingTop:"20px"}}>
                  <button
                    type="button"
                    onClick={() => handleCancel()}
                    className="AsaSubmit"
                    style={{ margin: 'unset' }}
                  >
                    CANCEL
                  </button>
                  <p>
                    True(Check) / <br />
                    False(Default)
                  </p>
                </div>
                {questions.map((question, index) => (
                  <div className="qBox" key={index}>
                    <label htmlFor={`question${index}`}>{question}</label>
                    <input
                      type="checkbox"
                      id={`question${index}`}
                      checked={answers[index]}
                      onChange={() => handleAnswerChange(index)}
                    />
                  </div>
                ))}
                <div style={{ position: 'sticky', bottom: 0 }} className="buttons">
                  <button type="button" className="AsaSubmit" onClick={submitEligibilityTest}>
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        }
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
