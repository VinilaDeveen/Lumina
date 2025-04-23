import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../styles/Main/FilledAlert.css'

export default function FilledAlerts({status,message,onClose}) {
  console.log("ALLERT MESSAGE",status,message);
  const icon = useRef("");
  const title =  useRef("");

  
  
  if(message.current!=''){
    title.current = message.current;
  }else{
    title.current = "Failed to access database server!"; 
  }
    if(status.current === 400){
      icon.current = "error";
    }else if(status.current === 201){
      icon.current = "success";
    }else if(status.current === 403){
      icon.current = "error";
    }else if(status.current === 200){
      icon.current = "success";
    }
    const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
      onClose();
    }
    });
    Toast.fire({
      icon: icon.current,
      title:title.current,
    });


  
  return (null);
}
