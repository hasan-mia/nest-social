import React from "react";
import Comment from "./Comment";
export default function Comments({postId, authorId, comments }) {
  return (
    <nav className="flex flex-col bg-transparent gap-2 mt-2 max-h-96 overflow-y-scroll overflow-x-hidden">
      <ul>
        {comments?.map((comment) => (
          <Comment key={Math.random()} postId={postId} authorId={authorId} comment={comment}/>
        ))}
      </ul>
    </nav>
  );
}
