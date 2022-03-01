import React, {useState} from 'react'
import Navigation from './Navigation/NavigationNew'
import { SignupTitle, SignupIcon, SignupDiv, SignupInput, SignupButton, SignupForm } from './Signup.styled';
import { notification } from 'antd';
import { postSignup } from '../utils/utils'
import { WarningOutlined, CheckOutlined } from '@ant-design/icons';

function Signup() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }
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
  
  const onSubmit = (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      notification.open({
          description: "비밀번호와 비밀번호 확인은 같아야 합니다.",
          icon: <WarningOutlined style={{ color: "#606060" }}/>,
        }
      )
    }
    else {
      postSignup(nickname, name, email, password)
      .then(response => {
        if(response.data.message === "SUCCESS"){
          notification.open({
            description: `성공적으로 회원가입이 완료되었습니다.`,
            icon: <CheckOutlined style={{ color: "#078f40" }} />,
            });
            navigate(`/Login`)
        }
        else if(response.data.message === "EMPTY_USERNAME"){
          notification.open({
            description: "아이디를 입력해주세요",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
        })
        }
        else if(response.data.message === "ID_TOO_LONG"){
          notification.open({
            description: "16글자 이하의 아이디를 사용해주세요.",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
        })
        }
        else if(response.data.message === "PASSWORD_TOO_SHORT") {
          notification.open({
            description: "비밀번호가 너무 짧습니다. 4글자 이상의 비밀번호를 사용해주세요.",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
        })
        }
        else if(response.data.message === "EMPTY_NICKNAME") {
          notification.open({
            description: "닉네임을 입력해주세요",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
        })
        }
        else if(response.data.message === "EMAIL_INVALID") {
          notification.open({
            description: "잘못된 이메일 형식입니다.",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
          })
        }
        else if(response.data.message === "USERNAME_EXISTS") {
          notification.open({
            description: "이미 사용중인 아이디입니다.",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
          })
        }
        else if(response.data.message === "CONNECTION_ERROR") {
          notification.open({
            description: "연결 오류입니다.",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
        })
        }
        else{
          notification.open({
            description: "회원가입에 실패했습니다.",
            icon: <WarningOutlined style={{ color: "#606060" }}/>,
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <Navigation/>
      <SignupForm id="signup-form" autoComplete="off" onSubmit={onSubmit}> 
      <SignupTitle>M.AI.T 회원가입</SignupTitle>
        <SignupDiv>
          <SignupIcon className="fa fa-user"></SignupIcon>
          <SignupInput maxLength={16} required name="name" type="text" placeholder="아이디" value={name} onChange={onNameHandler}/>
        </SignupDiv>
        <SignupDiv>
          <SignupIcon className="fa fa-address-book" style={{fontSize: "1rem"}}></SignupIcon>
          <SignupInput maxLength={16} required  name="nickname" type="text" placeholder="닉네임" value={nickname} onChange={onNicknameHandler}/>
        </SignupDiv>
        <SignupDiv>
          <SignupIcon className="fa fa-envelope" style={{fontSize: "1rem"}}></SignupIcon>
          <SignupInput required name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler}/>
        </SignupDiv>
        <SignupDiv>
          <SignupIcon className="fa fa-lock"></SignupIcon>
          <SignupInput required name="password" type={showPassword? "text":"password"} placeholder="비밀번호" value={password} onChange={onPasswordHandler}/>
          <SignupIcon className={showPassword? "fa fa-eye": "fa fa-eye-slash"} onClick={togglePassword} style={{cursor: "pointer"}}></SignupIcon>
        </SignupDiv>
        <SignupDiv>
          <SignupIcon className="fa fa-lock"></SignupIcon>
          <SignupInput required name="confirmPassword" type={showPassword? "text":"password"} placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
          <SignupIcon className={showPassword? "fa fa-eye": "fa fa-eye-slash"} onClick={togglePassword} style={{cursor: "pointer"}}></SignupIcon>
        </SignupDiv>
            <SignupButton type="submit" onClick={onSubmit}>가입하기</SignupButton>

      </SignupForm>
   
    </>
  );
}
export default Signup;