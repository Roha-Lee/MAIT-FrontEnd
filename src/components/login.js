import React, { useState } from "react"
import axios from "axios"

axios.defaults.withCredentials = false;

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

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
        axios.post("http://192.249.29.38:3001/login", {
            id: inputId,
            pw: inputPw
        }).then(response => console.log(response.data))
    }

    return (
        <div>
            <div className="container">
                <div className="item">EMIT</div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item">SIGN UP</div>
                <div className="item">SIGN IN</div>
            </div>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
            <img src="./btn_google_signin_dark_focus_web@2x.png" alt="logo" />
            <img src="./kakao_login_medium_narrow.png" alt="kakao" />
        </div>
    )
}

export default Login;
