import React, { useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Login from "./components/Login"
import Signup from "./components/Signup"
import Mainpage from './Mainpage';
import CamstudyLobby from "./components/CamstudyLobby/CamstudyLobby"
import CamstudyRoom from "./components/CamstudyRoom/CamstudyRoom"
import Statistics from "./components/Statistics/Statistics"
import "antd/dist/antd.min.css";
import "font-awesome/css/font-awesome.min.css";
const {Kakao} = window;

function App() {
  useEffect(()=>{
    Kakao.init("a8bc6c8c78a37b3a4f9534891cbddd5d");
  },[]);
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/camstudyLobby" element={<CamstudyLobby/>}/>
            <Route path="/camstudyRoom" element={<CamstudyRoom/>}/>
            <Route path="Statistics" element={<Statistics/>}/>
            <Route path="/" element={<Mainpage/>}/>
          </Routes>
        </BrowserRouter>
          )
  }

export default App;
