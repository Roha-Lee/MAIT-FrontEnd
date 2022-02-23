import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import 'animate.css';

const ButtonContainer = styled.div`{
    display: flex; 
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}`

const InputContainer = styled.div`{
    width: 100%;
    background-color: tomato;
}`

const buttonStyle = (buttonColor) => ({
    borderRadius: "5px",
    width: "100px", 
    height: "30px", 
    backgroundColor: buttonColor,
});
function CamstudyLobby({
    isCamstudyLobbyVisible,
    setIsCamstudyLobbyVisible,
}){
  
  const handleCancel = () => {
    setIsCamstudyLobbyVisible(false);
  };
  
  return (<Modal title="친구들과 함께 공부해요." visible={isCamstudyLobbyVisible} onCancel={handleCancel} footer={null}>
            <InputContainer>
                닉 네임
                방 이름? 코드?
            </InputContainer>
            <ButtonContainer>
                <Button style={buttonStyle('#EFEFEF')}>방 생성하기</Button>
                <Button style={buttonStyle('#EFEFEF')}>방 참가하기</Button>
            </ButtonContainer>
        </Modal>);
}

export default CamstudyLobby;

