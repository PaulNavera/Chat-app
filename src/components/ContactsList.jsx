import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { getUserRequest } from "../api/UserRequests";
import { createChatRequest } from "../api/ChatRequests";


const ChatUser = ({ recipientsData, setContactList }) => {
  const { onChatUser, setOnChatUser } = useContext(ChatContext);
  const [contactsUserData, setContactsUserData] = useState([]);
  const letter = []
 
  const [isSame, SetIsSame] = useState(false)
  
  
  

useEffect(() => {
  
  const getUsers = async () => {

    const fetchedData = [];
    try {

      for(const recipientId of recipientsData){
      const response = await getUserRequest(recipientId);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      
       fetchedData.push(data)
    }

    setContactsUserData(fetchedData)

    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  getUsers();


}, [recipientsData])
  


contactsUserData.sort((a, b) =>a.name.localeCompare(b.name));

setContactList(contactsUserData)

  const chatUserHandler = (contactUser) => {

    setOnChatUser({
      userId: contactUser.userId,
      name: contactUser.name,
      email: contactUser.email,
      pic: contactUser.pic,
    });
  };

    
        

  const myContacts = contactsUserData.map((contactUser, index) =>{

    letter.push(contactUser.name[0])

    

 return(

  <>
  {letter[index-1] !== contactUser.name[0]&&

      <div className="text-blue-600 text-md">
      {contactUser.name[0]}
      </div>

   }
  

 
    <li
    onClick={()=>{chatUserHandler(contactUser)}}
    key={contactUser.userId}
    className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-300 p-1"
  >
    <div className="relative w-8 h-8 rounded-full">
      <img
        className="object-fit rounded-full"
        src={contactUser.pic}
        alt=""
      />
      
      <span className="absolute top-5 left-6 w-2 h-2 rounded-full bg-green-500"></span>
    </div>
    <div className="flex flex-col">
      <span className="text-sm">{contactUser.name}</span>
      
    </div>
  </li>
  </>
  );
 } )
  
  return (
    
   <>
   
   {myContacts}
   </>
  );
};

export default ChatUser;
