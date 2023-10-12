import React from "react";
import Post from "./Post";

const Posts = ({posts}) => {
  
  return (
    <div className="py-2 my-4 rounded-xl">
      <h2 className="border-b p-2 bg-white">Suggested for you</h2>
      {
        posts?.map(post=><Post post={post}/>)
      }
    </div>
  );
};

export default Posts;
