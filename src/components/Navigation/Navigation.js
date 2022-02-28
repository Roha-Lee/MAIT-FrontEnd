
import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {HeadNavigate, NavigationBlank, NavigationContents, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome, StyledA} from './Navigation.styled'
import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import { TodoInputContainer } from "../TodoInput/TodoInput.styled";
import TodoListContainer from "../TodoListContainer/TodoListContainer";

function Navigation () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    console.log(TodoListContainer)
    return (
        <>
        <HeadNavigate>
            <NavigationBlank/>
            <NavigationContents>
                <div><StyledLinkHome to="/"><strong>M.AI.T</strong></StyledLinkHome></div>
                <LoginContainer>
                    <div><StyledLink to="/Signup">Sign up</StyledLink></div>
                    <div><StyledLink to="/Login">Sign In</StyledLink></div>
                    <div><StyledLink to="/Statistics">Statistics</StyledLink></div>
                    <div><StyledA onClick = {() => {window.open("/camstudy")}}>Cam Study</StyledA></div>
                    <div onClick={handleShow}>할일</div>
                </LoginContainer>
            </NavigationContents>
            <NavigationBlank/>
        </HeadNavigate>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>오늘 할일</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <TodoListContainer/> */}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    );

}
export default Navigation;