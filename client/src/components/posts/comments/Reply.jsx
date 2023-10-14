import React, { useState } from "react";
import userImag from "../../../../src/assets/userImg.png";
import ReplytInput from "./ReplytInput";
import ReplyReaction from "./replyreaction/ReplyReaction";
export default function Reply({postId, commentId, authorId, reply}) {
  const [showReply, setShowReply] = useState(false);
  return (
    <>
    <li className="ml-5">
      <div className="flex gap-2 items-start">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={userImag} alt="avatar" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <div className="flex flex-col bg-gray-100 pt-1 pb-2 px-4 rounded-2xl">
            <p className="font-semibold text-sm">{reply?.user?.name || reply?.user?.email}</p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <span>
                {reply?.content}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ReplyReaction reply={reply} commentId={commentId} postId={postId} replyId={reply.id}/>
            <button
              type="button"
              className="py-1 px-2 text-gray-800 rounded-md text-sm"
              onClick={()=>setShowReply(!showReply)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </li>
    <li>{showReply && <ReplytInput authorId={authorId} postId={postId} commentId={commentId} replyId={reply.id}/>}</li>
    </>
  );
}
