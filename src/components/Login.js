import React, { useState } from "react"
import axios from "axios"
import { LoginContainer, LoginInput, LoginButton, LoginImage } from './Login.styled'
import { useNavigate } from "react-router-dom";

const serverAddress = 'http://192.249.29.198:3001';

function Login() {
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
        console.log('click login');
        axios.post(
            `${serverAddress}/signin`, 
            {
                username: inputId,
                password: inputPw,
            },
            { withCredentials: true },
        ).then(response => {
            if(response.data.message === 'success'){
                window.localStorage.setItem('accessToken', response.data.accessToken)
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
        <LoginContainer>
            <div display="flex"><div>EMIT</div></div>
            <div>
                <label htmlFor='input_id'/>
                <LoginInput type='text' name='input_id' value={inputId} onChange={handleInputId}  placeholder='ID'/>
            </div>
            <div>
                <label htmlFor='input_pw'/>
                <LoginInput type='password' name='input_pw' value={inputPw} onChange={handleInputPw}  placeholder='Password'/>
            </div>
            <div>
                <LoginButton type='button' onClick={onClickLogin}>Sign Up</LoginButton>
            </div>
            <LoginImage>
            <img src="./btn_google_signin_dark_focus_web@2x.png" alt="logo" width="250px"/>
            </LoginImage>
            <LoginImage>
            <img src="./kakao_login_medium_narrow.png" alt="kakao" width="250"/>
            </LoginImage>
        </LoginContainer>
        </>
    )
}
 
export default Login;