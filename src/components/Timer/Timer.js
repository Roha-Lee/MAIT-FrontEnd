import React from 'react';
import {
  timeStamp, 
  sendStudyInterval,
  indexToName
} from '../../utils/timerUtils';
import style from './Timer.module.css'
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.handleStopwatch.bind(this);
  }

  handleStopwatch() {
    const {subjects, currentTime, currentSubjectId, timerRunning, onChangeCurrentTime, onChangeStudyLog} = this.props;
    if(!timerRunning){
      this.startTimeFormatted = timeStamp();
      this.startTime = Date.now();
      this.offset = currentTime;
      this.interval = setInterval(() => {
        onChangeCurrentTime(this.offset + Date.now() - this.startTime);
      }, 70)
    }
    else {
      this.endTimeFormatted = timeStamp();
      clearInterval(this.interval);
      sendStudyInterval(this.startTimeFormatted, this.endTimeFormatted, currentSubjectId);  
      onChangeStudyLog(indexToName(subjects, currentSubjectId), currentTime);
    }
  }

  render() {
    const timer = (<h1>
      <span className={style.timer}>{ (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 3600000) % 24) : Math.floor((this.props.currentTime/ 60000) % 60)).toString().padStart(2, '0') }
      : { (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 60000) % 60) : Math.floor((this.props.currentTime/ 1000) % 60)).toString().padStart(2, '0') }
      : { (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 1000) % 60) : Math.floor((this.props.currentTime % 1000) / 10)).toString().padStart(2, '0') }</span>
    </h1>);
    const {
      onChangeTimerRunning,
    } = this.props;
    return ( 
      <div className = {style.timerContainer} >
        {timer}
        <button className={style.timerButton} 
          onClick = {
          () => {
            onChangeTimerRunning(this.props.timerRunning);
            this.handleStopwatch();
          }}> 
          {this.props.timerRunning ? "Stop" : "Start"}
        </button> 
      </div>
    );
  }
}
export default Timer;