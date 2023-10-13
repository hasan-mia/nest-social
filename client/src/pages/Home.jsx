import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loader/Loading";
import PostLoader from "../components/loader/PostLoader";
import PostEditor from "../components/posts/PostEditor";
import Posts from "../components/posts/Posts";
import postApi from "../store/api/postApi";
import url from "../store/config/url";

const Home = () => {
  const { posts, isLoading, nextPage } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const getScrollPosition = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight + 100 >= scrollHeight && nextPage) {
      dispatch(postApi.getAllPost(nextPage));
    }
  }, [nextPage, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", getScrollPosition);
    if (!posts) {
      dispatch(postApi.getAllPost(`${url.getAllPost}?limit=2`));
    }
    return () => {
      window.removeEventListener("scroll", getScrollPosition);
    };
  }, [posts, dispatch, getScrollPosition]);
  
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
        <div className="w-12/12 lg:w-4/12"></div>
        <div className="w-12/12 lg:w-5/12">
          {/* post editor */}
          <PostEditor />
          {isLoading || posts?.length <= 0 ? (
            <PostLoader />
          ) : (
            <Posts posts={posts} />
          )}
          {isLoading || posts?.length > 0 ? (
            <Loading />
          ) : (
            <Posts posts={posts} />
          )}
        </div>
        <div className="w-12/12 lg:w-4/12"></div>
      </div>
    </div>
  );
};

export default Home;
