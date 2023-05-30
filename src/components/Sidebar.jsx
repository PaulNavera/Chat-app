import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { SiChatbot } from "react-icons/si";
import { MdOutlineDarkMode, MdOutlineLightMode, MdNotificationsNone} from "react-icons/md";
import { signOut } from "firebase/auth";
import auth from "../Firebase";
import { useNavigate, Link } from "react-router-dom";



const Sidebar = ({user}) => {

 
  const [darkMode, setDarkMode] = useState(false);
  const [userOptions, setUserOptions] = useState(false);
  const navigate = useNavigate();
  
const signOutAccount = () =>{
  signOut(auth);
  navigate("/");
}


  return (
    <div className="hidden md:flex h-screen w-20 bg-black">
      <div className="flex flex-col justify-between w-full h-full items-center py-2 ">
        <div className=" flex flex-col gap-10 w-full h-full items-center ">
          <Link to="/chats" className=" text-3xl  hover:cursor-pointer ">
           
          <span className="text-md text-blue-500"><SiChatbot/></span>
            
          </Link >
          <Link to="/profile" className=" text-2xl text-white hover:cursor-pointer hover:text-blue-500 active:text-blue-500 active:border-r-2 border-blue-500 px-5 ">
            <FaUserCircle />
          </Link >
          <Link to="/chats" className=" text-2xl text-white hover:cursor-pointer hover:text-blue-500 active:text-blue-500 active:border-r-2 border-blue-500 px-5">
            <IoMdChatboxes />
          </Link >
          <Link to="/contacts" className=" text-2xl text-white hover:cursor-pointer hover:text-blue-500 active:text-blue-500 active:border-r-2 border-blue-500 px-5">
            <RiContactsFill />
          </Link >

          <Link to="/settings" className=" text-2xl text-white hover:cursor-pointer hover:text-blue-500 active:text-blue-500 active:border-r-2 border-blue-500 px-5">
            <AiOutlineSetting />
          </Link >
        </div>
        <div className="flex flex-col items-center gap-10 w-full">
          <span 
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className=" text-2xl text-white hover:cursor-pointer"
          >
            {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </span>

          <div className="relative ">
            <div className="absolute w-4 h-4 text-center bottom-3 rounded-full bg-[#ffff] left-4 text-red-500 text-sm z-10">4</div>
            <span className="text-2xl text-white hover:cursor-pointer  hover:text-blue-500"><MdNotificationsNone/></span>
          </div>


          <div
            onClick={() => setUserOptions(!userOptions)}
            className=" relative hover:cursor-pointer rounded-full  w-8 h-8 pb-4"
          > 
          <img className="object-fit rounded-full" src={user?.photoURL} alt=""></img>
            {userOptions && (               
            <>
              <div className="absolute left-[-10px] bottom-10 shadow-xl z rounded-md flex justify-center items-center border border-gray-400 w-32 z-50 bg-[#ffff]">
                <ul className="w-full py-1 ">
                  <li className=" text-sm hover:bg-gray-200 hover:cursor-pointer px-2">Profile</li>
                  <li className=" text-sm hover:bg-gray-200 hover:cursor-pointer  px-2">Settings</li>
                  <li className=" text-sm hover:bg-gray-200 hover:cursor-pointer px-2">Change Password</li>
                  <li onClick={signOutAccount} className=" text-sm hover:bg-gray-200 hover:cursor-pointer  px-2">Sign out</li>
                </ul>
              </div>
            </>
            
            )}
          </div>
          {userOptions &&
                      <div className="absolute left-0 top-0 w-full h-screen z-20" onClick={() => setUserOptions(false)} />
                    }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
