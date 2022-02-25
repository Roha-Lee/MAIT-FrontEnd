import React, { useRef, useState, useEffect } from 'react';
import MyVideo from '../CamstudyMyVideo/CamstudyMyVideo'
import PeerVideo from '../CamstudyPeerVideo/CamstudyPeerVideo'
import styled from 'styled-components';
import socket from '../../socket'

const CamstudyRoom = (props) => {
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
          ></MyVideo>
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
