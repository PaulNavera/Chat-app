import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiChatbot } from "react-icons/si";
import {
  AiFillFacebook,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import auth from "../Firebase";

import { signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";



const Signin = () => {
  
  const signInGoogle = () => {
    const providerGoogle = new GoogleAuthProvider();
    signInWithRedirect(auth, providerGoogle);
  };


  const signInFacebook = () => {
    const providerFacebook = new FacebookAuthProvider();
    signInWithRedirect(auth, providerFacebook);
  };




  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-500 p-10">
      <div className="flex flex-col w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] gap-4 h-auto items-center shadow-md bg-white rounded-lg p-6">
        <div className="flex flex-col w-full items-center gap-4">
          <span className="text-4xl lg:text-6xl text-blue-500"><SiChatbot/></span>
          
          <h1 className="text-2xl text-bold mb-5">Welcome to Chatify</h1>
          <p>Login your account to continue</p>

          <div className="flex justify-center gap-6 w-full">
            <button
              onClick={signInGoogle}
              className=" flex justify-center items-center text-xs md:text-md lg:text-lg gap-2 w-auto border border-gray-500 hover:border-blue-500 shadow-lg rounded-md text-center py-1 px-2"
            >
              <span className="text-center">
                <FcGoogle />
              </span>
              Login with Google 
            </button>
            <button onClick={signInFacebook} className="flex justify-center items-center hover:border-blue-500 text-xs md:text-md lg:text-lg md:text-md wd-auto px-2 gap-2  border border-gray-500 shadow-lg rounded-md text-center py-1">
              <span className="text-center">
                <AiFillFacebook />
              </span>
              Login with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
