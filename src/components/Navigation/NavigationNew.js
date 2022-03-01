
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, MainContainer, NavContainer,NavLogo,  NavMenu, NavIcon, NavSpan, NavLink ,NavItem } from './NavigationNew.styled'
import { useNavigate } from 'react-router';
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime} from "../../utils/utils"
import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import TodoListContainer from "../TodoListContainer/TodoListContainer";
import TodoInput from '../TodoInput/TodoInput'

function Navigation({isLogin , setIsLogin,currentStudyTimeId , setCurrentStudyTimeId, timerOn, todoList, subjects}) {
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
  const navigations = (  <>
  <NavBar onClick={e => e.stopPropagation()}>
  <NavContainer>
    <NavLogo><NavLink exact to="/">M.AI.T</NavLink></NavLogo>
  <NavMenu className={click ? "active" : ""}>
    <NavItem>
    <NavLink
      exact
      to="/"
      onClick={click ? handleClick : null}
    >
      AI 타이머
    </NavLink>
    </NavItem>
    
    <NavItem>
    <NavSpan
      onClick={openTodoModal}
    >
      할일
    </NavSpan>
    </NavItem>
    <NavItem>
    <NavLink
      exact
      to="/statistics"
      onClick={click ? handleClick : null}
    >
      통계
    </NavLink>
    </NavItem>
    <NavItem>
    <NavSpan
      onClick={goToCamstudyLobby}
    >
      캠스터디
    </NavSpan>
    </NavItem>
    <NavItem>
    <NavLink
      exact
      to="/Login"
      onClick={click ? handleClick : null}
    >
      로그인
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
        <TodoListContainer todoList={todoList} subjects={subjects} />
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