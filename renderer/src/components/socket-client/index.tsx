"use client";

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import React, { useContext } from 'react';
import { AuthContext } from '@/hooks/auth';

export default function SocketClient() {

    const { user, loading, signin, signout, token  } = useContext<any>(AuthContext)
    console.log("User data", user)
    useEffect(() => {
        if (!user) {
            return
        }
        const socket = io('http://localhost:4000', {
          path: '/ws', // Optional: specify the WebSocket path if customized
          query: {
            userId: user?.id
          }
        });
    
        // const socket = io('http://localhost:4000');
    
        socket.on('connect', () => {
          console.log('Connected to WebSocket server');
    
          // Send a message to the server
          socket.emit('message', 'Hello from React!');
    
          // Listen for messages from the server
          socket.on('message', (data) => {
            console.log('Message from server:', data);
          });
        });
    
        // Cleanup on component unmount
        return () => {
          socket.disconnect();
        };
      }, []);


    return null;
}
