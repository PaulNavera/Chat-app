import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import {useEffect,useState} from 'react'
import Chatbox from './components/Chatbox';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';
import Signin from './pages/Signin';
import ProtectedRoute from './Routes/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth  from './Firebase';
import io from 'socket.io-client'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {AuthProvider} from './store/AuthContext';
import { ChatProvider } from './store/ChatContext';
import {saveUserRequest} from './api/UserRequests';



export default function App() {

  const [user] = useAuthState(auth)
  
  const [userProfile, setUserProfile] = useState({});
  const [activeUsers, setActiveUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onChatUser, setOnChatUser] = useState({
                      userId:null,
                      name: null,
                      email: null,
                      pic: null
  });

 

  const socket = io.connect('http://localhost:3001');


useEffect(()=>{

if(user){
  
  
  socket.emit("add-user", user.uid);
 
  socket.on("get-users", (users) => {
    setActiveUser(users)
    
})


}

}, [user])

useEffect(() => {
  if (sendMessage!==null) {
    socket.emit("send-message", sendMessage);}
}, [sendMessage]);



useEffect(() => {
  socket.on("receive-message", (data) => {
    
    setReceivedMessage(data);
    console.log(receivedMessage)
  });
}, [socket]);



  
  const saveUser = async() =>{
    
    try {
      const response = await saveUserRequest(user.uid, user.displayName, user.email, user.photoURL);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      
    } catch (error) {
      console.log('Error:', error.message);
      throw error;
    }

  }


  useEffect(() => {
   
    if(user){
      saveUser()
    }
      
    
  }, [])
  
 
  


  return (

    <AuthProvider value={{userProfile, setUserProfile}}>
    <ChatProvider value={{onChatUser, setOnChatUser}}>
    <div className='flex'>
      
      <Router>
      {user &&
          <Sidebar user={user} />
        }
        <Routes>
          <Route exact path='/' element={<Navigate to='/signin'/>} />
          
          <Route path='/signin' element={!user?<Signin />:<Navigate to='/chats'/>} />
          
          <Route path='/chats' element={<ProtectedRoute user={user}><Chats /></ProtectedRoute>} />
          <Route path='/contacts' element={<ProtectedRoute user={user}><Contacts /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute user={user}><Profile user={user} /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute user={user}><Settings /></ProtectedRoute>} />
        </Routes>
      </Router>

      {user && 
          <Chatbox setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
      }
    </div>
    </ChatProvider>
    </AuthProvider>
  );
}
