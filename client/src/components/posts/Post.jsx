import moment from "moment";
import React, { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import userImag from "../../../src/assets/userImg.png";
import PostCard from "./PostCard";
import CommentInput from "./comments/CommentInput";
import Comments from "./comments/Comments";
import Reaction from "./reaction/Reaction";
import ReactionBtn from "./reaction/ReactionBtn";

const Post = ({ post }) => {
  const [showComment, setShowCmment] = useState(false);
  const togleComment = () => setShowCmment(!showComment);
  return (
    <div className="flex flex-col flex-start gap-2 bg-white pb-2 mb-4 border rounded-lg">
      <div className="flex justify-between items-start gap-1 px-2 py-2 w-full mb-2">
        {/* ==Profile== */}
        <div className="flex justify-center gap-x-2">
          <Link href="#">
            <img
              alt="name"
              src={
                post?.author?.profileImage
                  ? post?.author?.profileImage
                  : userImag
              }
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <p>
              {post?.author?.name ? post?.author?.name : post?.author?.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <span>{moment(post?.createdAt).fromNow()}</span>
              <span>
                <BiWorld />
              </span>
            </p>
          </div>
        </div>
        {/* Dropdown menu of post edit / delete */}
        <div className="dropdown dropdown-end px-2">
          <label tabindex="0" className="rounded-full">
            <div className="text-md lg:text-2xl cursor-pointer px-2">
              <BsThreeDots />
            </div>
          </label>
          <ul
            tabindex="0"
            className="px-2  shadow menu menu-compact dropdown-content bg-base-100 w-28"
          >
            <li>
              <button>Edit</button>
            </li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        {/* Post card */}
        <PostCard title={post.content} images={post.images} />
        <div className="comment px-4 py-2">
          {/* Show Like/Comment/share */}
          <div className="flex justify-between">
            <Reaction reactions={post.reactions} commentNumber={post?.comments?.length}/>
          </div>
          {/*  Like/Comment/share button */}
          <div className="flex justify-center items-center border-y py-2 mt-2">
            <ReactionBtn
              post={post}
              postId={post.id}
              togleComment={togleComment}
              authorId={post.author.id}
            />
          </div>
          {/* Post Comment Option */}
          {showComment && <CommentInput postId={post.id} authorId={post.author.id}/>}
          {/* All Comment */}
          {showComment && post?.comments?.length > 0 && (
            <Comments postId={post?.id} comments={post?.comments} authorId={post.author.id}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
