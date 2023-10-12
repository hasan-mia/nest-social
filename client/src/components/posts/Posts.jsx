import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/slice/postSlice";
import Post from "./Post";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, currentPage, nextPage } = useSelector((state) => state.post);
  
  const getScrollPosition = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop + clientHeight + 100 >= scrollHeight);
    if (scrollTop + clientHeight +100 >= scrollHeight && nextPage) {
        dispatch(setPosts(data));
    }
  }, [dispatch, data, nextPage]);


   useEffect(() => {
    window.addEventListener('scroll', getScrollPosition);
    if (posts.length <= 0) {
    }
    return () => {
        window.removeEventListener('scroll', getScrollPosition);
    };
}, [dispatch, data, posts, status, getScrollPosition]);



	console.log(posts, currentPage, nextPage);
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
