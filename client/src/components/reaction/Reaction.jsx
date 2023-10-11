import React from "react";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
export default function Reaction() {
  return (
    <>
      <nav className="flex items-center text-sm text-gray-600 list-none">
        <span className="bg-blue-700 text-white p-1 rounded-full">
          <FaThumbsUp />
        </span>
        <span className="bg-red-700 text-white p-1 rounded-full">
          <FaHeart />
        </span>
        <span className="pl-1 text-lg">1.5k Johns and 5 othes</span>
      </nav>
      <div className="flex items-center gap-x-2 text-md text-gray-600">
        <p>12k Comments</p>
        <p>103 Shares</p>
      </div>
    </>
  );
}
