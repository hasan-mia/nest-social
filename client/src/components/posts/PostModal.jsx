import React from "react";

export default function PostModal({
  onClose,
  modalRef,
  handleImage,
  previewUrls,
  content,
  setContent,
  handlePublishPost,
}) {
  return (
    <dialog id="my_modal_3" className="modal" ref={modalRef}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </form>
        <div className="grid grid-cols-1">
          <textarea
            as="textarea"
            placeholder="What's your mind?"
            className="py-4 px-2 my-3 border rounded-xl active:shadow-none outline-none"
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-col md:flex-row justify-between mt-1 gap-y-2 md:gap-0">
            <input type="file"
              multiple
              onChange={handleImage}
              className="file-input file-input-bordered file-input-primary w-6/12 max-w-xs md-0 lg:mb-5" />

            <div className="flex md:flex-row">
              {previewUrls.map((url) => (
                <img
                  key={Math.random()}
                  src={url}
                  alt="Preview"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    margin: "2px",
                    border: "2px solid rgb(228 228 228)",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                />
              ))}
            </div>

            <div className="md:pl-3">
              <button
                type="button"
                className="py-3 px-4 text-white bg-primary rounded-md border fw-semibold"
                onClick={handlePublishPost}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
