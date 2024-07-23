import { createContext, useEffect, useState } from 'react';
import socketClient from 'socket.io-client';

const socketContext = createContext();

const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketConnection = socketClient(import.meta.env.VITE_API_URL);
    setSocket(socketConnection);
    return () => socket.disconnect();
  }, []);

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
};

export { socketContext, SocketProvider };
