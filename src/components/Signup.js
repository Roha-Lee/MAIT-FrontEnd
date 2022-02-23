import React, {useState} from 'react'
import axios from "axios"
import { SignupContainer, SignupInput, SignupButton } from './Signup.styled';


function Signup() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const serverUrl = "https://mait.shop"

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
        axios.post(`${serverUrl}/auth/signup`, {
            nickname : nickname,
            username : name,
            email : email,
            password : password,
        }).then(response => console.log(response.data))
    }
  }

  return (
    <>
      <div className="loginregister"> 
          <form onSubmit={onSubmit}>
              <SignupContainer>
                <div><SignupInput name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler}/></div>
                <div><SignupInput name="nickname" type="text" placeholder="닉네임" value={nickname} onChange={onNicknameHandler}/></div>
                <div><SignupInput name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler}/></div>
                <div><SignupInput name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler}/></div>
                <div><SignupInput name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler}/></div>
                <div>
                  <SignupButton type="submit" onClick={onSubmit}>Sign Up</SignupButton>
                  <SignupButton type="submit" onClick={onSubmit}>Sign In</SignupButton>
                </div>
              </SignupContainer>
          </form>
      </div>
    </>
  );
}
export default Signup;