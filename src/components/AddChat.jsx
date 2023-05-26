import { useState, useEffect } from "react";
import { searchUsersRequest } from "../api/UserRequests";
import SearchUsers from "./SearchUsers";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase";


const AddChat = ({onClose}) => {
    const [user] = useAuthState(auth);
    const [keyword, setKeyword] = useState("");
    const [searching, setSearching] = useState(false);
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


  return (
    <div className=" absolute flex justify-center items-center top-0 left-0 w-full h-screen " >
          <div className=" absolute  top-0 left-0 w-full h-screen z-10" onClick={onClose}/>

      <div className="relative flex flex-col gap-5 w-1/3 h-auto bg-white shadow-lg rounded-md p-4 ease-in-out duration-75 z-20">

        <div className="flex justify-between">
            <h1 className="text-xl text-blue-600">New Chat</h1>
            <span onClick={onClose} className="hover:cursor-pointer hover:text-red-600 hover:text-bold text-md " >x</span>
        </div>
        
        
        <div className="flex gap-2">
          <label>To:</label>
            <input
          className="w-full outline-none border border-gray-500"
          placeholder="Search User.."
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
            
        </div>
        <div className="flex flex-col w-full h-20 overflow-x-auto ">
            <SearchUsers searchData={searchData} setSearching={setSearching}/>
        </div>
        
      </div>
    </div>
  );
};

export default AddChat;
