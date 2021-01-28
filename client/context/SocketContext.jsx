import { set } from "mongoose";
import React, {createContext, useContext, useEffect, useState} from "react";
import connection from "../utils/connection";

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider= ( {id, children}) => {
 

  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = connection("http://localhost:3000", {
      query: { id}
    });
    
    setSocket(newSocket);

    return () => newSocket.create();
  }, [id]);
  
  return (
    <SocketContext.Provider value ={socket}>
      {children}
    </SocketContext.Provider>
  )
}