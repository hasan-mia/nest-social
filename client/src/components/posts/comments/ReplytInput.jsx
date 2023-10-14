import React, { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userImag from "../../../../src/assets/userImg.png";
import notificationApi from "../../../store/api/notificationApi";
import postApi from "../../../store/api/postApi";
import { updateComment } from "../../../store/slice/postSlice";

export default function ReplytInput({ commentId, postId, authorId, replyId }) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const data = {
    postId: +postId,
    userId: +userInfo.id,
    content: content,
    commentId: +commentId,
  };
   const notification = {
    notificationType: "new_reply",
    postId : +postId,
    userId: +authorId,
    commentId: commentId,
    replyId: replyId || null,
    isRead:false,
  }
  const submitReply = async (e) => {
    e.preventDefault();
    if (userInfo) {
      try {
        const res = await postApi.createReply(data);
        if (res.status === 201) {
          dispatch(updateComment({ postId, data: res.data.data.comments }));
          setContent("");
          await notificationApi.createNotification(notification);
        }
        if (res.status === 400) {
          setContent("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("Please login");
    }
  };
  return (
    <div className="flex items-center gap-1px-2 py-2 w-full mt-2 ml-5">
      <Link to="/">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={userImag} alt="avatar" />
          </div>
        </div>
      </Link>
      <form className="flex w-full px-2" onSubmit={submitReply}>
        <input
          type="text"
          value={content}
          placeholder="Write a comment..."
          className="py-2 px-2 bg-gray-100 w-11/12 rounded-2xl active:border-none active:shadow-none outline-none"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="hover:text-blue-600">
          <BiPaperPlane size={28} />
        </button>
      </form>
    </div>
  );
}
