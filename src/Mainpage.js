import React, {useState, useEffect} from 'react';
import Subjects from './components/Subjects/Subjects';
import Timer from './components/Timer/Timer';
import AIFaceFunctionViewer from './components/AIFunctionViewer/AIFaceFunctionViewer';
import AIHandFunctionViewer from './components/AIFunctionViewer/AIHandFunctionViewer';
import ToggleButton from 'react-toggle-button'
import TodoListContainer from './components/TodoListContainer/TodoListContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AiContainer, SubjectsContainer, CamButton, FlexBox} from './Mainpage.styled'


function Mainpage() {
  const [subjects, setSubjects] = useState([{
    subjectId: 1, 
    name: 'Algorithm',
    color: 'a67ebf',
    totalTime: 11231300,
  },
  {
    subjectId: 3, 
    name: 'Javascript',
    color: '6dbf84',
    totalTime: 232400,
  },
  {
    subjectId: 2, 
    name: 'OS',
    color: 'bf6d7f',
    totalTime: 0,
  },
]);
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
            useFaceAi = { useFaceAi || false }
            setUseFaceAi = {setUseFaceAi}
          />
        </AiContainer>
      : null}
      {useHandAi ? 
        <AiContainer>
          <AIHandFunctionViewer 
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            userTimerOn={userTimerOn}
            setUserTimerOn={setUserTimerOn}
            useHandAi = { useHandAi || false }
            setUseHandAi = {setUseHandAi}
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
