
import React, { useState, useEffect } from 'react';
import { NavBar, MainContainer, NavContainer,NavLogo, NavSpan, NavMenu, NavIcon, NavLink ,NavItem, ShareButton } from './NavigationNew.styled'
import {getTodos, getAllUserData} from "../../utils/utils"
import CopyToClipboard from 'react-copy-to-clipboard';
import { notification, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import socket from '../../socket'
import TodoListContainer from '../TodoListContainer/TodoListContainer';

const colorsIdtoCode = {};

function Navigation({roomId, currentUser, currentUserId, videoDevices, clickCameraDevice, clickChat}) {
  const [showVideoList, setShowVideoList] = useState(false);
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [inviteModalShow, setInviteModalShow] = useState(false);

  const exitRoom = () => {
    // socket.emit('leave-room', { roomId, leaver: currentUser, leaverId:socket.id });
    // console.log("leave-room parameter check", roomId, currentUser, socket.id);
    window.close();
  }

  const handleKakaoShare = (e) => {
    e.preventDefault();
    Kakao.Link.sendDefault({
        objectType : "feed",
        content : {
          title : `${ currentUser.length > 7 ? currentUser.substring(0, 7) + '⋯' : currentUser }님의 캠스터디 초대\n아래 코드를 복사해 주세요!`,
          description : `${roomId}`,
          imageUrl : "http://drive.google.com/uc?export=view&id=1ZbEPqCHY-VogXcEwtAYzTddJrSfXvCRE",
          link : {
              webUrl : "https://maitapp.click"
          }
        },
        buttons :[
          {
            title: 'M.AI.T로 이동하기',
            link: {
              mobileWebUrl: "https://maitapp.click",
              webUrl: "https://maitapp.click",
            },
          }
        ],
    });
    setInviteModalShow(false);
  };

  const handleInviteModalOk = () => {
      setInviteModalShow(false);
  };

  const handleInviteModalCancel = () => {
      setInviteModalShow(false);
  };

  const openInviteModal = () => {
      click ? handleClick() : null;
      setInviteModalShow(true);
  };

  const toggleVideoList = () => {
    setShowVideoList(!showVideoList);
    console.log(videoDevices);
  }
    
  const handleCopyCode = () => {
    notification.open({
        message: "초대하기",
        description: `복사된 코드를 친구에게 보내주세요.`,
        icon: <CheckOutlined style={{ color: "#078f40" }} />,
    });
    setInviteModalShow(false);
  }

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const openChatRoom = (e) => {
    click ? handleClick() : null;
    clickChat(e);
  }

  const openTodoModal = () => {
    console.log(subjects);
    click ? handleClick() : null;
    getTodos()
    .then( res => {
      const newSubjects = res.data.subjects.map(subject => {
        return {
          subjectId: subject.id, 
          name: subject.name,
          colorId: subject.colorId, 
        }
      });
      
      res.data.colors.forEach(color => {
        colorsIdtoCode[color.id] = color.code;
      });

      setSubjects(newSubjects); 

      console.log("openTodoModal", res);
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

  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = () => {
    setShow(false);
  };
  
  const navigations = (  
    <>
    <NavBar onClick={e => e.stopPropagation()}>
    <NavContainer>  
      <NavLogo><NavLink exact to="/camstudyLobby" onClick={exitRoom}>M.AI.T</NavLink></NavLogo>
    <NavMenu className={click ? "active" : ""}>
      <NavItem>
      <NavSpan onClick={openInviteModal}>초대</NavSpan>
      </NavItem>
      <NavItem>
      <NavSpan onClick={openTodoModal}>할일</NavSpan>
      </NavItem>
      <NavItem>
      <NavSpan onClick={openChatRoom}>채팅</NavSpan>
      </NavItem>
      <NavItem>
      <NavSpan onClick={exitRoom}>나가기</NavSpan>
      </NavItem>
    </NavMenu>
    <NavIcon onClick={handleClick}>
      <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
    </NavIcon>
    </NavContainer>
    </NavBar>
    <Modal 
      bodyStyle={{ overflowY: 'auto', maxHeight: "50vh", overflowX: 'hidden'}}    
      title={"오늘의 할일"} 
      visible={show} 
      onCancel={handleCancel} 
      onOk={handleOk}
      centered
      footer={null}
    > 
      <TodoListContainer todoList={todoList} setTodoList={setTodoList} subjects={subjects} colorsIdtoCode={colorsIdtoCode}/>
    </Modal>
    <Modal 
        bodyStyle={{ display: 'flex', justifyContent: 'space-evenly'}}
        title="초대 코드 공유하기" 
        visible={inviteModalShow} 
        footer={null} 
        onOk={handleInviteModalOk}
        onCancel={handleInviteModalCancel}
        centerd
      >
        <CopyToClipboard text={roomId}><ShareButton onClick={handleCopyCode}>초대 코드 복사</ShareButton></CopyToClipboard>
        <ShareButton onClick={handleKakaoShare}>카카오톡 공유</ShareButton>
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
  

  


// function mapStateToProps(state){
//   return{
//     isLogin : state.isLogin,
//     currentStudyTimeId : state.currentStudyTimeId,
//     timerOn : state.timerOn,
//   };
// }

// function mapDispatchToProps(dispatch){
//   return{
//     setIsLogin : isLogin => dispatch(changeLogin(isLogin)),
//     setCurrentStudyTimeId : id => dispatch(changeCurrentStudyTimeId(id))
//   };
// }


// export default connect(mapStateToProps,mapDispatchToProps) (Navigation);
export default Navigation;