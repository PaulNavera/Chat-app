import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { getUserRequest } from "../api/UserRequests";
import { createChatRequest } from "../api/ChatRequests";

const ChatsList = ({ recipientID }) => {
  const { onChatUser, setOnChatUser } = useContext(ChatContext);
  const [chatUserData, setChatUserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getUserRequest(recipientID);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        setChatUserData(data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };

    getUsers();
  }, []);

  


  const chatUserHandler = () => {

    setOnChatUser({
      userId: chatUserData.userId,
      name: chatUserData.name,
      email: chatUserData.email,
      pic: chatUserData.pic,
    });
  };

  
  return (
    <li
      onClick={chatUserHandler}
      key={chatUserData.userId}
      className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-300 p-1"
    >
      <div className="relative w-8 h-8 rounded-full">
        <img
          className="object-fit rounded-full"
          src={chatUserData.pic}
          alt=""
        />
        <span className="absolute top-5 left-6 w-2 h-2 rounded-full bg-green-500"></span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm">{chatUserData.name}</span>
        
      </div>
    </li>
  );
};

export default ChatsList;
