import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Subjects from './components/Subjects/Subjects';
import Timer from './components/Timer/Timer';
import {getAllUserData} from './utils/AppUtils';
import AIFunctionViewer from './components/AIFunctionViewer/AIFunctionViewer';
import ToggleButton from 'react-toggle-button'
import TodoListContainer from './components/TodoListContainer/TodoListContainer'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [userTimerOn, setUserTimerOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [useAi, setUseAi] = useState(false);

  useEffect(() => {
    getAllUserData().then((userData)=> {
      setSubjects(userData.data.subjects);
    });
    
  }, []);
    
  return (<div className="App">
            <Navigation />

            {useAi ? 
              <div style={{
                display: 'flex',
                margin: '1rem auto',  
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <AIFunctionViewer 
                    timerOn={timerOn}
                    setTimerOn={setTimerOn}
                    userTimerOn={userTimerOn}
                    setUserTimerOn={setUserTimerOn}
                />
              </div> 
            : null}
            <div style={ {
              'display': 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'backgroundColor': '#EBB057',
              'margin': '20px auto',
              'width': '480px',
              borderRadius: '20px',
              padding: '20px 0',
            }}>
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
              
             
            </div>
            <TodoListContainer subjects={subjects}/>
            {/* <Timer
              subjects={this.state.subjects}
              timerRunning={this.state.timerRunning}
              currentSubjectId={this.state.currentSubjectId}
              currentTime={this.state.currentTime}
              onChangeCurrentTime={this.changeCurrentTime}  
              onChangeTimerRunning={this.changeTimerRunning} 
              onChangeStudyLog={this.changeStudyLog}
            /> */}

            {/* <Subjects 
              studyLog={this.state.studyLog} 
              subjects={this.state.subjects}
              timerRunning={this.state.timerRunning}
              onChangeSubject={this.changeSubject}
              onChangeCurrentTime={this.changeCurrentTime}
              currentSubjectId={this.state.currentSubjectId}
              openModal={this.openModal}
              closeModal={this.closeModal}
              isOpen={this.state.modalOpen}
              onAddSubject={this.addSubject}
              />
            <Timer
              studyLog={this.state.studyLog} 
              subjects={this.state.subjects}
              timerRunning={this.state.timerRunning}
              currentSubjectId={this.state.currentSubjectId}
              currentTime={this.state.currentTime}
              onChangeCurrentTime={this.changeCurrentTime}  
              onChangeTimerRunning={this.changeTimerRunning} 
              onChangeStudyLog={this.changeStudyLog}
              />
            <AITest 
              timerRunning={this.state.timerRunning}
              onChangeTimerRunning={this.changeTimerRunning}
            /> */}
          </div>)
  }

export default App;
