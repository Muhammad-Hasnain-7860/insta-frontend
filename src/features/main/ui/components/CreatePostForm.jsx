import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../../auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { updatePostData } from "../../state/postSlice";

export default function CreatePostForm() {
  const { handleSubmit, handlePost, errors, register, navigate } = useAuth();

  const [showImg, setShowImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  let [existingImages, setExistingImages] = useState(false);
  const { user } = useSelector((store) => store.authSlice);
  const { postUpdateData } = useSelector((store) => store.postSlice);
  const { isLoading } = useSelector((store) => store.postSlice);
  const dispatch = useDispatch()

  useEffect(() => {
    if (postUpdateData) {
      setShowImages([...postUpdateData.images]);
      setExistingImages([...postUpdateData.images]);
    }
  }, []);

  const handleChange = (e) => {
    if (showImg.length >= 3) {
      return toast.error("You can only upload up to 3 images.");
    }
    const files = e.target.files[0];
    const url = URL.createObjectURL(files);
    const Nanoid = nanoid();
    const obj = { url, id: Nanoid };
    showImg.push(obj);
    setShowImages([...showImg]);
    files.id = obj.id;
    setSelectedImages([...selectedImages, files]);
  };

  const handleReplace = (e, id) => {
    const files = e.target.files[0];
    const foundImg = showImg.findIndex((img) => {
      return img.id === id;
    });

    const Nanoid = nanoid();
    const url = URL.createObjectURL(files);
    const obj = {
      url,
      id: Nanoid,
    };

    showImg[foundImg] = obj;
    setShowImages([...showImg]);

    const foundSelectImg = selectedImages.findIndex((img) => {
      return img.id === id;
    });

    files.id = obj.id;
    if (foundSelectImg === -1) {
      selectedImages.push(files);
    } else {
      selectedImages[foundSelectImg] = files;
    }

    setSelectedImages([...selectedImages]);

    if (postUpdateData) {
      const existingImageCheck = existingImages.filter((img) => {
        return img.id !== id;
      });

      if (existingImageCheck) {
        setExistingImages(existingImageCheck);
      }
    }
  };

  const handleDelete = (id) => {
    const updatedData = showImg.filter((img) => {
      return img.id !== id;
    });

    const updateSelectData = selectedImages.filter((img) => {
      return img.id !== id;
    });

    if (postUpdateData) {
      const existingImagesFound = existingImages.filter((img) => {
        return img.id !== id;
      });

      setExistingImages(existingImagesFound);
    }

    setShowImages(updatedData);
    setSelectedImages(updateSelectData);
  };

  return (
    <div className="relative min-h-[100vh] max-h-[110vh] inset-0 z-50 flex items-center justify-center bg-black/10 px-4 backdrop-blur-[2px]">
      {/* Modal */}
      <div className="relative w-full max-w-[540px]  rounded-[24px] border border-black/[0.08] bg-[#faf9f6] shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.07] px-6 py-4.5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
              Create
            </p>

            <h2 className="mt-0.5 text-lg font-semibold tracking-[-0.04em] text-[#171717]">
              Create a post
            </h2>
          </div>

          <button
            onClick={() => {
              navigate("/home");
              dispatch(updatePostData(null))
            }}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-sm text-black/40 transition hover:bg-black/[0.08] hover:text-black"
          >
            ×
          </button>
        </div>

        {/* User */}
        <div className="px-6 pt-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#171717]">
              <img
                src={user?.profilePic}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[-0.02em]">
                {user?.name}
              </p>

              <p className="mt-0.5 text-[9px] text-black/35">Public</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-4">
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters.",
              },
            })}
            placeholder="What's on your mind?"
            className={`min-h-[135px] w-full resize-none bg-transparent text-[20px] font-medium leading-[1.4] tracking-[-0.035em] text-[#171717] outline-none placeholder:text-black/20 ${
              errors.description ? "placeholder:text-red-400" : ""
            }`}
          />

          {errors.description && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.description.message}
            </p>
          )}

          {/* Images */}
          <div
            className={`relative mt-3 overflow-hidden rounded-[18px] border bg-white ${
              errors.images ? "border-red-400" : "border-black/12"
            }`}
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              {showImg.map((img) => {
                return (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#f4f2ed]">
                    <input
                      onChange={(e) => handleReplace(e, img.id)}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />

                    <img
                      src={img.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />

                    <button
                      onClick={() => handleDelete(img.id)}
                      type="button"
                      className="absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-[15px] leading-none text-white backdrop-blur-sm transition hover:bg-red-500"
                    >
                      ×
                    </button>
                  </div>
                );
              })}

              {/* Add Photo */}
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[14px] border border-dashed border-black/10 bg-[#faf9f6] transition hover:border-black/20">
                <input
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />

                <div className="pointer-events-none text-center">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1efe9] text-lg text-black/40">
                    +
                  </div>

                  <p className="text-[10px] font-semibold text-black/45">
                    Add photo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showImg.length === 0 && (
            <p className="mt-1.5 text-[10px] font-medium text-red-500">
              Please select at least one image.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-black/[0.07] px-6 py-4">
          <p className="text-[9px] text-black/25">Visible to everyone</p>

          <button
            onClick={handleSubmit((data) => {
              if (postUpdateData) {
                handlePost(
                  data,
                  selectedImages,
                  existingImages,
                  postUpdateData._id,
                );
              } else {
                handlePost(data, selectedImages);
              }
            })}
            type="button"
            disabled={isLoading}
            className="h-10 rounded-xl bg-[#171717] px-6 text-[11px] font-semibold text-white transition hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
