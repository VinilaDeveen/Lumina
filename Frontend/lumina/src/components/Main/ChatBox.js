import React, { useState } from "react";
import { FaComments } from "react-icons/fa"; 
import "../../styles/Main//ChatBox.css";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");


  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  
  const generateReply = (userMessage) => {
    const responses = {
      hello: "Hi! How can I assist you today?",
      hi: "Hello! What can I help you with?",
      help: "Sure! Please let me know your issue.",
      default: "I'm here to assist you. Could you provide more details?",
    };

    const lowerCaseMessage = userMessage.toLowerCase();
    return responses[lowerCaseMessage] || responses.default;
  };


  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

 
    const userMessage = { user: "You", text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botReply = { user: "Bot", text: generateReply(inputMessage) };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 500); 

    setInputMessage("");
  };

  return (
    <div>
      {/* Chat Icon */}
      <div className="chat-icon" onClick={toggleChatBox}>
        <FaComments size={40} />
      </div>

      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">
            <span>Support Chat</span>
            <button className="close-btn" onClick={toggleChatBox}>✕</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chatbox-message">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input-area">
            <input
              type="text"
              className="chatbox-input"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button className="chatbox-send-btn" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;




