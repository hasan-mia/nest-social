import React from "react";
export default function Reaction({ reactions, commentNumber }) {
  const likeReact = reactions.filter((like) => like.reactionType === "like");
  const loveReact = reactions.filter((love) => love.reactionType === "love");
  const laughReact = reactions.filter(
    (laugh) => laugh.reactionType === "laugh",
  );
  return (
    <>
      <nav className="flex items-center text-sm text-gray-600 list-none">
        <span className="rounded-full">
          {likeReact.length > 0 && "👍"}
          {loveReact.length > 0 && "❤️"}
          {laughReact.length > 0 && "😂"}
        </span>
        <span className="pl-1 text-lg">
          {reactions.length > 1
            ? `${reactions.length} Reacts`
            : `${reactions.length} React`}
        </span>
      </nav>
      <div className="flex items-center gap-x-2 text-md text-gray-600">
        <p> {commentNumber > 1 ? `${commentNumber} Comments` : `${commentNumber} Comment`}</p>
        <p>{commentNumber} Shares</p>
      </div>
    </>
  );
}
