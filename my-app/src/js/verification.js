import React , {useState, useRef}from 'react';
import Webcam from 'react-webcam'
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {Redirect} from "react-router-dom";



const Verification = ()=>{

    const webRef = useRef(null);
    let img = "https; '1'";
    let history = useHistory();

    const [valid, setValid] = useState("Take A short ");

    let sendtodb = (postobj)=>
    {
        setValid("please wait.....");

        let sendbj = JSON.parse(postobj);

        axios.post('http://82b5-105-161-169-213.ngrok.io/imageverification', sendbj,
        {
            Headers:{
                'Content-Type':'application/json'
            }
        })
      
        .then(res => {
          
            console.log(res);
            if(res.data[1] === "true")
            {
                setValid("Verified");
                history.push("/verified");
                global.verified = true;


            }
           else if(res.data[1] === "false")
            {
                setValid("unknown");
            }
           else if(res.data[1] === "false")
            {
                setValid("unknown");
            }

            
     
        })
        .catch(err =>{
        
            console.log(err);
            setValid("Try Again")
        }); 

    }

    const showImage = ()=>
    {
        img = webRef.current.getScreenshot();
        if (img !== "https; '1'")
        {
            let obj = JSON.stringify({'verification':[{"image":img}]});


sendtodb(obj);
        }

    }

    if(global.verified === true){

    return(

        <div className ="verification">
        
        <h2>Verification</h2>
        <div className="webcamholder">

        <Webcam id="webcamcontent" ref={webRef} />
        
        </div>

<button id="validatebutton" onClick={()=>{

    showImage();
}}>Capture</button>
<div id="verificationstatus">
<p >{valid}</p>
</div>

        
        </div>

    )
}
else
{
    return<Redirect to="/webcam"/>;
}
}

export default Verification;