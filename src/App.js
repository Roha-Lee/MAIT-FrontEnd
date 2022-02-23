import React from 'react';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Login from "./components/Login"
import Signup from "./components/Signup"
import Mainpage from './Mainpage';
import CamStudy from "./components/CamStudy/CamStudy"
import MaitCamstudy from "./components/MaitCamstudy/MaitCamstudy"
import Statistics from "./components/Statistics/Statistics"
import "antd/dist/antd.min.css";
import "font-awesome/css/font-awesome.min.css";
function App() {
  
  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>
            
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/camstudy" element={<MaitCamstudy/>}/>
            {/* <Route path="/camstudy" element={<CamStudy/>}/> */}
            <Route path="Statistics" element={<Statistics/>}/>
            <Route path="/" element={<Mainpage/>}/>
          </Routes>
        </BrowserRouter>
          )
  }

export default App;
