import { useState } from "react";
import React from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import "./GlobalVariables";



const Login = ()=>{

    const [statuslg, setStatuslg] = useState("Submit");
    const [regnumber, setRegnumber] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [validstat, setValidstat] = useState("");
    let history = useHistory();


    let onchangereg = (event)=>{
        setRegnumber(event.target.value) 
    }
    let onchangepass = (event)=>{
        setPassword(event.target.value)
    }

    
    const sendtodbogin =()=>{

        if(regnumber === "" || password === "")
        {
            setErr(" * Fil in all The fields");
        }
        else
        {

            setErr("");
            let obj = JSON.stringify({'logincredentials':[{"regnumber":regnumber, "password":password}]});
            axiospost(obj)
        }

    }

  
    //child function
    const axiospost = (postobj)=>{


        setStatuslg("Please wait...")
        let sendbj = JSON.parse(postobj);

        axios.post('http://86af-105-61-254-218.ngrok.io/login', sendbj,
        {
            Headers:{
                'Content-Type':'application/json'
            }
        })
      
        .then(res => {
          
          
            console.log(res);
            if(res.data[1] === "true")
            {
                setValidstat("Verified");
                setStatuslg("Submit");
            history.push("/webcam");
                


            }
           else if(res.data[1] === "false")
            {
                setValidstat("Incorrect Credentials");
                setStatuslg("Submit");
            }
           else if(res.data[1] === "false")
            {
                setValidstat("Incorrect Credentials");
                setStatuslg("Submit");
            }
           else if(res.data[1] === "unknown")
            {
                setValidstat("unknown");
                setStatuslg("Submit");
            }

            
     
        })
        .catch(err =>{
        
            console.log(err);
            setValidstat("Try Again")
            setStatuslg("Submit");
            global.authorised = true;
        }); 
    }

return(

    <div className="loginpage">
    
    <div className="itemsholder">

    <h3>Login</h3>
    <input id="regnumber" type="text" placeholder="Registration Number" onChange={onchangereg}></input>
    <input id="password" type="password" placeholder="password" onChange={onchangepass}></input>
    <p>{err}</p>
    <p>{validstat}</p>

    <button id="submitlogin" onClick={()=>{
        sendtodbogin();
    }}> {statuslg}</button>
    </div>


    </div>

)

}

export default Login