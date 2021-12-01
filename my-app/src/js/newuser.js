import React, { useRef, useState }  from 'react';
import Webcam from 'react-webcam'
import axios from 'axios';
import {useHistory} from "react-router-dom";
import "./GlobalVariables";
import {Redirect} from "react-router-dom";



const Webcam1 = ({authorized})=>{


    const webRef = useRef(null);
    let img = "https; '1'";
    const [status, setStatus] = useState("Submit");
    const [image, setImage] = useState("https; '1'");
    const [substatus, setSubmitstat] = useState("");
    let history = useHistory();


    const showImage = ()=>
    {

        setImage(webRef.current.getScreenshot());
        img = webRef.current.getScreenshot();
        setStatus("Submit");
    }
    


    const sendImage= ()=>
    {

        if(image === "https; '1'")
        {
            setStatus("no pic was taken");
        }
        else
        {
            setStatus("please wait...");
            let obj = JSON.stringify({'newpic':[{"image":image}]});

            let sendbj = JSON.parse(obj);

            axios.post('http://86af-105-61-254-218.ngrok.io/newuser', sendbj,
            {
                Headers:{
                    'Content-Type':'application/json'
                }
            })
          
            .then(res => {
              
                console.log(res);
                if(res.data[1] === "true")
                {
                    setSubmitstat("Submited Successfully");
                    setStatus("Submit");
                    history.push("/verification");
                    global.registered = true;

    
                }
               else if(res.data[1] === "false")
                {
                    setSubmitstat("No face was detected");
                    setStatus("Submit");
                }   
         
            })
            .catch(err =>{
            
                console.log(err);
                setSubmitstat("Try Again")
                setStatus("Submit");
            }); 

        }
    
    }
  
    
    if(global.authorised === true){
       
        return(

            <div className="webcam">
            <h2>New User</h2>
    
            <div className="webcaminnercontainer">
            
            <div className="webcaminner">  
            
            <h3>Capture your Image</h3>
    
            <div className="webcamholder">
            <Webcam id="camera" ref={webRef}/>
            </div>
            <p>*********************************</p>
            <div className="bottomnav"> 
            <button id="captureImage" onClick={()=>{
                showImage();
                setImage(img);
            }}> Capture</button>
           
            </div>
            </div>
    
            <div className="snapshot">
            
            
            <h3>Snapshot</h3>
            <img src={image} alt="Img" id="snapshot"></img>
            <p>{substatus}</p>
            <div>
            <button id="SubmitImage" onClick={()=>{
    
    
                sendImage();
            }}>{status}</button>
            </div>
            </div>
            </div>
            
            </div>
           
        )
        
    }
    else{
       
        return<Redirect to="/login"/>;
    }

   
}

export default Webcam1;