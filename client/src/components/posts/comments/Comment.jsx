import React from "react";
import userImag from "../../../../src/assets/userImg.png";
export default function Comments() {
  return (
    <li>
      <div className="flex gap-2 items-start">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={userImag} alt="avatar" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <div className="flex flex-col bg-gray-100 pt-1 pb-2 px-4 rounded-2xl">
            <p className="font-semibold text-sm">Sarah Doe</p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <span>
                Illo eveniet velit consequatur quae fugit? Autem, temporibus.
                Sunt.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="py-1 px-2 text-gray-800 rounded-md text-sm"
            >
              Like
            </button>
            <button
              type="button"
              className="py-1 px-2 text-gray-800 rounded-md text-sm"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      
    </li>
  );
}
