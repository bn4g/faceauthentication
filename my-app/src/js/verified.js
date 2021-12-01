import React from 'react';


import photo from "../photos/verified.jpg"





const Verified = ()=>{

    const mystyle = {

        with:350,
        height: 300,
        objectFit: "fill"
    
     }

    return(
       <div className="votingprocess">

       <img src={photo} alt="room photos" key={photo} style={mystyle}  />
       
       </div>

    )
}

export default Verified;