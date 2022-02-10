import React, {useState} from 'react'
import axios from "axios"


function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNicknameHandler = (event) => {
      setNickname(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value)
  }
  console.log(name, nickname, email, password, confirmPassword)
 
  const onSubmit = (event) => {
    console.log("submit on")
    event.preventDefault()
    if(password !== confirmPassword) {
      console.log(password,confirmPassword);
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    }
    else {
        console.log('click signup');
        axios.post("http://192.249.29.38:3001/signup", {
            nickname : nickname,
            name : name,
            email : email,
            pw : password,
        }).then(response => console.log(response.data))
    }
  }

  return (
    <>
        <div className="container">
            <div className="item">EMIT</div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item">SIGN UP</div>
            <div className="item">SIGN IN</div>
        </div>
        <div className="loginregister"> 
            <form onSubmit={onSubmit}>
                <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} className="loginregister__input"/></div>
                <div><input name="nickname" type="text" placeholder="닉네임" value={nickname} onChange={onNicknameHandler} className="loginregister__input"/></div>
                <div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} className="loginregister__input"/></div>
                <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input"/></div>
                <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler} className="loginregister__input"/></div>
                <div><button type="submit" onClick={onSubmit} className="loginregister__button">계정 생성하기</button></div>
            </form>
        </div>
    </>
  );
}
export default RegisterPage;