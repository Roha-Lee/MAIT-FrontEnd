import React, {useState, useRef, useEffect} from 'react';
import Subjects from './components/Subjects/Subjects';
import Navigation from './components/Navigation/NavigationNew'
import Timer from './components/Timer/Timer';
import AIFaceFunctionViewer from './components/AIFunctionViewer/AIFaceFunctionViewer';
import AIHandFunctionViewer from './components/AIFunctionViewer/AIHandFunctionViewer';
import { Menu, Dropdown, Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAllUserData } from './utils/utils';
import {AiContainer, SubjectsContainer, BottomFlexBox, ColFlex, BottomColor, Seperator,TodayDate, WelcomeComment, DropdownContainer} from './Mainpage.styled'
import {connect} from "react-redux";
import { changeLogin, changeTodoLists, changeSubjects, changeColorsCodetoId, changeColorsIdtoCode } from './store';
import { notification} from 'antd';
import { useNavigate } from 'react-router';

const colorsIdtoCode = {};
const colorsCodetoId = {};

function Mainpage({
  isLogin,
  setIsLogin,
  setTodoList,
  setGlobalSubjects,
  setColorsCodetoId,
  setColorsIdtoCode,
}) {
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
  const [userName, setUserName] = useState('');
  const buttonRef = useRef(null);
  const loginComment = () =>{
    notification.open({
      message : "로그인을 해주세요.",
    });
  }
  let navigate = useNavigate();
  
  useEffect(() => {

    getAllUserData().then((userData)=> {
      setIsLogin(true);
      const newSubjects = userData.data.subjects.map(subject => {
        return {
          subjectId: subject.id, 
          name: subject.name,
          colorId: subject.colorId,
          totalTime: 0,
        }
      });
      
      userData.data.study.forEach(subject => {
        let hmsArray = subject.totalTime.split(":").map(elem => parseInt(elem));
        newSubjects
        .find(elem => elem.subjectId === subject.id)
        .totalTime = (hmsArray[0] * 3600 + hmsArray[1] * 60 + hmsArray[2]) * 1000 ;
      })
      
      setUserName(userData.data.nickname);
      setCurrentSubject(newSubjects.length > 0 ? newSubjects[0].name : "")
      setCurrentTime(newSubjects.length > 0 ? newSubjects[0].totalTime : 0)
        
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
      });

      setSubjects(newSubjects); // 과목 정보 
      setGlobalSubjects(JSON.parse(JSON.stringify(newSubjects)));
      setTodoList(JSON.parse(JSON.stringify(newTodos)));
      setColorsCodetoId(JSON.parse(JSON.stringify(colorsCodetoId)));
      setColorsIdtoCode(JSON.parse(JSON.stringify(colorsIdtoCode)));
    }).catch((e)=>{
      // console.log(e);
      setIsLogin(false);
    })
    
    
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
            loginComment();
            setTimeout(navigate("/Login"),1000);
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
            loginComment();
            setTimeout(navigate("/Login"),1000);
          }
          }}>
          손 인식 모드
        </div>
      </Menu.Item>
      
    </Menu>
  );

  return (
    <>
      <Navigation/>
      <ColFlex>
      
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
          timerOn={timerOn}
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
          <DropdownContainer>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button Button ref={buttonRef} style={{width : "110px",}}>AI 모드 선택</Button>
            </Dropdown>
          </DropdownContainer>
          <Seperator>|</Seperator>
          <WelcomeComment>{isLogin ? `${userName}님 안녕하세요!` : `로그인을 해주세요!`}</WelcomeComment>
          <Seperator>|</Seperator>
          <TodayDate>오늘은 {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일 입니다.</TodayDate>
        </BottomFlexBox>
        </BottomColor>
      </ColFlex>
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
        {/* <TodoListContainer colorsCodetoId={colorsCodetoId} colorsIdtoCode={colorsIdtoCode} todoList={todoList} setTodoList={setTodoList} subjects={subjects}/> */}
      
    </>
  )
}

function mapStateToProps(state){
  return{
      isLogin : state.isLogin,
  };
}

function mapDispatchToProps(dispatch){
  return{
      setIsLogin : isLogin => dispatch(changeLogin(isLogin)),
      setTodoList : newTodos => dispatch(changeTodoLists(newTodos)),
      setGlobalSubjects : newSubjects => dispatch(changeSubjects(newSubjects)),
      setColorsCodetoId : value => dispatch(changeColorsCodetoId(value)),
      setColorsIdtoCode : value => dispatch(changeColorsIdtoCode(value)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps) (Mainpage);
