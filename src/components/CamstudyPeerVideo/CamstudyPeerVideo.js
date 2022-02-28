import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'animate.css'
import { notification } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import videoOnSVG from '../CamstudyRoom/assets/video.svg';
import videoOffSVG from '../CamstudyRoom/assets/video-off.svg';
import socket from '../../socket';

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

const CamstudyPeerVideo = ({peer, currentUser, changeFullScreen}) => {
  const [isHover, setIsHover] = useState(false);
  const [audioState, setAudioState] = useState(true);
  const [videoState, setVideoState] = useState(true);
  
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  
  const sirenFire = (e) => {
    socket.emit("siren", {sender:currentUser, receiver:peer.userName});
  };
  
  const toggleCamera = (e) => {
    setVideoState(!videoState);
    ref.current.srcObject.getVideoTracks()
    .forEach(track => {
      track.enabled = !videoState;
    })
  };

  const toggleAudio = (e) => {
    setAudioState(!audioState);
    ref.current.srcObject.getAudioTracks()
    .forEach(track => {
      track.enabled = !audioState;
    })
  };
  return (
    <>
      <Video
        autoPlay
        playsInline
        onClick={changeFullScreen}
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
          <OptionsButton onClick={toggleCamera}>
            <img src={ videoState ? videoOnSVG : videoOffSVG } width="20" height="20"></img>
          </OptionsButton>
          <OptionsButton onClick={toggleAudio}>
            <i
            className={`fa fa-microphone${ audioState ? "" : "-slash"}`}
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