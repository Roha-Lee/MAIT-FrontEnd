import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'animate.css'
import { notification } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import videoOnSVG from '../CamstudyRoom/assets/video.svg';
import videoOffSVG from '../CamstudyRoom/assets/video-off.svg';
import socket from '../../socket';

const ButtonStyle = {
  fontSize: '20px',
  color: '#6F8D7A',
}

const VideoCard = styled.div`
  {
    position: relative;
  }
`;

const Video = styled.video`
  {
    border-radius: 20px;
    ${props => props.isHover===true? 'filter: brightness(50%);': ''} 
    transition: .5s;
  }`;

const VideoOptions = styled.div`
  {
    position: absolute;
    ${props => props.isHover===true?'display: flex;': 'display: none;'}
    justify-content: space-evenly;
    align-items: center;
    width: 140px;
    height: 40px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.8);
    bottom: 10%;
    left: calc((100% - 140px) / 2);
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

const CamstudyPeerVideo = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [audioMute, setAudioMute] = useState(true);
  const [videoOff, setVideoOff] = useState(false);
  
  const ref = useRef();
  const peer = props.peer;

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);
  
  const sirenFire = (e) => {
    console.log(props.currentUser, peer.userName);
    socket.emit("siren", {sender:props.currentUser, receiver:peer.userName});
  };
  
  return (
    <>
      <Video
        autoPlay
        playsInline
        onClick={props.changeFullScreen}
        isHover={isHover}
        onMouseEnter={() => {
          setIsHover(true)
        }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
        ref={ref} 
        />
        <VideoOptions isHover={isHover} onMouseEnter={() => {
          setIsHover(true)
        }}>
          <OptionsButton>
            <img src={ true ? videoOnSVG : videoOffSVG } width="20" height="20"></img>
          </OptionsButton>
          <OptionsButton>
            <i
            className={`fa fa-microphone${true ? "" : "-slash"}`}
            style={{ transform: "scaleX(1.2) scaleY(1.2)" }}>
            </i>
          </OptionsButton>
          <OptionsButton onClick={sirenFire}>
            <BellOutlined style={{ fontSize: "20px" }}/>
          </OptionsButton>

        </VideoOptions>
      </>
    
  );
};
// TODO: 버튼들 기능 구현 
export default CamstudyPeerVideo;