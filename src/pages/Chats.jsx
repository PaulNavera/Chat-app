import React, { useContext, useEffect, useRef, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { AuthContext } from "../store/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase";
import ChatsList from "../components/ChatsList";
import { getChatContactsRequest } from "../api/ChatRequests";
import { searchUsersRequest } from "../api/UserRequests";
import SearchUsers from "../components/SearchUsers";
import { createPortal } from 'react-dom';
import AddChat from '../components/AddChat'


const Chats = () => {
  const [user] = useAuthState(auth);
  // const [userProfile, setUserProfile] = useContext(AuthContext)
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [recipient, setRecipient] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {

    if(keyword!==""){
    const delayDebounceFn = setTimeout(() => {

      const searchUsers = async () => {
        try {
          const response = await searchUsersRequest(user.uid, keyword);
    
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
    
          const data = await response.json();
    
          setSearchData(data);

        } catch (error) {
          console.log("Error:", error.message);
        }
      };

      searchUsers();

    }, 500)

    return () => clearTimeout(delayDebounceFn)

  }
  }, [keyword])
  
    
  


  useEffect(() => {
    const getChatContacts = async () => {
      try {
        const response = await getChatContactsRequest(user.uid);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        setChatData(data);
        
       
      } catch (error) {
        console.log("Error:", error.message);
      }
    };

    getChatContacts();
  }, []);

  const recipientsData = chatData.map((data) => {
    return data.members.find((id) => id !== user.uid);
  });

  const myChats = recipientsData.map((recipientID) => (
    <ChatsList  recipientID={recipientID} userId={user.uid}  />
  ));
 

  return (
    <>
      <div className=" md:flex flex-col gap-8 hidden items-center h-screen w-[300px] bg-[#ffff] p-4  shadow-lg">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-gray-500 text-bold  text-xl">Chats</h1>
          <span onClick={()=>setAddModal(true)} className="text-xl text-blue-600 hover:cursor-pointer "><IoCreateOutline/></span>
          {addModal && createPortal(
         <AddChat onClose={() => setAddModal(false)} />,
        document.body
      )}
        </div>
       
        <div className="flex gap-2 items-center justify-between w-full bg-gray-200 p-2">
            
          {searching&&
          <span 
          onClick={()=>{
            setSearching(!searching)
            setSearchData([])
            setKeyword("")
          }
          } 
          className=""><BsArrowLeftShort/></span>}

          <input
            onChange={(e) => {
              setKeyword(e.target.value);
              setSearching(true)
            }}
            onClick={()=>{
              setSearching(true)
            }
            } 
            value={keyword}
            type="search"
            placeholder="Search users.."
            className=" text-gray-900 w-full bg-inherit outline-none text-sm border-none"
          />
        </div>
        
        <div className="flex w-full h-auto overflow-y-auto flex-col gap-3">
          {searching?
          <SearchUsers searchData={searchData} setSearching={setSearching}/>
          :
          myChats
          }
        </div>
      </div>
    </>
  );
};

export default Chats;
