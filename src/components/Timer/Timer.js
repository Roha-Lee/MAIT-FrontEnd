import React, { useEffect, useState } from 'react';
import { timeStamp, postStudyTime, patchStudyTime } from '../../utils/utils';
// import style from './Timer.module.css'
import {SubjectTitle, TimerContainer, Timer_set, TimerButton,NoSubjectMessage} from './Timer.styled'
import 'animate.css'
import {connect} from "react-redux";
import {changeCurrentStudyTimeId, changeTimerOn, changeSafeDataInterval, changeLogin} from "../../store";
import { notification} from 'antd';
import { useNavigate } from 'react-router';
let startTimeFormatted, endTimeFormatted, startTime, offset, interval, safeDataInterval;
let currentStudyTimeId = null;

function Timer({
  subjects, 
  setSubjects,
  currentSubject, 
  timerOn, 
  setTimerOn, 
  currentTime, 
  setCurrentTime,
  setUserTimerOn,
  isEditMode,
  isLogin,
  setIsLogin,
  setCurrentStudyTimeId,
  setGlobalTimerOn,
  setSafeDataInterval,
}) {
  let navigate = useNavigate();
  const loginComment = () =>{
    notification.open({
      message : "로그인을 해주세요.",
    });
  }

  useEffect(async () => {
  
    if(timerOn){
      try {
        startTimeFormatted = timeStamp();
        startTime = Date.now();
        offset = currentTime;
        interval = setInterval(() => {
          setCurrentTime(offset + Date.now() - startTime);
        }, 73)
        const currentSubjectId = subjects.find(elem => elem.name === currentSubject).subjectId;  
        const result = await postStudyTime(currentSubjectId, startTimeFormatted);
        
        if(result.data.message === 'SUCCESS'){
          currentStudyTimeId = result.data.id;
          setCurrentStudyTimeId(currentStudyTimeId);
          safeDataInterval = setInterval(async () => {
            endTimeFormatted = timeStamp();
            console.log("setInterval " + new Date())
            const result = await patchStudyTime(currentStudyTimeId, endTimeFormatted);
          }, 60000);
          setSafeDataInterval(safeDataInterval);
        }
      } catch(error) {
        // 다른 기기에서 로그인해서 로그아웃 되었습니다. 다시 로그인 해주세요.
        notification.open({
          message : "다른 기기에서 로그인해서 로그아웃 되었습니다. 다시 로그인 해주세요.",
        });
        window.sessionStorage.removeItem("accessToken");
        setIsLogin(false);
        window.location.replace('/Login');
      }
      
    }
    else {
      endTimeFormatted = timeStamp();
      clearInterval(interval);
      clearInterval(safeDataInterval);
      safeDataInterval = null;
      setSafeDataInterval(safeDataInterval);
      if(currentSubject !== null){
        const updatedSubject = [...subjects];
        const subjectIdx = subjects.findIndex(subject => subject.name === currentSubject)
        updatedSubject[subjectIdx].totalTime = currentTime;
        setSubjects(updatedSubject);
      }
      if (!!currentStudyTimeId){
        const result = await patchStudyTime(currentStudyTimeId, endTimeFormatted);
        console.log('send patch!', result);
        currentStudyTimeId = null;  
      }

    }
  }, [timerOn]);
  
  

  const timer = (
    <Timer_set>{ (currentTime >= 3600000 ? Math.floor((currentTime / 3600000) % 24) : Math.floor((currentTime/ 60000) % 60)).toString().padStart(2, '0') }
    : { (currentTime >= 3600000 ? Math.floor((currentTime / 60000) % 60) : Math.floor((currentTime/ 1000) % 60)).toString().padStart(2, '0') }
    : { (currentTime >= 3600000 ? Math.floor((currentTime / 1000) % 60) : Math.floor((currentTime % 1000) / 10)).toString().padStart(2, '0') }</Timer_set>
  );
  
  return ( 
    <TimerContainer>
      {subjects.length > 0 ? 
      (<><SubjectTitle>
        {currentSubject}
      </SubjectTitle>
      {timer}
      <TimerButton 
        onClick = {
        (event) => {
          if(isLogin){
            if(isEditMode !== true){
              setTimerOn(!timerOn);          
              setUserTimerOn(!timerOn);
              setGlobalTimerOn(!timerOn);
            } else {
              event.target.classList.add('animate__animated')
              event.target.classList.add('animate__headShake')
              setTimeout(() => {
                event.target.classList.remove('animate__animated')
                event.target.classList.remove('animate__headShake')
              }, 500);
            }
          }else{
            loginComment();
            setTimeout(() => navigate("/Login"), 1000);
          }
        }}> 
        {timerOn ? "STOP" : "START"}
      </TimerButton></>) : <NoSubjectMessage>과목 정보가 없습니다. <br />버튼을 눌러 과목을 추가해주세요.</NoSubjectMessage>}
    </TimerContainer>
  );
}


function mapStateToProps(state){
  return{
      isLogin : state.isLogin,
  };
}

function mapDispatchToProps(dispatch){
  return{
      setCurrentStudyTimeId : id => dispatch(changeCurrentStudyTimeId(id)),
      setGlobalTimerOn : timerOn => dispatch(changeTimerOn(timerOn)),
      setSafeDataInterval : safeDataInterval => dispatch(changeSafeDataInterval(safeDataInterval)),
      setIsLogin : value => dispatch(changeLogin(value)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps) (Timer);