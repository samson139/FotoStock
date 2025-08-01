
import { GiPlayButton } from "react-icons/gi";
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import customFetch from "../src/utils/utils";


const ChatBox = ({ setOpen }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const closeChatBox = () => {
    setOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendRequest = async () => {
    if (!message.trim()) return;

    // Append user's message
    setMessages((prev) => [...prev, { sender: 'user', text: message }]);
    const currentMessage = message;
    setMessage(""); // clear input immediately

    try {
      const response = await customFetch.post("/api/chat", { message: currentMessage });
      setMessages((prev) => [...prev, { sender: 'ai', text: response.data.data }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { sender: 'ai', text: "❌ Failed to get response." }]);
    }
  };

  return (
    <div className="fixed bottom-10 right-5 w-80 h-96 bg-white dark:bg-gray-800 shadow-xl rounded-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 dark:bg-gray-700 text-white px-4 py-2 rounded-t-2xl">
        <h6 className="text-sm font-semibold">Ask your question</h6>
        <button
          onClick={closeChatBox}
          className="text-white text-lg hover:text-red-400 transition"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      {/* Chat body */}
      <div className="flex-1 p-4 text-sm overflow-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-[85%] ${msg.sender === 'user'
              ? 'bg-blue-100 self-end ml-auto text-right dark:bg-gray-700 text-gray-300'
              : 'bg-gray-100 dark:bg-gray-700 self-start text-left'
              }`}
          >
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="flex p-2 border-t border-gray-300 dark:border-gray-600">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={sendRequest}
          className="flex items-center justify-center ml-2 p-2 bg-blue-600 dark:bg-gray-700 text-white rounded-md cursor-pointer hover:bg-blue-700 dark:hover:bg-gray-600 transition"
        >
          <GiPlayButton className="w-[25px] h-[25px]" />
        </button>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default ChatBox;

