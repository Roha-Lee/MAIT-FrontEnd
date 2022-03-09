import React, { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Navigation from './NavigationNew'
import { notification, Modal } from 'antd';
import { MainContainer, Form, Input, RoomButton, JoinButton, SubmitButton } from './CamstudyLobby.styled'

const CamstudyLobby = (props) => {
const navigate = useNavigate();
const [isModalVisible, setIsModalVisible] = useState(false);
const [roomCode, setRoomCode] = useState('');

  function createRoom() {
  axios.get(`${process.env.REACT_APP_SERVER_URL}/cam`, {headers :{
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
  axios.get(`${process.env.REACT_APP_SERVER_URL}/cam/${roomCode}`, {headers :{
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
    <RoomButton onClick={createRoom}> 방 생성하기 </RoomButton>
    <JoinButton onClick={showModal}> 방 참여하기 </JoinButton>
  </MainContainer>
  <Modal title={"전달받은 초대 코드를 입력해주세요"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
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

export default CamstudyLobby;
