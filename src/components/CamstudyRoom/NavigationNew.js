
import React, { useState } from 'react';
import { NavBar, MainContainer, NavContainer,NavLogo, NavSpan, NavMenu, NavIcon, NavLink ,NavItem } from './NavigationNew.styled'
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {getTodos} from "../../utils/utils"
import CopyToClipboard from 'react-copy-to-clipboard';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import socket from '../../socket'

function Navigation({roomId, currentUser, videoDevices, clickCameraDevice, clickChat}) {
  const [showVideoList, setShowVideoList] = useState(false);
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState([]);


  const exitRoom = () => {
    socket.emit('leave-room', { roomId, leaver: currentUser });
    window.close();
  }

  const copyLinkSuccess = () => {
    notification.open({
      message: "초대하기",
      description: `복사된 코드를 친구에게 보내주세요.`,
      icon: <CheckOutlined style={{ color: "#078f40" }} />,
      });
  }

  const toggleVideoList = () => {
    setShowVideoList(!showVideoList);
    console.log(videoDevices);
  }
    
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const openTodoModal = () => {
    click ? handleClick() : null;
    getTodos()
    .then( res => {
      const newTodos = res.data.todos.map(todo => {
        return {
          todoId: todo.id,
          content: todo.content,
          subjectId: todo.subjectId,
          isDone: todo.isDone
        }
      });
      setTodoList(newTodos);
    })
    .catch( error => {
      console.log(error)
    })
    setShow(true);

  }

  const navigations = (  
    <>
  <NavBar onClick={e => e.stopPropagation()}>
  <NavContainer>  
    <NavLogo><NavLink exact to="/camstudyLobby" onClick={exitRoom}>M.AI.T</NavLink></NavLogo>
  <NavMenu className={click ? "active" : ""}>
    <NavItem>
        <CopyToClipboard text={roomId}>
            <NavSpan onClick={copyLinkSuccess}>초대</NavSpan>
        </CopyToClipboard>
    </NavItem>
    <NavItem>
    <NavSpan onClick={openTodoModal}>
      할일
    </NavSpan>
    </NavItem>
    <NavItem>
    <NavSpan onClick={clickChat}>
      채팅
    </NavSpan>
    </NavItem>
    <NavItem>
    <NavSpan>
      카메라 변경
    </NavSpan>
    </NavItem>
    <NavItem>
    <NavSpan onClick={exitRoom}>
      나가기
    </NavSpan>
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
    footer={null}
  > 
    <TodoListContainer todoList={todoList} setTodoList={setTodoList}/>
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