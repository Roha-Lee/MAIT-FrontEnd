
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {HeadNavigate, NavigationBlank, NavigationContents, StyledDiv, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome} from './RoomNavigation.styled'
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import socket from '../../socket'
function Navigation ({roomId, currentUser}) {
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
            <StyledDiv>비디오 변경</StyledDiv>
            <StyledDiv onClick={exitRoom}>나가기</StyledDiv>
            <NavigationBlank/>
        </HeadNavigate>
    );

}
export default Navigation;