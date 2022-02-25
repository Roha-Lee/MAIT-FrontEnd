import io from 'socket.io-client';
const sockets = io('https://mait.shop', { autoConnect: true, forceNew: true });
export default sockets;
