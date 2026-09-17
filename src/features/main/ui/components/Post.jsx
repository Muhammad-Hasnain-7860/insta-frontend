import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { getAllPostsThunk, postLike } from "../../apis/postThunk";
import { useState } from "react";
import Comments from "./Comments";

export default function Post({ post }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleClick = async (data) => {
    await postLike(data);
    await dispatch(getAllPostsThunk());
  };

  return (
    <article className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post?.user?.profilePic}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <p className="text-[12px] font-semibold">{post?.user?.name}</p>

              <span className="text-[10px] text-black/30">
                {post?.user?.username}
              </span>
            </div>

            <p className="mt-0.5 text-[9px] text-black/35">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        
      </div>

      <div className="mb-4">
        <p className="text-[15px] leading-7 tracking-[-0.01em] text-black/80">
          {post?.description}
        </p>
      </div>

      {/* Images */}
      <div className="group relative mb-1 overflow-hidden rounded-[24px] bg-black">
        <div
          className={`grid gap-1 ${
            post?.images?.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post?.images?.map((img, index) => (
            <div
              key={img?._id || index}
              className={`relative overflow-hidden ${
                post?.images?.length === 3 && index === 0 ? "row-span-2" : ""
              }`}
            >
              <img
                src={img?.url}
                alt=""
                className="h-[400px] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Actions */}

      {open && (
        <Comments
          setOpen={setOpen}
          comments={post.totalComments}
          postId={post._id}
        />
      )}

      <div className="flex items-center justify-between border-b border-black/[0.07] py-3">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 rounded-full px-3 py-2 text-black/50 hover:bg-black/[0.05] hover:text-black">
            <Heart
              onClick={() => {
                handleClick(post._id);
              }}
              size={18}
              strokeWidth={1.7}
            />

            <span className="text-[10px]">{post?.likes}</span>
          </button>

          <button className="flex items-center gap-2 rounded-full px-3 py-2 text-black/50 hover:bg-black/[0.05] hover:text-black">
            <MessageCircle size={18} strokeWidth={1.7} />

            <span
              onClick={() => setOpen((prev) => !prev)}
              className="text-[10px]"
            >
              {post?.comment}
            </span>
          </button>
        </div>


       
      </div>
    </article>
  );
}
