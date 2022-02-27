
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {SwitchList, HeadNavigate, NavigationBlank, NavigationContents, StyledDiv, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome} from './RoomNavigation.styled'
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import socket from '../../socket'

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