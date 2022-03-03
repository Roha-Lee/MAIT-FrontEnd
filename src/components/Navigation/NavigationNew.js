
import React, { useState } from 'react';
import { NavBar, MainContainer, NavContainer,NavLogo,  NavMenu, NavIcon, NavSpan, NavLink ,NavItem } from './NavigationNew.styled'
import { useNavigate } from 'react-router';
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime, getTodos} from "../../utils/utils"
import TodoListContainer from "../TodoListContainer/TodoListContainer";
import { notification, Modal} from 'antd';

function Navigation({
  isLogin , 
  currentStudyTimeId , 
  setCurrentStudyTimeId, 
  timerOn, 
  subjects, 
  colorsIdtoCode}) {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const handleClick = () => setClick(!click);
  
  const loginComment = () =>{
    notification.open({
      message : "로그인을 해주세요.",
    });
  }
  
  const Close = () => setClick(false);

  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = () => {
    setShow(false);
  };
  
  const goToCamstudyLobby = () => {
      click ? handleClick() : null;
      if(isLogin){
        window.open("/camstudyLobby");
      }else{
        loginComment();
        navigate("/Login");
      }
  };
  
  const openTodoModal = () => {
      click ? handleClick() : null;
      if(isLogin){
        getTodos()
        .then( res => {
          console.log('todo Response', res);
          const newTodos = res.data.todos.map(todo => {
            return {
              todoId: todo.id,
              content: todo.content,
              subjectId: todo.subjectId,
              isDone: todo.isDone
            }
          });
          console.log(newTodos);
          setTodoList(newTodos);
        })
        .catch( error => {
          console.log(error)
        })
        setShow(true);
      }else{
        loginComment();
        navigate("/Login");
      }
  };


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
    // navigate("/");
    window.location.replace("/");
  }

  const navigations = (  
    <>
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
    <Modal 
      bodyStyle={{ overflowY: 'auto',  height: '50vh', maxHeight: "90vh"}}    
      title={"오늘의 할일"} 
      visible={show} 
      onCancel={handleCancel} 
      onOk={handleOk}
      centered
      footer={null}> 
        <TodoListContainer todoList={todoList} setTodoList={setTodoList} subjects={subjects} colorsIdtoCode={colorsIdtoCode}/>
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