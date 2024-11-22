import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { userList } from "../data/userData";
import { messagesData } from "../data/userData";
import send from '../assets/images/button-icons/send.svg';
import add from '../assets/images/button-icons/add.svg';
import more from '../assets/images/button-icons/more.svg';
import deleteButton from '../assets/images/button-icons/delete.svg';
import "./MessagesPage.css";
const MessagesPage = () => {
    // Manually set logged in user
    const loggedInUser = userList.find(user => user.username === 'sallysmith');

    // Get userId from route params
    const { userId } = useParams();

    // Find selected user
    const [selectedUser, setSelectedUser] = useState(() => {
        return userId ? userList.find(user => user.id === userId) : null;
    });

    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState({});
    const [conversations, setConversations] = useState(() => {
        return userList.filter(user => {
            const userMessages = messagesData.find(convo => convo.userId === user.id);
            return user.id !== loggedInUser.id && userMessages;
        });
    });

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showMoreConversations, setShowMoreConversations] = useState(false);

    const modalRef = useRef(null);
    const moreOptionsModalRef = useRef(null);

    // Close the modal if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowAddUserModal(false);
            }

            if (moreOptionsModalRef.current && !moreOptionsModalRef.current.contains(event.target)) {
                setShowMoreOptions(false);
                setShowMoreConversations(false);
            }
        };

        if (showAddUserModal || showMoreOptions || showMoreConversations) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAddUserModal, showMoreOptions, showMoreConversations]);

    // Logic to ensure only one modal is open at a time
    useEffect(() => {
        if (showAddUserModal) {
            setShowMoreOptions(false);
            setShowMoreConversations(false);
        } else if (showMoreOptions || showMoreConversations) {
            setShowAddUserModal(false);
        }
    }, [showAddUserModal, showMoreOptions, showMoreConversations]);

    // Load messages for selected user
    useEffect(() => {
        if (selectedUser && !messages[selectedUser.id]) {
            const userMessages = messagesData.find(convo => convo.userId === selectedUser.id)?.conversation || [];
            setMessages(prevMessages => ({
                ...prevMessages,
                [selectedUser.id]: userMessages
            }));
        }
    }, [selectedUser, messages]);
    

    const handleSendMessage = () => {
        if (messageInput.trim() === "") return;

        setMessages(prevMessages => ({
            ...prevMessages,
            [selectedUser.id]: [
                ...(prevMessages[selectedUser.id] || []),
                { sender: loggedInUser.username, content: messageInput }
            ]
        }));
        
        setMessageInput("");
    };

    const handleSelectConversation = (userId) => {
        const user = userList.find(user => user.id === userId);
        setSelectedUser(user);
    };

    const getLastMessage = (conversationId) => {
        const conversationMessages = messages[conversationId] || [];
        const lastMessage = conversationMessages[conversationMessages.length - 1];
        return lastMessage ? lastMessage.content : "";
    };

    const handleAddNewConversation = (userId) => {
        const newUser = userList.find(user => user.id === userId);
        setSelectedUser(newUser);
        setConversations(prev => [...prev, newUser]);
        setShowAddUserModal(false);
    };

    const handleDeleteConversation = () => {
        if (!selectedUser) return;

        setConversations(prev => prev.filter(convo => convo.id !== selectedUser.id));
        setSelectedUser(null);
        setShowMoreOptions(false);
        setIsDeleting(false);
        setShowMoreConversations(false);
    };

    const handleMoreClick = () => {
        setShowMoreConversations(prev => !prev);
        setShowMoreOptions(false);
    };

    return (
        <div className="messages-page">
            <div className="messages-sidebar">
                <header className="messages-sidebar-header">
                    <h6>Messages</h6>
                    <div className="messages-button-container">
                        <button onClick={() => setShowAddUserModal(true)} className="add-conversation-btn">
                            <img src={add} alt="Add" />
                        </button>
                        <button onClick={handleMoreClick} className="more-options-btn">
                            <img src={more} alt="More" />
                        </button>
                    </div>
                </header>
                <ul>
                    {conversations.map((conversation) => (
                        <li
                            key={conversation.id}
                            className={selectedUser?.id === conversation.id ? "active" : ""}
                            onClick={() => handleSelectConversation(conversation.id)}
                        >
                            <img 
                                src={conversation.image} 
                                alt={`${conversation.firstName} ${conversation.lastName}`} 
                                className="profile-image" 
                            />
                            <div className="conversation-details">
                                <span>{conversation.firstName} {conversation.lastName}</span>
                                <p className="last-message">{getLastMessage(conversation.id)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-container">
                <header className="messages-header">
                    <h6>{selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : 'Messages'}</h6>
                </header>
                <div className="messages-container">
                    {(messages[selectedUser?.id] || []).map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender === loggedInUser.username ? "sent" : "received"}`}
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
                    <button onClick={handleSendMessage}>
                        <img src={send} alt="Send" />
                    </button>
                </div>
            </div>

            {showAddUserModal && (
                <div className="modal-dropdown" ref={modalRef}>
                    <h6>Select a user to start a conversation</h6>
                    <ul>
                        {userList.filter(user => user.id !== loggedInUser.id && !conversations.some(convo => convo.id === user.id)).map(user => (
                            <li key={user.id} onClick={() => handleAddNewConversation(user.id)}>
                                <span>{user.firstName} {user.lastName}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showMoreConversations && (
                <div className="modal-dropdown" ref={moreOptionsModalRef}>
                    <h6>Select a conversation to delete</h6>
                    <button onClick={handleDeleteConversation} className="delete-conversation-btn primary-btn">Delete</button>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;

