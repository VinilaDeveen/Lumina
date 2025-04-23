import styled from '@emotion/styled';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Loader.css';

export default function LoaderAnimation({type}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, 600); // Increment progress every 500ms
      return () => clearTimeout(timer); 
    }
  }, [progress]);

  return (
    <>
      {type ==="normal"?
        <div className='loading-main'>
          <div class="loading-container">
            <div class="loading-text">
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          </div>
          <div class="socials">
            <a class="social-link" href="https://twitter.com/aybukeceylan" target="_top">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a class="social-link" href="https://www.linkedin.com/in/ayb%C3%BCkeceylan/" target="_top">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      :type === "heart-rate"?
        <>
          <StyledWrapper>
            <div className='loading-heart-rate-main'>
            </div>
            <div className="loading" style={{display:"flex",backgroundColor:"white",flexDirection:"column",justifyContent:"center", padding:"30px 40px", borderRadius:"30px"}}>
              <span style={{color:"red",fontSize:"12px",marginBottom:"10px", fontWeight:"500",textAlign:"center"}}>LOADING...</span>
              <svg height="48px" width="64px">
                <polyline id="back" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" />
                <polyline id="front" points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" />
              </svg>
            </div>
          </StyledWrapper>
        </>

      :type ==="spinner"?
        <SpinnerStyledWrapper>
          <div className='loading-spinner-main'>
          </div>
          <div className="lds-spinner"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
        </SpinnerStyledWrapper>
      :type === "progress-Loader"?
      <ProgressbarWrapper>
        <div className='progressbar-main'style={{color:"red",fontSize:"12px",marginBottom:"10px", fontWeight:"500",textAlign:"center"}} >
          <div style={{padding:"30px 10px", borderRadius:"30px", backgroundColor:"white"}}>
            <div className="counter" style={{width:"100%"}}>Processing</div>
            <div className="counter" style={{width:"100%"}}>{progress}%</div>
            <div className="progressbar" style={{height:"8px"}}>
              <span className="progress" style={{ width: `${progress}%` }}></span>
            </div>
          </div>
          
          </div>
      </ProgressbarWrapper>
      :null
    }
    </>

  )
}


const StyledWrapper = styled.div`

  .loading-heart-rate-main {
    
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100%;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

}
  }
  
  .loading{
    z-index:9999;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .loading svg polyline {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .loading svg polyline#back {
    fill: none;
    stroke: white;
  }

  .loading svg polyline#front {
    fill: none;
    stroke: red;
    stroke-dasharray: 48, 144;
    stroke-dashoffset: 192;
    animation: dash_682 1.4s linear infinite;
  }

  @keyframes dash_682 {
    72.5% {
      opacity: 0;
    }

    to {
      stroke-dashoffset: 0;
    }
  }`;




  const SpinnerStyledWrapper = styled.div`

  .loading-spinner-main {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: radial-gradient(circle farthest-corner at 10% 20%, #ffffff 0.1%, #ffffff 94.2%);
    background-size: 100%;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
    opacity: 0.4;
  }
  .lds-spinner {
    color: official;
    display: inline-block;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
  }

  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }

  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }

  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }

  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }

  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }

  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }

  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }

  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }

  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }

  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }

  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }

  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }

  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }

  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }

  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }`;


  const ProgressbarWrapper = styled.div`
    
    .progressbar-main {
      width:100%;
      background: #333;
      color: #fff;
      font-size: 22px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 999;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    }
    
    .progressbar {
      position: relative;
      max-width: 500px;
      width: 300px;
      margin: 10px auto 0;
      transform:scale(0.4);
      background:rgba(69, 39, 39, 0.44);
      overflow: hidden;
    }
    
    span.progress {
      width: 100px;
      background:rgb(255, 0, 0);
      backdrop-filter
      transition: all .3s;
    }
  `