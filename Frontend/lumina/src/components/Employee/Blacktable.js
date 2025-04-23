import React, {useState,useEffect} from "react";
import  '../../styles/Employee/blacktable.css';
import  '../../styles/Employee/Buttons.css';

const Blacktable=()=> {
  const form = () => {
    const popupform = document.getElementById("popupform");
    popupform.style.display = "block";
    popupform.style.opacity = "100%";
    const page = document.getElementById("page");
    page.style.opacity = "20%";
  };
    return (
    <div id="page">
      <p className="add" input type="button" onClick={form}>ADD EMPLOYEE</p>
      <br/>
      <br/>
        <div className="tableele">
   <table className="blacktable">
     <tr>
     <th>ID</th>
         <th>First Name</th>
         <th>Last Name</th>
         <th>Email</th>
         <th>Role</th>
         <th>Nic</th>
         <th>Action</th>
     </tr>
     <tr>
         <td>1</td>
         <td>Mark</td>
         <td>Otto</td>
         <td>@mdo</td>
         <td>Plebo</td>
         <td>20078988888</td>
         <td><p input type="button">Delet</p></td>
       </tr>
       <tr>
         <td>1</td>
         <td>Mark</td>
         <td>Otto</td>
         <td>@mdoffffffffffffffffffffff</td>
         <td>Plebo</td>
         <td>20078988888</td>
         <td><p input type="button">Delet</p></td>
       </tr>
   </table>
   </div>
  
        </div>
        
    );
}
export default Blacktable;