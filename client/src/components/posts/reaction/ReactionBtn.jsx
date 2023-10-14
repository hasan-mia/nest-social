/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import reactionApi from "../../../store/api/reactionApi";
import { addReaction } from "../../../store/slice/postSlice";

export default function ReactionBtn({ post, postId, togleComment }) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showReaction, setShowReaction] = useState(false);
  // toogle handle
  const toggleReaction = () => {
    setShowReaction(!showReaction);
  };

  // reaaction handle
  const handleReaction = async (e, value) => {
    e.preventDefault();
    if (userInfo) {
      try {
        const data = {
          postId: +postId,
          userId: userInfo.id,
          reactionType: value,
        };
        const res = await reactionApi.postReaction(data);
        if (res.status === 201) {
          dispatch(addReaction({ postId, data: res.data }));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.info("please login");
    }
    setShowReaction(false);
  };
  const [rected, setReacted] = useState(false);
  const [type, setType] = useState(null);
  useEffect(() => {
    if (post?.reactions && post?.reactions?.length > 0 && userInfo) {
      const exists = post?.reactions?.find(
        (item) => item.userId === userInfo?.id,
      );
      if (exists) {
        setReacted(true);
        setType(exists.reactionType);
      } else {
        setReacted(false);
      }
    } else {
      setReacted(false);
    }
  }, [post, userInfo]);
  return (
    <div>
      <nav className="flex items-center gap-16 text-gray-600 list-none">
        <div className="relative">
          {showReaction && (
            <div className="absolute z-10 bottom-10 bg-white space-x-2">
              <div className="flex">
                <button
                  type="button"
                  className="p-1 m-1 text-lg rounded-full border"
                  onClick={(e) => handleReaction(e, "like")}
                >
                  👍
                </button>
                <button
                  type="button"
                  className="p-1 m-1 text-lg rounded-full border"
                  onClick={(e) => handleReaction(e, "love")}
                >
                  ❤️
                </button>
                <button
                  type="button"
                  className="p-1 m-1 text-lg rounded-full border"
                  onClick={(e) => handleReaction(e, "laugh")}
                >
                  😂
                </button>
              </div>
            </div>
          )}
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={toggleReaction}
          >
            <span className="text-xl">
              {type === "like" ? (
                "👍"
              ) : type === "love" ? (
                "❤️"
              ) : type === "laugh" ? (
                "😂"
              ) : (
                <FiThumbsUp />
              )}
            </span>
            <span className="text-md font-semibold">Like</span>
          </button>
        </div>
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={togleComment}
        >
          <span className="text-xl">
            <GoComment />
          </span>
          <span className="text-md font-semibold">Comments</span>
        </button>
        <button type="button" className="flex items-center gap-1">
          <span className="text-xl">
            <RiShareForwardLine />
          </span>
          <span className="text-md font-semibold">Share</span>{" "}
        </button>
      </nav>
    </div>
  );
}
