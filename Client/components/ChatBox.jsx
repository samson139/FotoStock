import { GiPlayButton } from "react-icons/gi";
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import customFetch from "../src/utils/utils";

const ChatBox = ({ setOpen }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ sender: 'ai', text: "Hello! How can I assist you today?" }]);
  const messagesEndRef = useRef(null);

  const closeChatBox = () => setOpen(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendRequest = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: message }]);
    const currentMessage = message;
    setMessage("");

    try {
      const response = await customFetch.post("/api/chat", { message: currentMessage });
      setMessages((prev) => [...prev, { sender: 'ai', text: response.data.data }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { sender: 'ai', text: "❌ Failed to get response." }]);
    }
  };

  return (
    <div className="fixed bottom-10 right-5 w-80 h-96 md:w-96 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl z-50 flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-700 text-white px-4 py-3 rounded-t-3xl shadow-md">
        <h6 className="text-sm md:text-base font-semibold">Ask your question</h6>
        <button
          onClick={closeChatBox}
          className="text-white text-xl md:text-2xl hover:text-red-400 transition"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      {/* Chat body */}
      <div className="flex-1 p-4 text-sm md:text-base overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl max-w-[85%] break-words ${msg.sender === 'user'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end ml-auto shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start shadow-sm'
              }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="flex p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition"
        />
        <button
          onClick={sendRequest}
          className="flex items-center justify-center ml-2 p-3 bg-blue-600 dark:bg-indigo-700 text-white rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          <GiPlayButton className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default ChatBox;


