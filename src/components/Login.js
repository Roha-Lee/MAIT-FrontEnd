import React, { useState } from "react"
import axios from "axios"
import { LoginContainer, LoginInput, LoginButton, LoginImage, LoginForm } from './Login.styled'
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation/Navigation'
import { changeLogin } from "../store";
import { connect } from "react-redux";
// axios.defaults.headers.common['Authorization'] = `${window.localStorage.getItem('accessToken')}`

// import Form from "react-bootstrap/Form"; 
// import Button from "react-bootstrap/Button";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';

const serverAddress = 'http://192.249.29.198:3001';
const serverUrl = "https://mait.shop";

function Login({isLogin , setIsLogin}) {
 
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    let navigate = useNavigate();
    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        
        // setIsLogin(!isLogin); //TO Check
        axios.post(
            `${serverUrl}/auth/signin`, 
            {
                username: inputId,
                password: inputPw,
            },
            {
                withCredentials: true 
            }
            ,
        ).then(response => {
            if(response.data.message === 'success'){
                window.sessionStorage.setItem('accessToken', response.data.accessToken)
                setIsLogin(!isLogin);
                // useNavigate()
                navigate("/");
            }
            else {
                alert("로그인에 실패하였습니다. ")
            }
        })
    }



    return (
        <>
            <Navigation />
            <LoginForm>
                <h1>M.AI.T 로그인</h1>
                <div>
                    <label htmlFor='input_id'/>
                    <LoginInput type='text' name='input_id' value={inputId} onChange={handleInputId}  placeholder='ID'/>
                </div>
                <div>
                    <label htmlFor='input_pw'/>
                    <LoginInput type='password' name='input_pw' value={inputPw} onChange={handleInputPw}  placeholder='Password'/>
                </div>
                <div>
                    <LoginButton type='button' onClick={onClickLogin}>로그인</LoginButton>
                </div>
                <LoginImage>
                    <img src="./kakao_login_medium_narrow.png" alt="kakao" width="270" />
                </LoginImage>
            </LoginForm>
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
        setIsLogin : isLogin => dispatch(changeLogin(isLogin))
    };
}


export default connect(mapStateToProps,mapDispatchToProps) (Login);