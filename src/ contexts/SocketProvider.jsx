import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const socketContext = createContext();

export const SocketProvider = ({ children }) => {
  // const socketConnection = io(import.meta.env.VITE_API_URL);
  // socketConnection.connect();
  const [socketss, setSocket] = useState(false);

  // useEffect(() => {

  //   async function socketConnect() {
  //     setSocket(socketConnection);
  //   }
  //   socketConnect()
  //   // return () => socketConnection.disconnect();
  // }, []);

  return (
    <socketContext.Provider value={{ socketss }}>
      {children}
    </socketContext.Provider>
  );
};

