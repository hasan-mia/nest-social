import React from "react";
import domingo from "../../assets/domingo.jpg";
export default function PostCard() {
  return (
    <article>
      <div className="px-4 py-0">
        <h1>
          টি-টোয়েন্টি থেকে দেয়া হয়েছে বিশ্রাম; দায়িত্ব পালন করবেন ওয়ানডে এবং
          টেস্টে, চোখ রাখবেন ঘরোয়া ক্রিকেটে....
        </h1>
      </div>
      <div className="w-full">
        <img alt="name" src={domingo} className="w-full" />
      </div>
    </article>
  );
}
