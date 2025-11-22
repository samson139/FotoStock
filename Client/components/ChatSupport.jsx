import { useState } from 'react';
import { IoMdChatboxes } from "react-icons/io";
import ChatBox from './ChatBox';

const ChatSupport = () => {
  const [open, setOpen] = useState(false);
  const handleBox = () => setOpen(true);

  return (
    <div>
      {open ? (
        <ChatBox setOpen={setOpen} />
      ) : (
        <div
          onClick={handleBox}
          className="
            fixed bottom-5 right-5 z-50
            flex items-center justify-center gap-2
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white font-semibold
            py-3 px-5 rounded-full
            shadow-lg shadow-blue-400/50
            cursor-pointer
            transform transition-all duration-300
            hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-indigo-700
            dark:shadow-indigo-800/50
            dark:bg-gradient-to-r dark:from-indigo-700 dark:to-blue-800
          "
        >
          <h6 className="text-sm md:text-base">Support</h6>
          <IoMdChatboxes className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatSupport;

