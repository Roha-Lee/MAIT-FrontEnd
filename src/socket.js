import io from 'socket.io-client';
const sockets = io(`${process.env.REACT_APP_SERVER_URL}`, {'sync disconnect on unload': true});
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
export default sockets;
