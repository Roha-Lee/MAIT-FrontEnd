import React, { useRef, useState, useEffect } from 'react';
import PeerVideo from '../CamstudyPeerVideo/CamstudyPeerVideo'
import styled from 'styled-components';
import socket from '../../socket'
import 'animate.css'
import SimplePeer from 'simple-peer';

const CamstudyRoom = (props) => {
  const currentUser = 'Roha'
  const myVideoRef = useRef();
  const myStreamRef = useRef();
  const peersRef = useRef([]); 
  const [isHover, setIsHover] = useState(false);
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  useEffect(async ()=> {
    window.addEventListener('popstate', goToBack);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
      audio: false, 
      video: true});
      // console.log(userVideoRef.current);
      myVideoRef.current.srcObject = stream;
      myStreamRef.current = stream;
      const roomId = window.location.href.split('/camstudyRoom/?roomId=')[1];
      socket.emit('join-room', roomId, socket.id);
      socket.on('user-join', (users) => {
        const peers = [];
        users.forEach(({ userId, info }) => {
        let { userName, video, audio } = info;

        if (userName !== socket.id) {
          const peer = createPeer(userId, socket.id, stream);
          peer.userName = userName;
          peer.peerID = userId;

          peersRef.current.push({
            peerID: userId,
            peer,
            userName,
          });
          peers.push(peer);

          setUserVideoAudio((preList) => {
            return {
              ...preList,
              [peer.userName]: { video, audio },
            };
          });
        }
      });
      setPeers(peers);
    });

    socket.on('receive-call', ({ signal, from, info }) => {
      let { userName, video, audio } = info;
      const peerIdx = findPeer(from);

      if (!peerIdx) {
        console.log("ADDPEER???")
        const peer = addPeer(signal, from, stream);

        peer.userName = userName;

        peersRef.current.push({
          peerID: from,
          peer,
          userName: userName,
        });
        setPeers((users) => {
          return [...users, peer];
        });
        setUserVideoAudio((preList) => {
          return {
            ...preList,
            [peer.userName]: { video, audio },
          };
        });
      }
    });

    socket.on('call-accepted', ({ signal, answerId }) => {
      console.log("FINDPEER???")
      const peerIdx = findPeer(answerId);
      peerIdx.peer.signal(signal);
    });

    socket.on('user-leave', ({ userId, userName }) => {
      console.log("FINDPEER???")
      const peerIdx = findPeer(userId);
      peerIdx.peer.destroy();
      setPeers((users) => {
        users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
        return [...users];
      });
      peersRef.current = peersRef.current.filter(({ peerID }) => peerID !== userId );
    });
    } catch(error) {
      console.log(error)
    }    

    socket.on('toggle-camera', ({ userId, switchTarget }) => {
      const peerIdx = findPeer(userId);

      setUserVideoAudio((preList) => {
        let video = preList[peerIdx.userName].video;
        let audio = preList[peerIdx.userName].audio;

        if (switchTarget === 'video') video = !video;
        else audio = !audio;

        return {
          ...preList,
          [peerIdx.userName]: { video, audio },
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  function addPeer(incomingSignal, callerId, stream) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('accept-call', { signal, to: callerId });
    });

    peer.on('disconnect', () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  const goToBack = (e) => {
    e.preventDefault();
    socket.emit('leave-room', { roomId, leaver: currentUser });
    window.location.href = '/';
  };

  const changeFullScreen = (e) => {
    // TODO: 화면에 전체화면 아이콘 그리기
    const elem = e.target;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } 
  }


  function createPeer(userId, caller, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });
  
    peer.on('signal', (signal) => {
      socket.emit('call-user', {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on('disconnect', () => {
      peer.destroy();
    });
  
    return peer;
  }

  function createUserVideo(peer, index, arr) {
    return (
      <VideoBox
        className={`width-peer${peers.length > 8 ? '' : peers.length}`}
        onClick={changeFullScreen}
        key={index}
      >
        {writeUserName(peer.userName)}
        <FaIcon className='fas fa-expand' />
        <PeerVideo key={index} peer={peer} number={arr.length} />
      </VideoBox>
    );
  }

  function writeUserName(userName, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return <UserName key={userName}>{userName}</UserName>;
      }
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
        <i src='./img/video.svg'></i>
      </OptionsButton>
      <OptionsButton>
        is
      </OptionsButton>
      <OptionsButton>
        me
      </OptionsButton>
      <OptionsButton>
        !
      </OptionsButton>

    </VideoOptions>
    </VideoBox>
    
    {peers &&
      peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
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
  ${props => props.isHover===true? 'filter: brightness(50%);': ''} 
  transition: .5s;
`;

const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
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
