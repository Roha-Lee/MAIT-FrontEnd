import io from 'socket.io-client';
const sockets = io('https://mait.shop', {'sync disconnect on unload': true});
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
export default sockets;
