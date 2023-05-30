import React from "react";
import {AiOutlineFileImage,AiOutlineDownload} from 'react-icons/ai'
import {BsFiletypeDocx} from 'react-icons/bs'

const UserProfile = ({ user }) => {


const imageFiles =[AiOutlineFileImage,AiOutlineFileImage,AiOutlineFileImage,AiOutlineFileImage,AiOutlineFileImage,AiOutlineFileImage]

const attachedFiles = [
          {
          
          text:"Thesis.docx",
          size:"3.5 MB"
          
          },
          {
          
          text:"Thesis.docx",
          size:"3.5 MB"
          
          },
          {
         
          text:"Thesis.docx",
          size:"3.5 MB"
          
          },
          {
          
          text:"Thesis.docx",
          size:"3.5 MB"
          
          },
          {
          
          text:"Thesis.docx",
          size:"3.5 MB"
          
          },
          {
          
          text:"Thesis.docx",
          size:"3.5 MB"
          
          },
          {
      
          text:"Thesis.docx",
          size:"3.5 MB"
          
          }
        
        ]


        const images = imageFiles.map((image,index)=>

                <span key={index} className='text-4xl text-blue-400'><AiOutlineFileImage/></span>
          )

          const attached  = attachedFiles.map((file,index)=>
            
            <div key={index}  className="flex items-center gap-2 ">
                <span><BsFiletypeDocx/></span>
                <div className='flex flex-col'>
                  <span>{file.text}</span>
                  <span>{file.size}</span>
                </div>
                <span><AiOutlineDownload/></span>
            </div>
            )

  return (
    <div className=" w-full items-center flex flex-col ">
      <img
        className="rounded-full border border-white w-20 h-20"
        src={user.photoURL}
        alt=""
      />

      <p className="text-xl text-gray-800">{user.displayName}</p>

      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <p>Active</p>
      </div>
      <div className='flex flex-col gap-4 mt-6'>
        <div>
          <label>Name:</label>
          <p className="text-xl text-gray-800">{user.displayName}</p>
        </div>
        <div>
          <label>Email:</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label>Location:</label>
          <p>Manila, Philippines</p>
        </div>
      </div>
      <div className='w-full'>
        
        <span>Media</span>
      
        <div className='w-full flex gap-1 overflow-y-auto'>
         {images}
        </div>
      </div>

    
      <div>
        <h4>Attached Files</h4>
        <div className="w-full flex flex-col gap-2 overflow-x-auto">
          {attached}
        </div>

      </div>

    </div>
  );
};

export default UserProfile;
