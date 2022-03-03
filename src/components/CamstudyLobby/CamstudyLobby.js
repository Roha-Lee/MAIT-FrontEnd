import React, { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { notification, Modal } from 'antd';
import axios from 'axios'
import Navigation from './NavigationNew'

const CamstudyLobby = (props) => {
const navigate = useNavigate();
const [isModalVisible, setIsModalVisible] = useState(false);
const [roomCode, setRoomCode] = useState('');

  function createRoom() {
  axios.get("https://mait.shop/cam", {headers :{
    Authorization: `${window.sessionStorage.getItem('accessToken')}`,
  }})
  .then(res => {
    if(res.data.message === "SUCCESS"){
      notification.open({
      message: "방 입장",
      description: `새로운 방에 입장합니다.`,
      });
      window.sessionStorage.setItem("currentUser", res.data.userName);
      window.sessionStorage.setItem("currentUserId", res.data.userId);
      navigate(`/camstudyRoom/?roomId=${res.data.roomid}`)
    }
  })
  .catch(err => {
    console.log(err);
  })
  }

  function joinRoom() {
  axios.get(`https://mait.shop/cam/${roomCode}`, {headers :{
    Authorization: `${window.sessionStorage.getItem('accessToken')}`,
    }})
  .then(res => {
    if(res.data.message ==="SUCCESS"){
      notification.open({
        message: "방 입장",
        description: `기존 방에 참여합니다.`,
      });
      window.sessionStorage.setItem("currentUser", res.data.userName);
      window.sessionStorage.setItem("currentUserId", res.data.userId);
      navigate(`/camstudyRoom/?roomId=${roomCode}`);
    }
  })
  
  }
 
  const showModal = () => {
  setIsModalVisible(true);
  };

  const handleOk = (e) => {
  setIsModalVisible(false);
  };

  const handleCancel = () => {
  setIsModalVisible(false);
  };
  
  return (
  <>
  <Navigation />
  <MainContainer>
    <JoinButton onClick={createRoom}> 방 생성하기 </JoinButton>
    <JoinButton onClick={showModal}> 방 참여하기 </JoinButton>
  </MainContainer>
  <Modal title={"방 코드를 입력해주세요"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
    <Form onSubmit={(e) => {e.preventDefault()}}>
    <label>
      <span>방 코드</span>
      <Input required type="text" value={roomCode} onChange={(event) => setRoomCode(event.target.value)}/>
      <SubmitButton onClick={joinRoom}>입장</SubmitButton>
    </label>
    </Form>
  </Modal>
  </>
  );
};

const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
`
const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #606060;
  background-color: #fff;
  padding: 8px 15px;
  margin: 0 20px;  
  width: 300px;
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10vw;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.button`
  width: 70px;
  height: 42px;  
  outline: none;
  
  border: none;
  border-radius: 5px;
  color: #d8e9ef;
  background-color: #606060;
  font-size: 1em;
  :hover {
  background-color: #4c4c4c;
  cursor: pointer;
  }

`
const JoinButton = styled.button`
  width: 200px;
  height: 200px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #606060;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-color: #4c4c4c;
    cursor: pointer;
  }
`;

export default CamstudyLobby;
