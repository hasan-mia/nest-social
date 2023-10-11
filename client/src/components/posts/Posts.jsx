import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <div className="py-2 my-4 rounded-xl">
      <h2 className="border-b p-2 bg-white">Suggested for you</h2>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
