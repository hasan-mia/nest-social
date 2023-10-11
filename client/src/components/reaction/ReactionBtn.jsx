/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";

const emojis = {
  like: "👍",
  love: "❤️",
  laugh: "😂",
};

export default function ReactionBtn() {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const toggleEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    toggleEmojis();
  };

  return (
    <div>
      <nav className="flex items-center gap-16 text-gray-600 list-none">
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={toggleEmojis}
        >
          <span className="text-xl">
            <FiThumbsUp />
          </span>
          <span className="text-md font-semibold">Like</span>
        </button>
        <button type="button" className="flex items-center gap-1">
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

      <div className="reaction-container">
        {showEmojis && (
          <div className="emoji-list">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className="emoji-option"
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
