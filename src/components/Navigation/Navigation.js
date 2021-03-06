
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {HeadNavigate, NavigationBlank, NavigationContents, Logo, Selected, StyledA, LoginContainer, StyledLink, StyledLinkHome} from './Navigation.styled'
import { useNavigate } from 'react-router';
import { changeLogin, changeCurrentStudyTimeId } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime} from "../../utils/utils"

import { Modal, Button, FormControl, Form} from 'react-bootstrap'
import { TodoInputContainer } from "../TodoInput/TodoInput.styled";
import TodoListContainer from "../TodoListContainer/TodoListContainer";
import TodoInput from '../TodoInput/TodoInput'

function Navigation ({isLogin , setIsLogin,currentStudyTimeId , setCurrentStudyTimeId, timerOn, todoList, subjects}) {
    const [show, setShow] = useState(false);
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

            if(signOutResponse.data.message === 'SUCCESS'){
                window.sessionStorage.removeItem("accessToken");
                setIsLogin(!isLogin);
                window.location.replace("/");
            }else{
                alert("서버오류");
            }

        }else{
            navigate("/Login");
        }
    }

    function handleSignUp(){
        if(isLogin === true){
            alert("로그아웃을 해주세요.");
        }else{
            navigate("/Signup");
        }
    }

    function handleStatistics(){
        if(isLogin === true){
            if(timerOn){
                patchStudyTime(currentStudyTimeId,timeStamp()).then(
                    setCurrentStudyTimeId(null)
                )
            }
            navigate("/Statistics");
        }else{
            alert("로그인을 해주세요.");
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <HeadNavigate>
            <NavigationBlank/>
            <NavigationContents>
                <div><StyledLinkHome to="/"><strong>M.AI.T</strong></StyledLinkHome></div>
                <LoginContainer>
                    <div><StyledLink onClick={handleSignUp}>회원가입</StyledLink></div>
                    <div><StyledLink onClick={handleSignIn}>{isLogin === true ? "로그아웃" : "로그인"}</StyledLink></div>
                    <div><StyledLink onClick={handleStatistics}>통계</StyledLink></div>
                    <div><StyledA onClick = {() => {window.open("/camstudyLobby")}}>캠스터디</StyledA></div>
                    <div onClick={handleShow}>할 일</div>
                </LoginContainer>
            </NavigationContents>
            <NavigationBlank/>
        </HeadNavigate>
        <Modal show={show} onHide={handleClose}>
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
