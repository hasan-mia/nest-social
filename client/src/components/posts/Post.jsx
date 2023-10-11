import React from "react";
import { BiWorld } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import userImag from "../../../src/assets/userImg.png";
import Reaction from "../reaction/Reaction";
import ReactionBtn from "../reaction/ReactionBtn";
import PostCard from "./PostCard";
import CommentInput from "./comments/CommentInput";

const Post = () => {
  return (
    <div className="flex flex-col flex-start gap-2 bg-white pb-2 mb-4 border rounded-lg">
      <div className="flex justify-between items-start gap-1 px-2 py-2 w-full mb-2">
        {/* ==Profile== */}
        <div className="flex justify-center gap-x-2">
          <Link href="#">
            <img alt="name" src={userImag} className="w-10 h-10 rounded-full" />
          </Link>
          <div className="flex flex-col">
            <p>Emah John</p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <span>6hr</span>{" "}
              <span>
                <BiWorld />
              </span>
            </p>
          </div>
        </div>
        {/* Dropdown menu */}
        <div className="dropdown dropdown-end px-2">
          <label tabindex="0" className="rounded-full">
            <div className="text-md lg:text-2xl cursor-pointer px-2">
              <BsThreeDots />
            </div>
          </label>
          <ul
            tabindex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        {/* Post card */}
        <PostCard/>

        <div className="comment px-4 py-2">
          {/* Show Like/Comment */}
          <div className="flex justify-between">
            <Reaction/>
          </div>

          {/* Show Like/Comment */}
          <div className="flex justify-center items-center border-y py-2 mt-2">
            <ReactionBtn/>
          </div>

          {/* Post Comment Option */}
          <CommentInput/>

          {/* All Comment */}
          <nav className="flex flex-col bg-transparent gap-2">
            <ul>
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
                          Illo eveniet velit consequatur quae fugit? Autem,
                          temporibus. Sunt.
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
                <ul>
                  <li className="ml-5">
                    <div className="flex gap-2 items-start">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={userImag} alt="avatar" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        <div className="flex flex-col bg-gray-100 pt-1 pb-2 px-4 rounded-2xl">
                          <p className="font-semibold text-sm">Sarah Doe</p>
                          <p className="flex items-center gap-2 text-gray-700 text-sm">
                            <span>
                              Illo eveniet velit consequatur quae fugit? Autem,
                              temporibus. Sunt.
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
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Post;
