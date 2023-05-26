import React from 'react'
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { getUserRequest } from "../api/UserRequests";
import { createChatRequest } from "../api/ChatRequests";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth  from '../Firebase';
import Swal from 'sweetalert2'


const FindUser = ({searchData, setSearching}) => {

  const { onChatUser, setOnChatUser } = useContext(ChatContext);
  const [user] = useAuthState(auth)
  const [chatUserData, setChatUserData] = useState([]);


  const createChat = async(ChatUserId)=>{

    try {
      const response = await createChatRequest(user.uid, ChatUserId);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
    
    } catch (error) {
      console.log("Error:", error.message);
    }
  }


  const chatUserHandler = (ChatUserId) => {

    createChat(ChatUserId)

    setOnChatUser({
      userId: chatUserData.userId,
      name: chatUserData.name,
      email: chatUserData.email,
      pic: chatUserData.pic,
    });
    setSearching(false);
   
  };

 const searchResult = searchData.map((ChatUser) => (
      
    <li
    onClick={()=>{chatUserHandler(ChatUser.userId)}}
    key={ChatUser.userId}
    className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-300 p-1"
  >
    <div className="relative w-8 h-8 rounded-full">
      <img
        className="object-fit rounded-full"
        src={ChatUser.pic}
        alt=""
      />
      <span className="absolute top-5 left-6 w-2 h-2 rounded-full bg-green-500"></span>
    </div>
    <div className="flex flex-col">
      <span className="text-sm">{ChatUser.name}</span>
      <span className="text-xs">online</span>
    </div>
  </li>
));
  return (
    <>{ searchResult }</>
    
  );
}

export default FindUser