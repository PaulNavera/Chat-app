import {useState} from 'react'
import { FcGoogle} from 'react-icons/fc'
import { AiFillFacebook, AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

import auth  from '../Firebase'

import {  signInWithRedirect , GoogleAuthProvider, getAuth } from "firebase/auth";

import { useNavigate  } from 'react-router-dom';



const Signin = () => {
    
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();   

    const signInGoogle = () => {
       const provider = new GoogleAuthProvider(); 
       signInWithRedirect (auth, provider);
       
    }

   
   

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#4eac6d] p-10">
      <div className="flex flex-col w-full md:w-[50%] gap-4 h-auto items-center shadow-md bg-white rounded-lg p-6">
        <div>
          
          <h1 className='text-2xl text-bold'>Sign in Account</h1>
        </div>

        <form className=" flex flex-col w-full gap-4">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input className='px-2 border border-gray-400 outline-none' type="email" placeholder="Enter email" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="">Password</label> 
            <div className="flex justify-between items-center px-2 gap-2 border border-gray-400 ">
              <input  className='w-full order-none outline-none' type={showPassword?"text":"password"} placeholder="Enter password" />
              <span className='hover:cursor-pointer text-[#4eac6d] text-lg' onClick={()=>setShowPassword(!showPassword)}>{showPassword?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</span>
            </div>
          </div>
          <label className="">
            <input className="" type="checkbox" /> Remember me
          </label>

          <button className='w-full bg-[#4eac6d] text-center text-[#ffff]'>Sign in</button>
        </form>
        <div className='flex gap-1 w-full items-center'>
            <div className='h-[1px] w-full bg-gray-400'></div>
            <span>or</span>
            <div className='h-[1px] w-full bg-gray-400'></div>
        </div>
        <div className='flex flex-col w-full items-center gap-4'>
          <span>Sign in with</span>
          <div className='flex justify-center gap-6 w-full'>
            <button onClick={signInGoogle} className=' flex justify-center items-center gap-2 w-[40%] border border-[#4eac6d] shadow-md rounded-md text-center py-1'> 
              <span className='text-center'><FcGoogle/></span>
              Google
            </button>
            <button className='flex justify-center items-center gap-2 w-[40%] border border-[#4eac6d] shadow-md rounded-md text-center py-1'>
              <span className='text-center'><AiFillFacebook/></span>
              Facebook
            </button>
          </div>
          </div>
       
      </div>
    </div>
  );
};

export default Signin;
