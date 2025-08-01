import { useState } from 'react'

import { IoMdChatboxes } from "react-icons/io";
import ChatBox from './ChatBox';
const ChatSupport = () => {
  const [open, setOpen] = useState(false);
  const handleBox = () => {
    setOpen(true);
  }
  return (
    <div>
      {open ? <ChatBox setOpen={setOpen} /> :
        <div className='fixed border-2 
     border-black bottom-5 right-5 z-50
      bg-gray-200 dark:bg-gray-400 py-2 px-4
      rounded-full shadow-lg cursor-pointer
      flex items-center justify-center' onClick={handleBox}>


          <h6 className='text-gray-800 font-medium dark:text-gray-800 decoration-black mr-2'>Support</h6>
          <IoMdChatboxes className='w-[25px] h-[25px] text-blue-900' />
        </div>
      }
    </div>
  )
}

export default ChatSupport;
