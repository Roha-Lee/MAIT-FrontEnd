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
            This
          </OptionsButton>
          <OptionsButton>
            is
          </OptionsButton>
          <OptionsButton>
            peer
          </OptionsButton>
          <OptionsButton>
            🙆‍♂️
          </OptionsButton>

        </VideoOptions>
        
    </VideoCard>
    
  );
};

export default CamstudyPeerVideo;