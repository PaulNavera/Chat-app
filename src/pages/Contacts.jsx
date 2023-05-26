import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AuthContext } from "../store/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase";
import ContactsList from "../components/ContactsList";
import { getChatContactsRequest } from "../api/ChatRequests";
import { searchUsersRequest } from "../api/UserRequests";
import SearchUsers from "../components/SearchUsers";
import { createPortal } from 'react-dom';
import AddContact from '../components/AddContact'



const Contacts = () => {
  const [user] = useAuthState(auth);
  const { setOnChatUser } = useContext(ChatContext);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [contactList, setContactList] = useState([])
  let searchResult = [];

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

        setContactsData(data);
        
      } catch (error) {
        console.log("Error:", error.message);
      }
    };

    getChatContacts();
  }, []);

  
  const recipientsData = contactsData.map((data) => {
    return data.members.find((id) => id !== user.uid);
  });

  const regex = new RegExp(keyword, 'i');

 if(keyword!==""){
   searchResult = contactList.filter(item=> regex.test(item.name))
 }

  const chatUserHandler = (contactUser) => {

    setOnChatUser({
      userId: contactUser.userId,
      name: contactUser.name,
      email: contactUser.email,
      pic: contactUser.pic,
    });
    setKeyword("");
    setSearching(false)
  };



  const searchContact  = searchResult.map(result=>
    

 
    <li
    onClick={()=>{chatUserHandler(result)}}
    key={result.userId}
    className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-300 p-1"
  >
    <div className="relative w-8 h-8 rounded-full">
      <img
        className="object-fit rounded-full"
        src={result.pic}
        alt=""
      />
      
      <span className="absolute top-5 left-6 w-2 h-2 rounded-full bg-green-500"></span>
    </div>
    <div className="flex flex-col">
      <span className="text-sm">{result.name}</span>
      
    </div>
  </li>
  
    
    )


  return (
    
      <div className=" md:flex flex-col gap-8 hidden items-center h-screen w-[300px] bg-[#ffff] p-4  shadow-lg">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-gray-500 text-bold  text-xl">Contacts</h1>
          <span onClick={()=>setShowModal(true)} className="text-xl text-blue-600 hover:cursor-pointer "><AiOutlineUserAdd/></span>
          {showModal && createPortal(
         <AddContact onClose={() => setShowModal(false)} />,
        document.body
      )}
        </div>
        <div className="flex gap-2 items-center justify-between w-full bg-gray-200 p-2">
            
            {searching&&
            <span 
            onClick={()=>{
              setSearching(!searching)
              setSearchData([])
            }
            } className=""><BsArrowLeftShort/></span>}
  
            <input
              onChange={(e) => {
                setKeyword(e.target.value);
                setSearching(true)
              }}
              
              value={keyword}
              type="search"
              placeholder="Search Contacts.."
              className=" text-gray-900 w-full bg-inherit outline-none text-sm border-none"
            />
          </div>
          <div className="flex w-full h-auto overflow-y-auto flex-col gap-3">
          {searching?
          
          <>
          <div className="text-sm text-gray-500">Search result for "{keyword}"</div>
          {searchResult.length > 0?
            searchContact
            :
            <div>No result found.</div>
          }
          
          </>
          :
          <ContactsList recipientsData={recipientsData} setContactList={setContactList}/>
        }
          
          
        </div>
       
      </div>
    
  );
};

export default Contacts;
