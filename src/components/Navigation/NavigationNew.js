
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, MainContainer, NavContainer,NavLogo,  NavMenu, NavIcon, NavSpan, NavLink ,NavItem } from './NavigationNew.styled'
import { useNavigate } from 'react-router';
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime} from "../../utils/utils"

function Navigation() {
  const [click, setClick] = useState(false);
  
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const goToCamstudyLobby = () => {
      click ? handleClick() : null;
      window.open("/camstudyLobby");
  }
  const openTodoModal = () => {
      click ? handleClick() : null;
      // TODO: todo modal 여는 로직 추가 
  }
  const navigations = (  <NavBar onClick={e => e.stopPropagation()}>
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
</NavBar>);
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