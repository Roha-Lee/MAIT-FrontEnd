
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, MainContainer, NavContainer,NavLogo,  NavMenu, NavIcon, NavSpan, NavLink ,NavItem } from './NavigationNew.styled'
import { useNavigate } from 'react-router';
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime} from "../../utils/utils"
import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import TodoListContainer from "../TodoListContainer/TodoListContainer";
import { notification} from 'antd';

function Navigation({isLogin , setIsLogin,currentStudyTimeId , setCurrentStudyTimeId, timerOn, todoList, subjects, setTodoList, colorsIdtoCode, colorsCodetoId}) {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  
  const goToCamstudyLobby = () => {
      click ? handleClick() : null;
      window.open("/camstudyLobby");
  }
  const closeTodoModal = () => setShow(false);
  const openTodoModal = () => {
      click ? handleClick() : null;
      setShow(true);
  }

  const loginComment = () =>{
    notification.open({
      message : "로그인을 해주세요.",
    });
  }

  let navigate = useNavigate();

  async function handleSignIn(){
      if(isLogin === true){
          //TODO : 로그아웃시 서버와 통신 필요 ex. 토큰 삭제 및 타이머 정지하여 데이터 기록
          // setIsLogin(!isLogin); //TO Check
          if(timerOn){
              patchStudyTime(currentStudyTimeId,timeStamp()).then(
                  setCurrentStudyTimeId(null)
              )
          }
          const signOutResponse = await signOut();
          console.log(signOutResponse);
          if(signOutResponse.data.message === 'SUCCESS'){
              window.sessionStorage.removeItem("accessToken");
              window.location.replace("/");
          }else{
              if(click){
                handleClick();
              }
              alert("서버오류");
          }

      }else{
          if(click){
            handleClick();
          }
          navigate("/Login");
      }
  }

  function goToStatistics(){
      if(isLogin === true){
          if(timerOn){
              patchStudyTime(currentStudyTimeId,timeStamp()).then(
                  setCurrentStudyTimeId(null)
              )
          }
          if(click){
            handleClick();
          }
          navigate("/Statistics");
      }else{
          if(click){
            handleClick();
          }
          loginComment();
          navigate("/Login");
      }
  }

  function goToHome(){
    navigate("/");
  }

  const navigations = (  <>
  <NavBar onClick={e => e.stopPropagation()}>
  <NavContainer>
    <NavLogo><NavLink onClick={goToHome}>M.AI.T</NavLink></NavLogo>
  <NavMenu className={click ? "active" : ""}>
    <NavItem>
    <NavLink
      onClick={goToHome}
    >
      AI 타이머
    </NavLink>
    </NavItem>
    
    <NavItem>
    <NavLink
      onClick={openTodoModal}
    >
      할일
    </NavLink>
    </NavItem>
    <NavItem>
    <NavLink
      onClick={goToStatistics}
    >
      통계
    </NavLink>
    </NavItem>
    <NavItem>
    <NavLink
      onClick={goToCamstudyLobby}
    >
      캠스터디
    </NavLink>
    </NavItem>
    <NavItem>
    <NavLink
      onClick={handleSignIn}
    >
      {isLogin ? "로그아웃" : "로그인"}
    </NavLink>
    </NavItem>
  </NavMenu>
  <NavIcon onClick={handleClick}>
    <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
  </NavIcon>
  </NavContainer>
</NavBar>
<Modal show={show} onHide={closeTodoModal}>
    <Modal.Header closeButton>
    <Modal.Title>{new Date().getFullYear()}년 {new Date().getMonth() + 1}월 {new Date().getDate()}일 목표!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <TodoListContainer todoList={todoList} subjects={subjects} setTodoList={setTodoList} colorsIdtoCode={colorsIdtoCode} colorsCodetoId={colorsCodetoId}/>
    </Modal.Body>
    <Modal.Footer>
    {/* <Button variant="secondary" onClick={handleClose}>
        Close
    </Button>
    <Button variant="primary" onClick={handleClose}>
        Save Changes
    </Button> */}
    </Modal.Footer>
</Modal>
</>
);
  return (
    <div>
     {click ? 
    <MainContainer onClick={() => Close()}>
      {navigations}
    </MainContainer> : <>{navigations}</>} 
    
    </ div>
  );
  }
  


function mapStateToProps(state){
  return{
    isLogin : state.isLogin,
    currentStudyTimeId : state.currentStudyTimeId,
    timerOn : state.timerOn,
  };
}

function mapDispatchToProps(dispatch){
  return{
    setIsLogin : isLogin => dispatch(changeLogin(isLogin)),
    setCurrentStudyTimeId : id => dispatch(changeCurrentStudyTimeId(id))
  };
}


export default connect(mapStateToProps,mapDispatchToProps) (Navigation);