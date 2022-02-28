import React, {useState, useRef, useEffect} from 'react';
import Subjects from './components/Subjects/Subjects';
import Navigation from './components/Navigation/Navigation'
import Timer from './components/Timer/Timer';
import AIFaceFunctionViewer from './components/AIFunctionViewer/AIFaceFunctionViewer';
import AIHandFunctionViewer from './components/AIFunctionViewer/AIHandFunctionViewer';
import { Menu, Dropdown, Button } from 'antd';
import TodoListContainer from './components/TodoListContainer/TodoListContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAllUserData } from './utils/utils';
import {AiContainer, SubjectsContainer, CamButton, BottomFlexBox, DropdownContainer, ColFlex, BottomColor, Seperator} from './Mainpage.styled'
import axios from 'axios';
import {connect} from "react-redux";

const colorsIdtoCode = {};
const colorsCodetoId = {};

function Mainpage({isLogin}) {
  // {
  //   subjectId: 1, 
  //   name: 'Algorithm',
  //   color: 'a67ebf',
  //   totalTime: 11231300,
  // },
  // {
  //   subjectId: 3, 
  //   name: 'Javascript',
  //   color: '6dbf84',
  //   totalTime: 232400,
  // },
  // {
  //   subjectId: 2, 
  //   name: 'OS',
  //   color: 'bf6d7f',
  //   totalTime: 0,
  // },
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [userTimerOn, setUserTimerOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [useFaceAi, setUseFaceAi] = useState(false);
  const [useHandAi, setUseHandAi] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const buttonRef = useRef(null);
  
  
  useEffect(() => {
    if(isLogin){
      
      getAllUserData().then((userData)=> {
        const newSubjects = userData.data.subjects.map(subject => {
          return {
            subjectId: subject.id, 
            name: subject.name,
            colorId: subject.colorId,
            totalTime: 0,
          }
        });

        setCurrentSubject(newSubjects.length > 0 ? newSubjects[0].name : "")
        
        userData.data.study.forEach(subject => {
          let hmsArray = subject.totalTime.split(":").map(elem => parseInt(elem));
          newSubjects
          .find(elem => elem.subjectId === subject.id)
          .totalTime = (hmsArray[0] * 3600 + hmsArray[1] * 60 + hmsArray[2]) * 1000 ;
        })
        
          
        //{ id: 1, content: '알고리즘 BFS 문제 풀기', isDone: false, subjectId:  1},
        const newTodos = userData.data.todos.map(todo => {
          return {
            todoId: todo.id,
            content: todo.content,
            subjectId: todo.subjectId,
            isDone: todo.isDone
          }
        });
        userData.data.colors.forEach(color => {
          colorsCodetoId[color.code] = color.id;
          colorsIdtoCode[color.id] = color.code;
        })
      
        setSubjects(newSubjects); // 과목 정보 
        setTodoList(newTodos);
      });
    }
    
  }, []);

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => {
          setUseFaceAi(false);
          setUseHandAi(false);
          buttonRef.current.querySelector('span').innerText = "AI 모드 선택"
        }}>
          사용 안함
        </div>
      </Menu.Item>
      <Menu.Item>  
        <div onClick={() => {
          if(isLogin){
            setUseFaceAi(true);
            setUseHandAi(false);
            buttonRef.current.querySelector('span').innerText = "얼굴 인식 모드"
          }else{
            alert("로그인을 해주세요.")
          }
        }}>
          얼굴 인식 모드
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => {
          if(isLogin){
            setUseFaceAi(false);
            setUseHandAi(true);
            buttonRef.current.querySelector('span').innerText = "손 인식 모드"
          }else{
            alert("로그인을 해주세요.")
          }
          }}>
          손 인식 모드
        </div>
      </Menu.Item>
      
    </Menu>
  );

  return (
    <>
      <Navigation />
      <ColFlex>
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
        // <AiContainer>
          <AIHandFunctionViewer 
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            userTimerOn={userTimerOn}
            setUserTimerOn={setUserTimerOn}
            useHandAi = { useHandAi || false }
            setUseHandAi = {setUseHandAi}
          />
        // </AiContainer>
      : null}
      <SubjectsContainer>       
        <Subjects 
          colorsIdtoCode={colorsIdtoCode}
          colorsCodetoId={colorsCodetoId}
          setSubjects={setSubjects}
          subjects={subjects}
          currentSubject={currentSubject}
          setCurrentSubject={setCurrentSubject}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTimerOn={setTimerOn}
          setUserTimerOn={setUserTimerOn}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      </SubjectsContainer>
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
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
        <BottomColor>
        <BottomFlexBox>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button Button ref={buttonRef} style={{marginLeft:"25px"}}>AI 모드 선택</Button>
          </Dropdown>
          <Seperator>|</Seperator>
          <div>000님 안녕하세요</div>
          
          <Seperator>|</Seperator>
          <div>오늘은 {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일 입니다.</div>
        </BottomFlexBox>
        </BottomColor>
      </ColFlex>
        {/* <TodoListContainer colorsCodetoId={colorsCodetoId} colorsIdtoCode={colorsIdtoCode} todoList={todoList} setTodoList={setTodoList} subjects={subjects}/> */}
      
    </>
          )
  }

  function mapStateToProps(state){
    return{
        isLogin : state.isLogin,
    };
}

export default connect(mapStateToProps) (Mainpage);
