
// import Mainpage from './components/Mainpage'
import React, {useState, useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Subjects from './components/Subjects/Subjects';
import Timer from './components/Timer/Timer';
// import AITest from './components/AITest/AITest';
import {getAllUserData, postNewSubject} from './utils/AppUtils';


function App() {
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    getAllUserData().then((userData)=> {
      setSubjects(userData.data.subjects);
    });
    
  }, []);
    
  return (<div className="App">
            <Navigation />
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
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
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
// class App extends React.Component {
//   constructor(props){
//     super(props);
    // this.state = {
    //   studyLog : {
    //   },
    //   useAi : false,
    //   timerRunning: false,
    //   currentSubjectId: 1,
    //   currentTime: 0,
    //   todoLists : {
    //   },
    //   subjects : {
    //   }, 
    //   modalOpen : false,
    // }
//   }
  
  // componentDidMount() {
  //   getAllUserData().then((userData)=> {
  //     const studyLog = {
  //       'math': 0,
  //       'english': 0,
  //       'programming': 0,
  //       '로하그루': 0,
  //     }

//       const todoLists = [
//         { 
//           id: 1,
//           subject: 'math',
//           content: '수학의정석 3단원 연습문제',
//           isDone: false,
//         }
//       ]

//       const subjects = {
//         'math': 1,
//         'english': 2,
//         'programming': 3,
//         '로하그루': 4,
//       }

//       this.setState({
//         studyLog,
//         todoLists,
//         subjects,
//      });
    
//     })
//   }

//   openModal = () => {
//     this.setState({ modalOpen: true })
//   }

//   closeModal = () => {
//     this.setState({ modalOpen: false })
//   }
  
//   changeSubject = (id) => {
//     this.setState({currentSubjectId : id});
//   }

//   changeCurrentTime = (newTime) => {
//     this.setState({currentTime: newTime});
//   }

//   changeTimerRunning = (currentTimerRunning) => {
//     this.setState({timerRunning : !currentTimerRunning});
//   }

//   changeStudyLog = (subject, newTime) => {
//     const studyLog = {...this.state.studyLog};
//     studyLog[subject] = newTime;
//     this.setState({studyLog});
//   }

//   addSubject = (newSubject) => {
//     if(!Object.keys(this.state.studyLog).includes(newSubject) &&
//       !Object.keys(this.state.subjects).includes(newSubject)){
//       const studyLog = {...this.state.studyLog};
//       studyLog[newSubject] = 0;
//       const subjects = {...this.state.subjects};
//       // 임시로 처리 
//       subjects[newSubject] = Object.keys(subjects).length + 1;
//       this.setState({studyLog, subjects})

//       // postNewSubject();
//     }
//     else{
//       alert('이미 존재하는 과목입니다.')
//     }
//   }

//   render() {
//     return (
//       <div className="App">
//         <Navigation />
//         <Subjects 
//           studyLog={this.state.studyLog} 
//           subjects={this.state.subjects}
//           timerRunning={this.state.timerRunning}
//           onChangeSubject={this.changeSubject}
//           onChangeCurrentTime={this.changeCurrentTime}
//           currentSubjectId={this.state.currentSubjectId}
//           openModal={this.openModal}
//           closeModal={this.closeModal}
//           isOpen={this.state.modalOpen}
//           onAddSubject={this.addSubject}
//           />
//         <Timer
//           studyLog={this.state.studyLog} 
//           subjects={this.state.subjects}
//           timerRunning={this.state.timerRunning}
//           currentSubjectId={this.state.currentSubjectId}
//           currentTime={this.state.currentTime}
//           onChangeCurrentTime={this.changeCurrentTime}  
//           onChangeTimerRunning={this.changeTimerRunning} 
//           onChangeStudyLog={this.changeStudyLog}
//           />
//         <AITest 
//           timerRunning={this.state.timerRunning}
//           onChangeTimerRunning={this.changeTimerRunning}
//         />
//       </div>
//     );
//   } 
// }


