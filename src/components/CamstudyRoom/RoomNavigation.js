
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {SwitchList, HeadNavigate, NavigationBlank, NavigationContents, StyledDiv, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome, ShareButton} from './RoomNavigation.styled'
import { notification, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import socket from '../../socket'
const {Kakao} = window;

function Navigation ({roomId, currentUser, videoDevices, clickCameraDevice, clickChat}) {
    
    const [showVideoList, setShowVideoList] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const exitRoom = () => {
        socket.emit('leave-room', { roomId, leaver: currentUser });
        window.close();
    }

    const handleCopyCode = () => {
        notification.open({
            message: "초대하기",
            description: `복사된 코드를 친구에게 보내주세요.`,
            icon: <CheckOutlined style={{ color: "#078f40" }} />,
        });
        setModalShow(false);
    }

    
    const toggleVideoList = () => {
        setShowVideoList(!showVideoList);
        console.log(videoDevices);
    }

    const handleKakaoShare = (e) => {
        e.preventDefault();
        Kakao.Link.sendDefault({
            objectType : "text",
            text : `아래의 코드를 복사해 방 초대하기에 입력해 주세요.\n${roomId}`,
            link : {
                webUrl : "https://maitapp.click"
            }
        });
        setModalShow(false);
    };

    const handleOk = () => {
        setModalShow(false);
    };

    const handleCancel = () => {
        setModalShow(false);
    };
    
    const openInviteModal = () => {
        setModalShow(true);
    };
    
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
            <StyledDiv onClick={openInviteModal}>초대</StyledDiv>
            <StyledDiv onClick={clickChat}>채팅</StyledDiv>
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
            <Modal 
                title="초대 코드 공유하기" 
                visible={modalShow} 
                footer={null} 
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <CopyToClipboard text={roomId}><ShareButton onClick={handleCopyCode}>초대 코드 복사</ShareButton></CopyToClipboard>
                <ShareButton onClick={handleKakaoShare}>카카오톡 공유</ShareButton>
            </Modal>
            
        </HeadNavigate>
    );

}
export default Navigation;