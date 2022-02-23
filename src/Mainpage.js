import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Subjects from './components/Subjects/Subjects';
import Timer from './components/Timer/Timer';
import {getAllUserData} from './utils/AppUtils';
import AIFunctionViewer from './components/AIFunctionViewer/AIFunctionViewer';
import ToggleButton from 'react-toggle-button'
import TodoListContainer from './components/TodoListContainer/TodoListContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AiContainer, SubjectsContainer, CamButton, FlexBox} from './Mainpage.styled'
import { Link } from 'react-router-dom';

function Mainpage() {
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [userTimerOn, setUserTimerOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [useAi, setUseAi] = useState(false);

  return (
    <div className="App">
      {useAi ? 
        <AiContainer>
          <AIFunctionViewer 
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            userTimerOn={userTimerOn}
            setUserTimerOn={setUserTimerOn}
          />
        </AiContainer>
      : null}
      <SubjectsContainer>       
        <Subjects 
          setModalState={setModalOpen}
          modalOpen={modalOpen}
          setSubjects={setSubjects}
          subjects={subjects}
          currentSubject={currentSubject}
          setCurrentSubject={setCurrentSubject}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTimerOn={setTimerOn}
        />
        <Timer
          subjects={subjects}
          setSubjects={setSubjects}
          currentSubject={currentSubject}
          setCurrentSubject={setCurrentSubject}
          timerOn={timerOn}
          setTimerOn={setTimerOn}
          userTimerOn={userTimerOn}
          setUserTimerOn={setUserTimerOn}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <ToggleButton
          value={ useAi || false }
          onToggle={(value) => {
            setUseAi(!value);
          }} />
      </SubjectsContainer>
      <FlexBox>
        <CamButton
          onClick={() => {window.open("/camstudy")}}>
            Cam Study
        </CamButton>
      </FlexBox>
      <TodoListContainer subjects={subjects}/>
    </div>
          )
  }

export default Mainpage;
