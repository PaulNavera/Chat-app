import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import {
  BsThreeDots,
  BsThreeDotsVertical,
  BsEmojiSmile,
  BsMic,
} from "react-icons/bs";
import { sendMessageRequest } from "../api/MessageRequests";
import EmojiPicker from 'emoji-picker-react';

const SendMessage = ({ chatId, user, setSendMessage, receiverId, setMessagesData, messagesData}) => {
  
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const MessageHandler = (e) => {
    e.preventDefault();
  
    if(value!==""){
      
      const message = {
      senderId : user.uid,
      message: value,
      chatId: chatId,
  }
    setSendMessage({...message, receiverId })

    saveMessage();
  }
  
  }
    

  const saveMessage = async () => {
    try {

      const response = await sendMessageRequest(chatId, user.uid, value);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMessagesData([...messagesData, data ])
      setValue("");
    } catch (error) {
      console.log("Error:", error.message);
      throw error;
    }

    
  };

  return (
    <form
      onSubmit={MessageHandler}
      className="absolute left-0 bottom-0 flex w-full items-center gap-4 p-4 bg-gray-300 shadow-md"
    >
      <span className="text-xl text-gray-600">
        <BsThreeDots />
      </span>
      
     
     
      <div className="flex w-full bg-[#ffff] px-3 py-2 items-center rounded-lg">
        <input
          className="w-full outline-none border-none"
          placeholder="Type your message.."
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="text-gray-600 text-xl">
          <BsMic />
        </span>
      </div>
      <button
        type="submit"
        className="flex items-center p-3 bg-[#4eac6d] rounded-lg"
      >
        <span className=" text-[#ffff] text-xl">
          <IoSend />
        </span>
      </button>
    </form>
  );
};

export default SendMessage;
