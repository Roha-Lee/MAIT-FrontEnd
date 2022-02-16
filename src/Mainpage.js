import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Subjects from './components/Subjects/Subjects';
import Timer from './components/Timer/Timer';
import {getAllUserData} from './utils/AppUtils';
import AIFaceFunctionViewer from './components/AIFunctionViewer/AIFaceFunctionViewer';
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
  const [useFaceAi, setUseFaceAi] = useState(false);
  const [useHandAi, setUseHandAi] = useState(false);

  return (
    <div className="App">
      {useFaceAi ? 
        <AiContainer>
          <AIFaceFunctionViewer 
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            userTimerOn={userTimerOn}
            setUserTimerOn={setUserTimerOn}
          />
        </AiContainer>
      : null}
      {useHandAi ? 
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
        <span>얼굴 인식</span>
        <ToggleButton
          value={ useFaceAi || false }
          onToggle={(value) => {
            setUseFaceAi(!value);
          }} />
          <span>손 인식</span>
        <ToggleButton
        value={ useHandAi || false }
        onToggle={(value) => {
          setUseHandAi(!value);
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
