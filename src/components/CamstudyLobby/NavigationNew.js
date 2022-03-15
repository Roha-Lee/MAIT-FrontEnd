
import React, { useState,} from 'react';
import { NavBar, MainContainer, NavContainer,NavLogo, NavSpan, NavMenu, NavIcon, NavLink ,NavItem } from './NavigationNew.styled'
import {getTodos} from "../../utils/utils"
import { Modal } from 'antd';
import socket from '../../socket'
import TodoListContainer from '../TodoListContainer/TodoListContainer';

const colorsIdtoCode = {};

function Navigation({roomId, currentUser,}) {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const exitRoom = () => {
    socket.emit('leave-room', { roomId, leaver: currentUser });
    window.close();
  }

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

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
  
  function goToHelp() {
    window.open(`${process.env.REACT_APP_HELP_PAGE}`);
  }
  
  const navigations = (  
    <>
    <NavBar onClick={e => e.stopPropagation()}>
    <NavContainer>  
      <NavLogo><NavLink exact to="/camstudyLobby" onClick={goToHelp}>M.AI.T</NavLink></NavLogo>
    <NavMenu className={click ? "active" : ""}>
      <NavItem>
      <NavSpan onClick={openTodoModal}>
        할 일
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
      bodyStyle={{ overflowY: 'auto', maxHeight: "50vh", overflowX: 'hidden'}}    
      title={"오늘의 할 일"} 
      visible={show} 
      onCancel={handleCancel} 
      onOk={handleOk}
      centered
      footer={null}
    > 
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
  

export default Navigation;