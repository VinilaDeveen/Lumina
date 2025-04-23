import React, { useEffect, useRef, useState } from 'react'
import SidemenuComponent from '../../components/SidemenuComponent'
import TopBannerComponent from '../../components/TopBannerComponent'
import axios from 'axios';
import close from '../../assets/icons/close.svg';
import SignUp from '../Home/SignUp';
import FilledAlerts from '../../components/Main/FilledAlerts';


export default function AdminEmployee() {
  // Alert 
      const [alert, setAlert] = useState({ status: null, message: null });
      const statusCode = useRef("");
      const errorMessage = useRef("");

    const token = localStorage.getItem('accessToken');
    const [userId,setUserId] = useState('');
    const [fName,setFName] = useState('');
    const [lName,setLName] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    const [nic,setNIC] = useState('');
    const [password,setPassword] = useState('');
    const [cPassword,setCPassword] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('')

    const [enableAddEmployee,setEnableAddEmployee] = useState(false);

    const [EmployeeData,setEmployeeData] = useState([]);

    useEffect(()=>{
        fetchEmployeeAccountDetails();
    },[])

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const fetchEmployeeAccountDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/lumina/user/employees/DONOR/HOSPITAL", config);
        console.log('Response Data:', response.data); // Debugging line
        setEmployeeData(response.data); // Ensure `response.data` contains an array of employees
        console.log('Succesfully Fetched');
      } catch (error) {
        if(error.response){
          statusCode.current = error.response.status;
          errorMessage.current = error.response.data;
        }else{
          statusCode.current = 100;
          errorMessage.current = "Error at fetch Employee details.";
        }
        setAlert({status:statusCode,message:errorMessage});
      }
    };

    const activateEmployee = async(userId)=>{
      statusCode.current = 402;
      errorMessage.current = "Sorry! we are currently at maintainance level";
      setAlert({status:statusCode,message:errorMessage});
      /* try {
        const confirmed = window.confirm('Are you sure you want to Activate?');
        if (confirmed) {
          await axios.delete(`http://localhost:8080/api/lumina/user/${userId}`, config);
          statusCode.current = 200;
          errorMessage.current = "Employee deleted successfully";
          setAlert({status:statusCode,message:errorMessage});
          setTimeout(()=>{
            fetchEmployeeAccountDetails();
          },3000)
        }
      } catch (error) {
        if(error.response){
          statusCode.current = error.response.status;
          errorMessage.current = error.response.data;
        }else{
          statusCode.current = 400;
          errorMessage.current = "Error at delete Employee.";
        }
        setAlert({status:statusCode,message:errorMessage});
      } */
    }

    const deleteEmployeeInfo = async (userId) => {
      try {
        const confirmed = window.confirm('Are you sure you want to delete?');
        if (confirmed) {
          await axios.delete(`http://localhost:8080/api/lumina/user/${userId}`, config);
          statusCode.current = 200;
          errorMessage.current = "Employee deleted successfully";
          setAlert({status:statusCode,message:errorMessage});
          setTimeout(()=>{
            fetchEmployeeAccountDetails();
          },3000)
        }
      } catch (error) {
        if(error.response){
          statusCode.current = error.response.status;
          errorMessage.current = error.response.data;
        }else{
          statusCode.current = 400;
          errorMessage.current = "Error at delete Employee.";
        }
        setAlert({status:statusCode,message:errorMessage});
      }
    };
      

      const closePopup = ()=>{
        setEnableAddEmployee(false);
      }

  return (
    <>
      <div className="D-main">
        <SidemenuComponent userRole={'admin'} />
        {
          <div className="Aappointments">
            <TopBannerComponent />
            <h1>Dashboard</h1>
            <div className="Aschedule">
                <button onClick={()=>setEnableAddEmployee(true)} className="AsaButton">
                ADD EMPLOYEE
                </button>
                  <div className="D-leaderboard" style={{height:"350px"}}>
                  <table>
                      <tr style={{ textAlign: 'center' ,zIndex:"99"}} className="Ahead">
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>NIC</th>
                      <th>Action</th>
                      </tr>
                      {EmployeeData.length > 0 ? 

                      EmployeeData.reverse().map((data) => (
                        
                        <tr style={{ textAlign: 'center' }} key={data.id}>
                          <td>{data.userId}</td>
                          <td>{data.userFirstName}</td>
                          <td>{data.userLastName}</td>
                          <td>{data.userEmail}</td>
                          <td>{data.userRole}</td>
                          <td>{data.userNIC}</td>
                          {data.userStatus != "INACTIVE"?
                            <td onClick={() => deleteEmployeeInfo(data.userId)} className="AdlButton">
                              <button style={{width:"100px"}}>DELETE</button>
                            </td>
                          :
                            <td onClick={() => activateEmployee(data.userId)} className="AdlButton">
                              <button style={{width:"100px"}}>ACIVATE</button>
                            </td>
                          }
                        </tr>
                      )):(
                        <tr>
                          <td colSpan="7" className="text-center">Employee Data Not Available</td>
                        </tr>
                      )}
                        
                  </table>
                  </div>
        
                
                {enableAddEmployee && 
                <>
                    <SignUp closePopup={closePopup} />
                </>
                }
            </div>
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
  )
}
