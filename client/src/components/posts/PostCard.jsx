import React from "react";
export default function PostCard({title, images}) {
  return (
    <article>
      <div className="px-4 py-0">
        <h1>
          {title}
        </h1>
      </div>
      {
        images?.length > 0 ? (
           images?.map(image=>(
            <div className="w-full">
              <img alt="name" src={image} className="w-full" />
          </div>
           ))
        ): null
      }
     
    </article>
  );
}
