import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'animate.css'
import { notification } from 'antd';
import { AudioOutlined, AudioMutedOutlined, MessageOutlined } from '@ant-design/icons';

const ButtonStyle = {
  fontSize: '20px',
  color: '#6F8D7A',
}
const VideoCard = styled.div`
  {
    position: relative;
    width: 640px; 
    height: 480px; 
  }
`;

const Video = styled.video`
  {
    border-radius: 20px;
    width: 640px;
    height: 480px;
    ${props => props.isHover===true? 'filter: brightness(50%);': ''} 
    transition: .5s;
  }`;

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

let myStream;
const MyVideo = () => {
  const [isHover, setIsHover] = useState(false);
  const [audioMute, setAudioMute] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const ref = useRef();
  useEffect(() => {
    getMedia();
    
  }, []);

  const changeFullScreen = () => {

  }

  const handleMute = () => {
    setAudioMute(!audioMute);
    const audioTracks = myStream.getAudioTracks();
    audioTracks.forEach(track => {
      track.enabled = !track.enabled;
    });
    notification.open({
      message: "오디오 상태 변경",
      description: `ROHA: GRU!`,
      icon: <AudioOutlined style={{ color: "#6F8D7A" }} />,
    });
  }
  const getMedia = async() => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
      audio: true, 
      video: true,
    });
    ref.current.srcObject = myStream;
    } catch(error) {
      console.log(error)
    }
  }
  
  return (
    <VideoCard>
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
          <OptionsButton>
            {audioMute === false ? 
            <AudioOutlined onClick={handleMute} style={ButtonStyle}/>: 
            <AudioMutedOutlined onClick={handleMute} style={ButtonStyle}/>}
          </OptionsButton>
          <OptionsButton>
            {audioMute === false ? 
            <img onClick={handleMute} src='./img/video.svg'/>: 
            <img onClick={handleMute} src='./img/video-off.svg'/>}
          </OptionsButton>
          <OptionsButton>
            <MessageOutlined style={ButtonStyle}/>
          </OptionsButton>
          <OptionsButton>
            {audioMute === false ? 
            <AudioOutlined onClick={handleMute} style={ButtonStyle}/>: 
            <AudioMutedOutlined onClick={handleMute} style={ButtonStyle}/>}
          </OptionsButton>
          <OptionsButton>
            {audioMute === false ? 
            <AudioOutlined onClick={handleMute} style={ButtonStyle}/>: 
            <AudioMutedOutlined onClick={handleMute} style={ButtonStyle}/>} 
          </OptionsButton>
        </VideoOptions>
        
    </VideoCard>
    
  );
};

export default MyVideo;