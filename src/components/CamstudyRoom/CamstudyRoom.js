import React, { useRef, useState, useEffect } from 'react';
import PeerVideo from '../CamstudyPeerVideo/CamstudyPeerVideo'
import styled from 'styled-components';
import socket from '../../socket'
import 'animate.css'
import Peer from 'simple-peer';
import CamstudyChat from '../CamstudyChat/CamstudyChat';
import videoOn from './assets/video.svg'
import videoOff from './assets/video-off.svg'
const CamstudyRoom = (props) => {
  const currentUser = 'Roha';
  const roomId = window.location.href.split('/camstudyRoom/?roomId=')[1];
  const myVideoRef = useRef();
  const myStreamRef = useRef();
  const peersRef = useRef([]); 
  const screenTrackRef = useRef();
  const [isHover, setIsHover] = useState(false);
  const [peers, setPeers] = useState([]);
  const [screenShare, setScreenShare] = useState(false);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [displayChat, setDisplayChat] = useState(false);
  useEffect(async ()=> {
    window.addEventListener('popstate', goToBack);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
      audio: false, 
      video: true});
      // console.log(userVideoRef.current);
      myVideoRef.current.srcObject = stream;
      myStreamRef.current = stream;
      // socket.emit('join-room', roomId, socket.id);
      socket.emit('join-room', roomId, socket.id);
      socket.on('user-join', (users) => {
        const peers = [];
        console.log('this is users list', users);
        users.forEach(({ userId, info }) => {
          console.log("unpack userId", userId);
          console.log("unpack info", info);
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
      console.log("leave - FINDPEER???", userId)
      console.log("My id", socket.id);
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
    const peer = new Peer({
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
    console.log(stream)
    const peer = new Peer({
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

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === 'video'),
              screenTrack,
              myStreamRef.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === 'video'),
                  myStreamRef.current
              );
            });
            myVideoRef.current.srcObject = myStreamRef.current;
            setScreenShare(false);
          };

          myVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

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
        <InFrameUserName>Roha</InFrameUserName>
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

  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  const toggleCamera = (e) => {
    setUserVideoAudio((preList) => {
      let videoSwitch = preList['localUser'].video;
      let audioSwitch = preList['localUser'].audio;

      const userVideoTrack = myVideoRef.current.srcObject.getVideoTracks()[0];
      videoSwitch = !videoSwitch;
      userVideoTrack.enabled = videoSwitch;
    
      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit('toggle-camera-audio', { roomId, switchTarget: 'video' });
  };
  
  //TODO: 초대 링크 복사하기 기능 추가
  return (
  <RoomContainer>
    
  <VideoAndBarContainer>
    <VideoContainer>
    <VideoBox className={`width-peer${peers.length > 8 ? '' : peers.length}`}>
      {userVideoAudio['localUser'].video ? null : (<UserName>{currentUser}</UserName>)}
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
      <OptionsButton onClick={toggleCamera}>
        <img src={
          userVideoAudio['localUser'].video ? videoOn : videoOff } width="20" height="20"></img>
      </OptionsButton>
      <OptionsButton>
        is
      </OptionsButton>
      <OptionsButton onClick={clickChat}>
        me
      </OptionsButton>
      <OptionsButton>
        !
      </OptionsButton>

    </VideoOptions>
    <InFrameUserName>Roha</InFrameUserName>
    </VideoBox>
    
    {peers &&
      peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
    </VideoContainer>
  </VideoAndBarContainer>
  {/* <CamstudyChat display={displayChat ?  "" : "none"} roomId={roomId} /> */}
  {/* {displayChat ? <CamstudyChat display={displayChat} roomId={roomId}/> : null } */}
  <CamstudyChat display={displayChat} roomId={roomId}/>
  </RoomContainer>
  );
};
export default CamstudyRoom;

const RoomContainer = styled.div`
  margin: 0 auto;
  display: flex;
  width: 60%;
  max-height: 100vh;
  flex-direction: row;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
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
`;

const MyVideo = styled.video`
  border-radius: 20px;
  ${props => props.isHover===true? 'filter: brightness(50%);': ''} 
  transition: .5s;
`;

const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc( 100vh - 70px );
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

const InFrameUserName = styled.div`
position: absolute;
padding: 0 5px;
background: rgba(0, 0, 0, 0.5);
color: white;
border-radius: 10px;
top: 5%;
left: 5%;
@media screen and (max-width: 500px) {
  display: none;
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