import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./MessagesPage.css";

const MessagesPage = () => {
    const { userId } = useParams(); // Assumes `userId` is passed as a route parameter
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([
        // Example of initial messages, replace with your actual data
        { sender: "me", content: "Hello! How are you?" },
        { sender: "them", content: "Hi! I'm doing well, thanks. How about you?" }
    ]);

    const handleSendMessage = () => {
        if (messageInput.trim() === "") return;

        // Update messages with the new message
        setMessages([...messages, { sender: "me", content: messageInput }]);
        setMessageInput(""); // Clear input field
    };

    return (
        <div className="messages-page">
            <header className="messages-header">
                <h2>Chat with User {userId}</h2>
            </header>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === "me" ? "sent" : "received"}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessagesPage;
