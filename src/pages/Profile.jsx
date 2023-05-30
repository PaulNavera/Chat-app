import React from "react";
import { AiOutlineFileImage, AiOutlineDownload } from "react-icons/ai";
import { BsFiletypeDocx, BsThreeDotsVertical } from "react-icons/bs";

const Profile = ({ user }) => {
  const imageFiles = [
    AiOutlineFileImage,
    AiOutlineFileImage,
    AiOutlineFileImage,
    AiOutlineFileImage,
    AiOutlineFileImage,
    AiOutlineFileImage,
  ];

  const attachedFiles = [
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
    {
      text: "Thesis.docx",
      size: "3.5 MB",
    },
  ];

  const images = imageFiles.map((image, index) => (
    <div key={index} className="text-6xl text-blue-400">
      <AiOutlineFileImage />
    </div>
  ));

  const attached = attachedFiles.map((file, index) => (
    <div key={index} className="flex items-center justify-evenly gap-2 ">
      <span className="text-md text-blue-500">
        <BsFiletypeDocx />
      </span>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{file.text}</span>
        <span className="text-xs text-gray-500">{file.size}</span>
      </div>
      <span>
        <AiOutlineDownload />
      </span>
    </div>
  ));
  return (
    <div className=" md:flex flex-col gap-6 hidden items-center h-screen w-[300px] bg-[#ffff] p-4 shadow-lg">
      <div className="w-full flex flex-col justify-between">
        <div className="w-full">
          <div className=" w-full flex items-center justify-between">
            <h1 className="text-xl text-gray-500 text-bold">Profile </h1>
            <span>
              <BsThreeDotsVertical />
            </span>
          </div>

          <div className=" w-full items-center flex flex-col mt-4 ">
            <img
              className="rounded-full border-2 border-blue-500 w-16 h-16"
              src={user.photoURL}
              alt=""
            />

            <p className="text-md text-gray-700">{user.displayName}</p>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-700">Active</p>
            </div>
            <div className=" w-full flex flex-col gap-2 mt-4">
              <h4 className="text-md text-bold text-blue-500">About</h4>
              <div>
                <label className="text-sm text-gray-700">Name:</label>
                <p className="text-sm text-gray-500">{user.displayName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-700">Email:</label>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-700">Location:</label>
                <p className="text-sm text-gray-500">Manila, Philippines</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-2">
              <h4 className="text-md text-bold  text-blue-500">Media Files</h4>

              <div className="w-48 flex gap-1 overflow-y-auto">{images}</div>
            </div>

            <div className="">
              <h4 className="text-md text-bold text-blue-500">Attached Files</h4>
              <div className="h-36 flex flex-col gap-2 overflow-x-auto">
                {attached}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
