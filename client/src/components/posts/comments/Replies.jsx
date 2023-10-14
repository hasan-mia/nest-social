import React from "react";
import ReplytInput from "../comments/ReplytInput";
import Reply from "./Reply";
export default function Replies({replies, commentId, postId, authorId, show, setShwo }) {
  return (
    <ul>
      <li>{show && <ReplytInput postId={postId} commentId={commentId} authorId={authorId}/>}</li>
      {replies?.map((reply) => (
        <Reply key={Math.random()} reply={reply} postId={postId} commentId={commentId} authorId={authorId} />
      ))}
    </ul>
  );
}
