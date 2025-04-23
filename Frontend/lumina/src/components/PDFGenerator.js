import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";
import logo from '../assets/icons/LuminaLogoBlack.png'
import logoRed from '../assets/icons/LuminaLogo.ico'
import { useParams } from "react-router-dom";


const PDFGenerator = () => {
  const {donationId} = useParams();
  const contentRef = useRef();
  const [ labTestData, setLabTestData ] = useState ([]);
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchLabTestData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/lumina/labTest/donation/${donationId}`, config);//API end point labTestByDonationId 
      setLabTestData(response.data);
    } catch (error) {
      console.error('Error fetching blood donation data:', error);
    }
  };

  useEffect(() => {
    fetchLabTestData();
  }, []);

  const generatePDF = () => {
    const content = contentRef.current;

    const options = {
      filename: `Lab Test Report(${labTestData.userFirstName} ${labTestData.userLastName})`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(content).save();
  };

  return (
    <div style={{ padding: "20px" , width:"100%",height:"100vh",overflow:"auto",position:"relative",color:"#3f3f3f"}}>
      <div className='pdf' style={{position:"relative"}}>
      <div
        ref={contentRef}
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "750px",
          margin: "20px auto",
          backgroundColor:"white",
          padding: "20px",
          height: "960px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={styles.container}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px", borderBottom:"2px solid black", paddingBottom:"20px"}}>
            <div style={{lineHeight:"1",margin:"10px 0px 10px 0px"}}>
              <span style={{fontWeight:"600",fontSize:"12px"}}>LABROTORY REPORT</span><br/>
              <span style={{fontSize:"10px"}}>PRIVATE AND CONFIDENTIAL</span>
            </div>
            <div style={{display:"flex",alignContent:"center"}}>
              <img

                src={logoRed}
                alt="Lumina Logo"
                style={{ width:"40px",objectFit:"contain"}}
              /><span style={{fontSize:"25px",marginLeft:"10px",fontWeight:"bold",letterSpacing:"2px",color:"#3f3f3f"}}>LUMINA</span></div>
          </div>

          <div style={styles.section}>
            <div style={{width:"50%"}}><p>
              <b>PATIENT NAME :</b> {labTestData.userFirstName} {labTestData.userLastName}
            </p>
            <p>
              <b>N.I.C:</b> {labTestData.userNIC}
            </p>
            <p>
              <b>Blood Type:</b> {labTestData.userBloodType}
            </p></div>
            <div style={{width:"50%"}}>
            <p>
              <b>DATE OF BIRTH : </b> {labTestData.userDOB}
            </p>
            <p>
              <b>LAB TEST DATE : </b> {labTestData.labTestDate}
            </p>
            <p>
              <b>LAB TEST TIME:</b> {labTestData.labTestTime}
            </p>
            </div>
          </div>

          <div>
            <div style={{width:"100%",border:"2px solid black",fontSize:"12px",fontWeight:"600",textAlign:"center",margin:"30px 0px 10px 0px"}}><u>BLOOD DONATION LAB TEST</u></div>
            <div style={{display:"flex"}}>
              <div style={{width:"50%", paddingLeft:"10px",border:"2px solid black",fontSize:"13px",fontWeight:"600",}}>Test Name</div>
              <div style={{width:"50%", paddingLeft:"20px",border:"2px solid black",borderLeft:"0px solid black",fontSize:"13px",fontWeight:"600"}}>Result</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>Primary Sample Type</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: Blood</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px",}}>Hemoglobin (Hb)</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.hemoglobin}
                    
              </div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>HIV 1</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.hiv1 ? "Positive" : "Negative"}</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>HIV 2</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.hiv2 ? "Positive" : "Negative"}</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>Hepatitis B</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.hepatitisB ? "Positive" : "Negative"}</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>Hepatitis C</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.hepatitisC ? "Positive" : "Negative"}</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>Syphilis</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.syphilis ? "Positive" : "Negative"}</div>
            </div>
            <div style={{display:"flex", margin:"15px 0px 15px 0px"}}>
              <div style={{width:"50%", paddingLeft:"10px",fontSize:"13px"}}>Malaria</div>
              <div style={{width:"50%", paddingLeft:"",borderLeft:"none",fontSize:"13px"}}>: {labTestData.malaria ? "Positive" : "Negative"}</div>
            </div>
            <div style={{display:"flex", justifyContent:"center", margin:"15px 0px 15px -30px"}}>
              <div style={{ fontSize:"13px"}}>Lab Test Status<span style={{margin:"0px 10px"}}>:</span> </div>
              <div style={labTestData.labTestResult?{color:"green",borderLeft:"none",fontSize:"13px"}:{color:"red",borderLeft:"none",fontSize:"13px"}}> <span style={{fontWeight:"bold"}}>{labTestData.labTestResult ? ' ACCEPTED':' REJECTED'}</span> {labTestData.malaria}</div>
            </div>
            <div style={{margin:"15px 0px 15px 0px",lineHeight:"1.8"}}>
              <div style={{width:"100%", paddingLeft:"10px",fontSize:"13px"}}>Comment :</div>
          
              <div style={{width:"100%", paddingLeft:"10px",fontSize:"13px"}}>Results of this real-time PCR assay might be dependent on the level of virus excretion and the quality of the sample tested. Please correlate this result clinically and epidemiologically for further management decisions.</div>
              
            </div>
          </div>
          

          <div style={styles.footer}>
            <div style={{ float: "left", lineHeight:"0.4", margin:"20px 0px 0px 20px" }}>
              <p style={{fontSize:"13px"}}>Best regards,</p>
              <p style={{ fontWeight: "bold" }}>LUMINA</p>
            </div>
            <div style={{ float: "right" , marginRight:"20px", marginTop:"20px"}}>

              <p>
                📧 <a style={{fontSize:"13px"}} href={`mailto:"donatewithlumina.lk@gmail.com"`}>donatewithlumina.lk@gmail.com</a>
              </p>
            </div>
          </div>
          <div style={{position:"absolute",top:"50%",left:"50%",zIndex:"999",transform:" translate(-50%,-50%)",opacity:"0.1",fontSize:"80px",fontWeight:"bold", color:"#00000078"}} className='watermarker'><img src={logo} alt="Lumina Logo" style={{ width:"340px" }}/></div>
          <div style={{textAlign:"center",position:"absolute", bottom:"10px", fontSize:"13px", width:"750px"}}>
            "One small act of donating blood can create a ripple of hope"
          </div>
        </div>
      </div>
      </div>
      <div style={{position:"absolute",top:"30px",right:"50px"}}>
        <button
          onClick={generatePDF}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
    
  );
};

const styles = {
  container: {},
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid rgb(0, 0, 0)",
    paddingBottom: "10px",
  },
  logo: {
    marginLeft: "10px",
  },
  title: {
    textAlign: "left",
  },
  section: {
    display:"flex",
    justifyContent:"space-between",
    fontSize:"13px",
    lineHeight:"0.8",
    fontWeight:"300",
    borderBottom: "2px solid rgb(0, 0, 0)",
  },
  testResults: {
    marginBottom: "20px",
  },
  status: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "20px",
    borderBottom: "2px solid rgb(0, 0, 0)",
    BorderTop: "5px solid rgb(0, 0, 0)",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
  },
  table: {
    width: "70%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  tableHeader: {
    backgroundColor: "",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontSize: "16px",
  },
  tableData: {
    padding: "10px",
    fontSize: "15px",
  },
};

export default PDFGenerator;
