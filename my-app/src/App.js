import React, {useState} from 'react';

import './App.css'
import './cs/loginpg.css'
import './cs/newuser.css'
import './cs/verification.css'
import './cs/veriied.css'

import Login from './js/loginpg';
import Webcam1 from './js/newuser';
import Verification from './js/verification';
import Verified from './js/verified';
import "./js/GlobalVariables"; 
import  {BrowserRouter as Router,Route, Switch} from "react-router-dom";




function App() {

  //const [active, setActive]= useState("verification");
  
 
  return (

    <Router className="App">
    <Switch>
    <Route exact path="/login" component={Login}/>
    <Route 
    exact 
    path="/webcam" 
    component={()=><Webcam1 authorized={global.authorised}/> }/>
    <Route exact path="/verification" component={()=><Verification authorized={global.registered}/> }/>
    <Route exact path="/verified" component={Verified}/>

    </Switch>
    </Router>
  );
}

export default App;
