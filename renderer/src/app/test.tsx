import { io } from 'socket.io-client';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      path: '/ws', // Optional: specify the WebSocket path if customized
    });

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

  return <div>React WebSocket Example</div>;
};

export default App;
