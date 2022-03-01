import React, { useState } from "react"
import axios from "axios"
import { LoginInput, LoginButton, SocialLoginButton, SignUpGuide, StyledLink, LoginIcon, LoginForm, LoginTitle, LoginDiv} from './Login.styled'
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation/NavigationNew'
import { changeLogin } from "../store";
import { connect } from "react-redux";
import { notification } from "antd";
import { getKakaoSignin } from "../utils/utils"
import { WarningOutlined } from '@ant-design/icons';
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
            if(response.data.message === 'SUCCESS'){
                window.sessionStorage.setItem('accessToken', response.data.accessToken)
                setIsLogin(!isLogin);
                navigate("/");
            }
            else if (response.data.message === 'INVALID_USERNAME'){
                notification.open({
                    description: "존재하지 않는 사용자 입니다.",
                    icon: <WarningOutlined style={{ color: "#606060" }}/>,
                })
            }
            else if (response.data.message === "INVALID_PASSWORD") {
                notification.open({
                    description: "비밀번호가 일치하지 않습니다.",
                    icon: <WarningOutlined style={{ color: "#606060" }}/>,
                })
            }
            else {
                notification.open({
                    description: "로그인에 실패했습니다.",
                    icon: <WarningOutlined style={{ color: "#606060" }}/>,
                })
            }
        })
        // TODO catch로 
    }

    const onClickSocialLoginKaKao = (e) => {
        e.preventDefault();
        getKakaoSignin();
    }


    return (
        <>
            <Navigation /> 
            <LoginForm id="login-form" autoComplete="off" onSubmit={onClickLogin}>
                <LoginTitle>My AI Timer</LoginTitle>
                <LoginDiv>
                    <LoginIcon className="fa fa-user"></LoginIcon>
                    <label htmlFor='input_id'/>
                    <LoginInput maxLength={16} required type='text' name='input_id' value={inputId} onChange={handleInputId}  placeholder='아이디'/>
                </LoginDiv>
                <LoginDiv>
                <LoginIcon className="fa fa-lock"></LoginIcon>
                    <label htmlFor='input_pw'/>
                    <LoginInput required type={showPassword? 'text' : 'password'} name='input_pw' value={inputPw} onChange={handleInputPw}  placeholder='비밀번호'/>
                    <LoginIcon className={showPassword? "fa fa-eye": "fa fa-eye-slash"} onClick={togglePassword} style={{cursor: "pointer"}}></LoginIcon>
                </LoginDiv>
                <LoginButton type="submit" onClick={onClickLogin}>로그인</LoginButton>
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