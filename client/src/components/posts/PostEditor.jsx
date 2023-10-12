import React, { useEffect, useRef, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import userImag from "../../assets/userImg.png";
import PostModal from "./PostModal";

const PostEditor = () => {
  // Publish Post Modal
  const modalRef = useRef(null);
  const openModal = () => {
    modalRef.current.showModal();
  };
  const closeModal = () => {
    modalRef.current.close();
  };

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const handleImage = (e) => {
    if (e.target.files.length <= 5) {
      setImages([...e.target.files]);
    } else {
      console.log("You can't upload more than 5");
      setImages([]);
    }
  };

  // handle storing post
  const handlePublishPost = async (e) => {
    e.preventDefault();
    // if (userInfo) {
    //     const formData = new FormData();
    //         images.forEach((file) => {
    //             formData.append(`images[]`, file);
    //         });
    //         formData.append('text', title);
    //         // const res = await postApi.createPost(formData);

    //         // if (res.status === 201) {
    //         //     closeModal()
    //         //     setImages([]);
    //         //     setContent('');
    //         //     // dispatch(postApi.getAllPost(`${url.getAllPost}?limit=5`));
    //         // }
    // } else {
    //     setLoginOpen(true);
    // }
  };
  useEffect(() => {
    if (images) {
      setPreviewUrls(images?.map((file) => URL.createObjectURL(file)));
    }
  }, [images]);
  return (
    <>
      <div className="py-2 mt-6 bg-white border rounded-md">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex items-center gap-1 px-2 py-2 w-full mb-2">
            <Link to="/">
              <img
                alt="name"
                src={userImag}
                className="w-10 h-10 rounded-full"
              />
            </Link>
            <button
              className="flex w-full px-2"
              type="button"
              onClick={openModal}
            >
              <input
                type="text"
                placeholder="What's your mind?"
                className="py-4 bg-gray-100 w-full rounded-3xl px-2 active:border-none active:shadow-none outline-none"
              />
            </button>
          </div>

          <div className="flex justify-between items-center gap-2 px-8">
            <button
              className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 hover:rounded"
              type="button"
              onClick={openModal}
            >
              <FaVideo className="lg:text-3xl text-red-500" />
              <span className="lg:text-md font-semibold">video</span>
            </button>
            <button
              className="py-2 px-4 flex items-center gap-2 hover:bg-gray-100 hover:rounded"
              type="button"
              onClick={openModal}
            >
              <MdPhotoLibrary className="lg:text-3xl text-green-300" />
              <span className="lg:text-md font-semibold">Photo</span>
            </button>
          </div>
        </div>
      </div>
      <PostModal
        onClose={closeModal}
        modalRef={modalRef}
        handleImage={handleImage}
        previewUrls={previewUrls}
        content={content}
        setContent={setContent}
        handlePublishPost={handlePublishPost}
      />
    </>
  );
};

export default PostEditor;
