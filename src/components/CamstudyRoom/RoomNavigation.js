
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {HeadNavigate, NavigationBlank, NavigationContents, StyledDiv, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome} from './RoomNavigation.styled'
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import socket from '../../socket'
import styled from 'styled-components'

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top:65px;
  left: -105px;
  width: 350px;
  z-index: 1;
  border-radius: 0 0 10px 10px;
  background-color: rgba(96, 96, 96, 0.8);
  padding: 5px 10px 0;
  color: white;
  text-align: center;
  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;
    cursor: pointer;
    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
}
`;

function Navigation ({roomId, currentUser, videoDevices, clickCameraDevice}) {
    const [showVideoList, setShowVideoList] = useState(false);
    const exitRoom = () => {
        socket.emit('leave-room', { roomId, leaver: currentUser });
        window.close();
    }

    const copyLinkSuccess = () => {
        notification.open({
            message: "초대하기",
            description: `복사된 코드를 친구에게 보내주세요.`,
            icon: <CheckOutlined style={{ color: "#078f40" }} />,
          });
    }

    
    const toggleVideoList = () => {
        setShowVideoList(!showVideoList);
        console.log(videoDevices);
    }
    return (
        <HeadNavigate>
            <NavigationBlank/>
            <NavigationContents>
                <div>
                    <StyledLinkHome to="/camstudyLobby" onClick={exitRoom}>
                        <strong>M.AI.T</strong>
                    </StyledLinkHome>
                </div>
            </NavigationContents>
            <CopyToClipboard text={roomId}><StyledDiv onClick={copyLinkSuccess}>초대하기</StyledDiv></CopyToClipboard>
            <StyledDiv onClick={toggleVideoList} style={{position: "relative"}}>카메라 변경
            {showVideoList?<SwitchList>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                return <div key={device.deviceId} onClick={clickCameraDevice} data-value={device.deviceId} >{device.label}</div>;
              })}
              <div>카메라 목록</div>
            </SwitchList>: null}
            </StyledDiv>
            
            
            <StyledDiv onClick={exitRoom}>나가기</StyledDiv>
            <NavigationBlank/>
        </HeadNavigate>
    );

}
export default Navigation;