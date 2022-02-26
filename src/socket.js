import io from 'socket.io-client';
const sockets = io('https://mait.shop');
// const sockets = io('http://localhost:3001', { autoConnect: true, forceNew: true });
export default sockets;
