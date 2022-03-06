import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'animate.css'

const Video = styled.video`
{
  border-radius: 20px;
  ${props => props.isHover===true? 'filter: brightness(50%);': ''} 
  transition: .5s;
}`;

const CamstudyPeerVideo = ({consumer}) => {
  const ref = useRef();

  useEffect(() => {
    console.log('we want draw', consumer);
    ref.current.srcObject = new MediaStream([consumer.track]);
    console.log("DONE")
  }, [consumer]);
  
  return (
    <>
      <Video
        autoPlay
        playsInline
        ref={ref} 
        />
      </>
  );
};
// TODO: 버튼들 기능 구현 
export default CamstudyPeerVideo;