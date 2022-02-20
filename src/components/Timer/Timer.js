import React, { useEffect, useState } from 'react';
import {
  timeStamp, 
} from '../../utils/timerUtils';
import style from './Timer.module.css'

let startTimeFormatted, endTimeFormatted, startTime, offset, interval;

function Timer({
  subjects, 
  setSubjects,
  currentSubject, 
  setCurrentSubject, 
  timerOn, 
  setTimerOn, 
  currentTime, 
  setCurrentTime,
  faceDetected,
  useAi,
  userTimerOn, 
  setUserTimerOn,
}) {
  useEffect(() => {
    if(timerOn){
      startTimeFormatted = timeStamp();
      startTime = Date.now();
      offset = currentTime;
      interval = setInterval(() => {
        setCurrentTime(offset + Date.now() - startTime);
      }, 65)
    }
    else {
      endTimeFormatted = timeStamp();
      clearInterval(interval);
      if(currentSubject !== null){
        const updatedSubject = [...subjects];
        const subjectIdx = subjects.findIndex(subject => subject.name === currentSubject)
        updatedSubject[subjectIdx].totalTime = currentTime;
        setSubjects(updatedSubject);
      }
      
      // sendStudyInterval(startTimeFormatted, endTimeFormatted, currentSubjectId);  
      // onChangeStudyLog(indexToName(subjects, currentSubjectId), currentTime);
    }
  }, [timerOn, faceDetected]);

  const timer = (
    <span className={style.timer}>{ (currentTime >= 3600000 ? Math.floor((currentTime / 3600000) % 24) : Math.floor((currentTime/ 60000) % 60)).toString().padStart(2, '0') }
    : { (currentTime >= 3600000 ? Math.floor((currentTime / 60000) % 60) : Math.floor((currentTime/ 1000) % 60)).toString().padStart(2, '0') }
    : { (currentTime >= 3600000 ? Math.floor((currentTime / 1000) % 60) : Math.floor((currentTime % 1000) / 10)).toString().padStart(2, '0') }</span>
  );
  
  // const timer = (
  //   <span className={style.timer}>{ Math.floor((currentTime / 3600000) % 24).toString().padStart(2, '0') }
  //   : { Math.floor((currentTime / 60000) % 60).toString().padStart(2, '0') }
  //   : { Math.floor((currentTime / 1000) % 60).toString().padStart(2, '0') }</span>
  // );
  
  return ( 
    <div className = {style.timerContainer} >
      <div className={style.subjectTitle}>
        {currentSubject === null ? "과목 없음" : currentSubject}
      </div>
      {timer}
      <button className={style.timerButton} 
        onClick = {
        () => {
          setTimerOn(!timerOn);          
          setUserTimerOn(!timerOn);     
        }}> 
        {timerOn ? "STOP" : "START"}
      </button> 
    </div>
  );
}

// class Timer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleStopwatch.bind(this);
//   }
  
//   handleStopwatch() {
//     const {subjects, currentTime, currentSubjectId, timerRunning, onChangeCurrentTime, onChangeStudyLog} = this.props;
//     if(!timerRunning){
//       this.startTimeFormatted = timeStamp();
//       this.startTime = Date.now();
//       this.offset = currentTime;
//       this.interval = setInterval(() => {
//         onChangeCurrentTime(this.offset + Date.now() - this.startTime);
//       }, 70)
//     }
//     else {
//       this.endTimeFormatted = timeStamp();
//       clearInterval(this.interval);
//       sendStudyInterval(this.startTimeFormatted, this.endTimeFormatted, currentSubjectId);  
//       onChangeStudyLog(indexToName(subjects, currentSubjectId), currentTime);
//     }
//   }

//   render() {
//     const timer = (<h1>
//       <span className={style.timer}>{ (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 3600000) % 24) : Math.floor((this.props.currentTime/ 60000) % 60)).toString().padStart(2, '0') }
//       : { (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 60000) % 60) : Math.floor((this.props.currentTime/ 1000) % 60)).toString().padStart(2, '0') }
//       : { (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 1000) % 60) : Math.floor((this.props.currentTime % 1000) / 10)).toString().padStart(2, '0') }</span>
//     </h1>);
//     const {
//       onChangeTimerRunning,
//     } = this.props;
//     return ( 
//       <div className = {style.timerContainer} >
//         {timer}
//         <button className={style.timerButton} 
//           onClick = {
//           () => {
//             onChangeTimerRunning(this.props.timerRunning);
//             this.handleStopwatch();
//           }}> 
//           {this.props.timerRunning ? "Stop" : "Start"}
//         </button> 
//       </div>
//     );
//   }
// }

// const timer = (<h1>
//   <span className={style.timer}>{ (props.currentTime >= 3600000 ? Math.floor((props.currentTime / 3600000) % 24) : Math.floor((props.currentTime/ 60000) % 60)).toString().padStart(2, '0') }
//   : { (props.currentTime >= 3600000 ? Math.floor((props.currentTime / 60000) % 60) : Math.floor((props.currentTime/ 1000) % 60)).toString().padStart(2, '0') }
//   : { (props.currentTime >= 3600000 ? Math.floor((props.currentTime / 1000) % 60) : Math.floor((props.currentTime % 1000) / 10)).toString().padStart(2, '0') }</span>
// </h1>);
  
export default Timer;