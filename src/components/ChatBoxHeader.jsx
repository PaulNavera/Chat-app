import {useState} from "react";
import { AiOutlineSearch, AiOutlineAudioMuted, AiOutlineInfoCircle } from "react-icons/ai";
import { BsThreeDotsVertical, BsArchive } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";

const ChatBoxHeader = ({ onChatUser }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="absolute top-0 left-0 flex justify-between w-full shadow-lg  p-4 bg-[#ffff]">
      <div className="flex items-center gap-2 ">
        <div className="relative w-10 h-10 rounded-full">
          <img
            className="object-fit rounded-full"
            src={onChatUser.pic}
            alt=""
          />
          <span className="absolute top-6 left-7 w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-lg">{onChatUser.name}</span>
          <span className="text-xs">Active</span>
        </div>
      </div>
      <div className="flex  items-center gap-6 px-2">
        <span className="text-xl text-gray-600 hover:cursor-pointer">
          <AiOutlineSearch />
        </span>
        <div className="relative">
          <span onClick={()=>setShowOptions(!showOptions)} className="text-xl text-gray-600  hover:cursor-pointer">
            <BsThreeDotsVertical />
          </span>
            {showOptions && (
              
                <ul className="absolute top-8 right-0 w-auto justify-center bg-white shadow-lg rounded-md z-50 ">
                  <li className="flex gap-2 items-center justify-center py-1 px-4 hover:bg-gray-200 hover:cursor-pointer">
                    <span className="text-xs">
                      <BsArchive />
                    </span>
                    <span className="text-xs">Archive</span>
                  </li>
                  <li className="flex gap-2 items-center justify-center p-2 hover:bg-gray-200 hover:cursor-pointer">
                    <span>
                      <AiOutlineAudioMuted />
                    </span>
                    <span className="text-xs">Mute</span>
                  </li>
                  <li className="flex gap-2 items-center justify-center p-2 hover:bg-gray-200 hover:cursor-pointer">
                    <span>
                      <MdOutlineDeleteSweep />
                    </span>
                    <span className="text-xs">Delete</span>
                  </li>
                  <li className="flex gap-2 items-center justify-center p-2 hover:bg-gray-200 hover:cursor-pointer">
                    <span>
                      <AiOutlineInfoCircle />
                    </span>
                    <span className="text-xs">Profile</span>
                  </li>
                </ul>
              
            )}
          
        </div>

        {showOptions &&
                      <div className="absolute left-0 top-0 w-full h-screen z-20" onClick={() => setShowOptions(false)} />
                    }
      </div>
    </div>
  );
};

export default ChatBoxHeader;
