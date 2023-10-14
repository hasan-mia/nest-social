import React, { useState } from "react";
import userImag from "../../../../src/assets/userImg.png";
import Replies from "./Replies";
import CommentReaction from "./commentreaction/CommentReaction";
export default function Comments({ postId, authorId, comment }) {
  const [show, setShwo] = useState(false);
  const showReplyHandler = () => {
    setShwo(!show);
  };
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
            <p className="font-semibold text-sm">
              {comment?.user?.name || comment?.user?.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <span>{comment.content}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CommentReaction comment={comment} postId={postId} commentId={comment.id}/>
            <button
              type="button"
              className="py-1 px-2 text-gray-800 rounded-md text-sm"
              onClick={showReplyHandler}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      <Replies
        replies={comment.replies}
        commentId={comment.id}
        postId={postId}
        authorId={authorId}
        show={show}
        setShwo={setShwo}
      />
    </li>
  );
}
