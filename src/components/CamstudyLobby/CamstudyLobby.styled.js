import styled from 'styled-components';
import joinRoomPNG from './assets/join-line.png';
import joinRoomHoverPNG from './assets/join.png';
import openRoomPNG from './assets/open-line.png';
import openRoomHoverPNG from './assets/open.png';

export const Form = styled.form`
display: flex;
align-items: center;
justify-content: center;
`;

export const Input = styled.input`
  border-radius: 5px;
  border: 2px solid #606060;
  background-color: #fff;
  padding: 8px 15px;
  margin: 0 20px;
  width: 300px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10vw;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.button`
  width: 70px;
  height: 42px;  
  outline: none;
  
  border: none;
  border-radius: 5px;
  color: #d8e9ef;
  background-color: #606060;
  font-size: 1em;
  :hover {
  background-color: #4c4c4c;
  cursor: pointer;
  }
`;

export const RoomButton = styled.div`
  display:flex;
  width: 250px;
  height: 250px;
  opacity: 0.70;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 150px 150px;
  background-image: url(${openRoomPNG});
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  align-items: flex-end;
  justify-content: center;
  color: #101010;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-image: url(${openRoomHoverPNG});
    cursor: pointer;
  }
`;

export const JoinButton = styled.div`
  display:flex;
  width: 250px;
  height: 250px;
  opacity: 0.70;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 150px 150px;
  background-image: url(${joinRoomPNG});
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  align-items: flex-end;
  justify-content: center;
  color: #101010;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-image: url(${joinRoomHoverPNG});
    cursor: pointer;
  }
`;
