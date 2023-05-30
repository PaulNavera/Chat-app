import React, { useContext, useEffect, useRef, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { AuthContext } from "../store/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase";
import { getChatContactsRequest } from "../api/ChatRequests";
import { searchUsersRequest } from "../api/UserRequests";
import SearchUsers from "../components/SearchUsers";

const Settings = () => {
 

  return (
    
      <div className=" md:flex flex-col gap-8 hidden items-center h-screen w-[300px] bg-[#ffff] p-4  shadow-lg">
       <h1 className="text-gray-500 text-bold  text-xl self-start">Settings</h1>
       <div className="flex w-full h-full justify-center items-center">
        <p className="text-lg text-red-500">Unavailable!</p>
       </div>
      </div>
    
  );
};

export default Settings;
