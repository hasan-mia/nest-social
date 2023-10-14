import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loader/Loading";
import PostLoader from "../components/loader/PostLoader";
import Post from "../components/posts/Post";
import PostEditor from "../components/posts/PostEditor";
import postApi from "../store/api/postApi";
import url from "../store/config/url";

const Home = () => {
  const { posts, isLoading, scrollLoading, nextPageUrl } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  // scroll handling
  const getScrollPosition = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 100 >= scrollHeight && nextPageUrl) {
      dispatch(postApi.getAllScrollPost(`${nextPageUrl}`));
    }
  }, [nextPageUrl, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", getScrollPosition);
    if (posts.length === 0) {
      dispatch(postApi.getAllScrollPost(`${url.getAllPost}?limit=2`));
    }
    return () => {
      window.removeEventListener("scroll", getScrollPosition);
    };
  }, [posts, dispatch, getScrollPosition]);
  
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
        <div className="w-full md:w-4/12"></div>
        <div className="w-full md:w-6/12">
          {/* post editor */}
          <PostEditor />
          {/* All Post */}
          <div className="py-2 my-4 rounded-xl">
            {posts.length > 0 && posts.map(post=><Post post={post} />) }
          </div>
          {isLoading && posts?.length === 0 && nextPageUrl && <PostLoader />}
          {scrollLoading && posts?.length > 0 && nextPageUrl && <Loading />}
        </div>
        <div className="w-full md:w-4/12"></div>
      </div>
    </div>
  );
};

export default Home;
