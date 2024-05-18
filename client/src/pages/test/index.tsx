import React, { useEffect } from 'react';
import Container from '../../layout/container';
import { io } from 'socket.io-client';



const TestPage = () => {
    const socket = io('http://localhost:3005');
    const [messages, setMessages] = React.useState<string[]>([]);
    const [message, setMessage] = React.useState<string>('');

    const sendMessage = (e: any) => {
        e.preventDefault();
        setMessages((prevMessages) => [...prevMessages, message]);
        
        // emit message to server
        socket.emit('send_message', message);
        setMessage('');
    };

    useEffect(() => {
        socket.on('receive_message', (message: string) => {
            console.log(messages)
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
            console.log('disconnected');
        };
    }, [socket]);



    return (
        <Container>
            <h1>Test Page</h1>
            <p>This is a test page.</p>

            <div id="chat" className="w-full min-h-96 bg-gray-200 border-2 border-red-200 radius-2">
                {messages.map((message: string, index: number) => (
                    <div key={index} className="w-full bg-gray-100 border-2 border-red-200 radius-2">
                        {message}
                    </div>
                ))}
            </div>
            <form>
                <textarea 
                id="message" 
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-12 bg-gray-100 border-2 border-red-200 radius-2"
                value={message}
                placeholder="message"></textarea>

                <button
                type="submit"
                className="w-full bg-red-200 border-2 border-red-200 radius-2"
                onClick={sendMessage}
                >Send</button>
            </form>
        </Container>
    );
}

export default TestPage;