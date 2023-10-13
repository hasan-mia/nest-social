import React from "react";
import Post from "./Post";

const Posts = ({posts}) => {
  
  return (
    <div className="py-2 my-4 rounded-xl">
      {
        posts?.map(post=><Post key={Math.random()} post={post}/>)
      }
    </div>
  );
};

export default Posts;
