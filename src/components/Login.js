import React, { useState } from "react"
import axios from "axios"
import { LoginContainer, LoginInput, LoginButton, SocialLoginButton, SignUpGuide, StyledLink, LoginIcon, LoginForm, LoginTitle, LoginDiv} from './Login.styled'
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation/NavigationNew'
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
    const [showPassword, setShowPassword] = useState(false);
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    let navigate = useNavigate();
    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = (e) => {
        e.preventDefault();
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

    const onClickSocialLoginKaKao = (e) => {
        e.preventDefault();
        console.log("KAKAO!");
    }


    return (
        <>
            <Navigation /> 
            <LoginForm autoComplete="off" onSubmit={onClickLogin}>
                <LoginTitle>My AI Timer</LoginTitle>
                <LoginDiv>
                    <LoginIcon className="fa fa-user"></LoginIcon>
                    <label htmlFor='input_id'/>
                    <LoginInput type='text' name='input_id' value={inputId} onChange={handleInputId}  placeholder='아이디'/>
                </LoginDiv>
                <LoginDiv>
                <LoginIcon className="fa fa-lock"></LoginIcon>
                    <label htmlFor='input_pw'/>
                    <LoginInput type={showPassword? 'text' : 'password'} name='input_pw' value={inputPw} onChange={handleInputPw}  placeholder='비밀번호'/>
                    <LoginIcon className={showPassword? "fa fa-eye": "fa fa-eye-slash"} onClick={togglePassword} style={{cursor: "pointer"}}></LoginIcon>
                </LoginDiv>
                <LoginButton onClick={onClickLogin}>로그인</LoginButton>
                <SocialLoginButton type='button' onClick={onClickSocialLoginKaKao}>
                    <img src='./img/kakaotalk.svg' alt="카카오톡아이콘" width="30" height="30"></img>
                </SocialLoginButton>
                <SignUpGuide>아직 M.AI.T의 회원이 아니신가요?<StyledLink to="/signup">회원가입</StyledLink></SignUpGuide>
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