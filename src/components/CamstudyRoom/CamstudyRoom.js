import React, { useRef, useState, useEffect } from 'react';
import PeerVideo from '../CamstudyPeerVideo/CamstudyPeerVideo'
import styled from 'styled-components';
import socket from '../../socket'
import 'animate.css'
let myStream;
const CamstudyRoom = (props) => {
    const myVideoRef = useRef();
    const [isHover, setIsHover] = useState(false);
    useEffect(async ()=> {
    
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
            audio: false, 
            video: true}
        );
        // console.log(userVideoRef.current);
        myVideoRef.current.srcObject = stream;
        myStream = stream;
        const roomId = window.location.href.split('/camstudyRoom/?roomId=')[1];
        socket.emit('join-room', roomId, socket.id);
        socket.on('user-join', (users) => {
            const peers = []
        })
        } catch(error) {
            console.log(error)
        }      
    }, []);

    const changeFullScreen = (e) => {
        // TODO: 화면에 전체화면 아이콘 그리기
        const elem = e.target;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } 
    }
  return (
    <RoomContainer>
        TODO: 초대 링크 복사하기 기능 추가
    <VideoAndBarContainer>
      <VideoContainer>
        <VideoBox>
          <MyVideo
            mute
            autoPlay
            playInline
            ref={myVideoRef}
            onClick={changeFullScreen}
            isHover={isHover}
            onMouseEnter={() => {
                setIsHover(true)
            }}
            onMouseLeave={() => {
                setIsHover(false)
            }}
        >
        </MyVideo>
        <VideoOptions isHover={isHover} onMouseEnter={() => {
            setIsHover(true)
            }}>
            <OptionsButton>
            </OptionsButton>
            <OptionsButton>
            </OptionsButton>
            <OptionsButton>
            </OptionsButton>
            <OptionsButton>
            </OptionsButton>

        </VideoOptions>
        </VideoBox>
        <VideoBox>
        </VideoBox>
        {/* Joined User Vidoe
        {peers &&
          peers.map((peer, index, arr) => createUserVideo(peer, index, arr))} */}
      </VideoContainer>
    </VideoAndBarContainer>
    </RoomContainer>
  );
};
export default CamstudyRoom;

const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  flex-direction: row;
`;

const VideoContainer = styled.div`
  max-width: 100%;
  height: 92%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  gap: 10px;
`;
const MyVideo = styled.video`
    border-radius: 20px;
    :hover {
        filter: brightness(50%);
        transition: .5s;
    }
    
`;
const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :hover {
    > i {
      display: block;
    }
  }
`;

const VideoOptions = styled.div`
  {
    position: absolute;
    ${props => props.isHover===true?'display: flex;': 'display: none;'}
    justify-content: space-evenly;
    align-items: center;
    width: 200px;
    height: 40px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.8);
    bottom: 10%;
    left: calc((100% - 200px) / 2);
    border-radius: 20px;
    ${props => props.isHover===true?'animation: fadeInUp;': 'animation: fadeOutDown;'}
    animation-duration: .5s;  
  }
`

const OptionsButton = styled.button`
{
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: none;
}
`
const UserName = styled.div`
  position: absolute;
  font-size: calc(20px + 5vmin);
  z-index: 1;
`;

const FaIcon = styled.i`
  display: none;
  position: absolute;
  right: 15px;
  top: 15px;
`;
