import React from "react";
import { Link } from "react-router-dom";
import userImag from "../../../../src/assets/userImg.png";
export default function CommentInput() {
  return (
    <div className="flex items-center gap-1px-2 py-2 w-full mt-2">
      <Link to="/">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={userImag} alt="avatar" />
          </div>
        </div>
      </Link>
      <div className="flex w-full px-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="py-3 px-2 bg-gray-100 w-full rounded-2xl active:border-none active:shadow-none outline-none"
        />
      </div>
    </div>
  );
}
