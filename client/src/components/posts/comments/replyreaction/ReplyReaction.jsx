/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import reactionApi from "../../../../store/api/reactionApi";
import { addReplyReaction } from "../../../../store/slice/postSlice";

export default function ReplyReaction({ reply, postId, commentId, replyId }) {
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
          commentId: commentId,
          replyId: +replyId
        };
        const res = await reactionApi.replytReaction(data);
        if (res.status === 201) {
          dispatch(addReplyReaction({ postId, commentId, replyId, data: res.data }));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.info("please login");
    }
    setShowReaction(false);
  };

   const [rected, setReacted] = useState(false)
   const [type, setType] = useState(null)
   useEffect(() => {
        if (reply?.reactions && reply?.reactions?.length > 0 && userInfo) {
            const exists = reply?.reactions?.find((item) => item.userId === userInfo?.id);
            if (exists) {
                setReacted(true);
                setType(exists.reactionType)
            } else {
                setReacted(false);
            }
        } else {
            setReacted(false);
        }
    }, [reply, userInfo]);
  return (
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
        className="py-1 px-2 text-gray-800 rounded-md text-sm"
        onClick={toggleReaction}
      >
        {type === "like"
          ? "👍"
          : type === "love"
          ? "❤️"
          : type === "laugh"
          ? "😂"
          : "Like"}
      </button>
    </div>
  );
}
