import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Subjects from './components/Subjects/Subjects';
import Timer from './components/Timer/Timer';
import {getAllUserData} from './utils/AppUtils';
import AIFunctionViewer from './components/AIFunctionViewer/AIFunctionViewer';
import ToggleButton from 'react-toggle-button'
import TodoListContainer from './components/TodoListContainer/TodoListContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, HashRouter, Route,Routes} from 'react-router-dom';
import Login from "./components/Login"
import Signup from "./components/Signup"
import Mainpage from './Mainpage';
import CamStudy from "./components/CamStudy/CamStudy"
function App() {
  
  return (
      <BrowserRouter>
          <Navigation/>
          <Routes>

            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/camstudy" element={<CamStudy/>}/>
            <Route path="Statistics" element={<Statistics/>}/>
            <Route path="/" element={<Mainpage/>}/>

        
          </Routes>
        </BrowserRouter>
          )
  }

export default App;
