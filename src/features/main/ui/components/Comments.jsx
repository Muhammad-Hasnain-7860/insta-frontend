import { Heart, Send, X, ArrowLeft } from "lucide-react";
import {
  commentReplayDelete,
  commentReplayEdit,
  getAllPostsThunk,
  postComment,
} from "../../apis/postThunk";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Comments({ setOpen, comments, postId }) {
  const dispatch = useDispatch();
  const inpRef = useRef(null);
  const [replayCheck, setReplayCheck] = useState(false);
  const { user } = useSelector((store) => store.authSlice);
  const [checkUpdate, setCheckUpdate] = useState(false);

  const handleSend = async (id) => {
    const val = inpRef.current?.value;

    if (!val) {
      return toast.error('value is Required')
    };

    if (checkUpdate && checkUpdate.replay) {
      await commentReplayEdit(
        id,
        checkUpdate.parentId,
        val,
        checkUpdate.commentId,
      );
      await dispatch(getAllPostsThunk());
      setCheckUpdate(false);
      inpRef.current.value = "";
      return;
    }

    if (checkUpdate) {
      await commentReplayEdit(id, checkUpdate.commentId, val);
      await dispatch(getAllPostsThunk());
      setCheckUpdate(false);
      inpRef.current.value = "";
      return;
    }

    if (replayCheck) {
      await postComment(id, val, replayCheck.commentId);
      setReplayCheck(false);
      inpRef.current.value = "";
    } else {
      await postComment(id, val);
      inpRef.current.value = "";
    }

    await dispatch(getAllPostsThunk());
  };

  const handleDelete = async (id, comment) => {
    if (comment.userId.toString() !== user._id.toString()) {
      return toast.error("You are not authorized to delete this comment.");
    }

    if (comment.replay) {
      await commentReplayDelete(id, comment.parentId, comment.commentId);
    } else {
      await commentReplayDelete(id, comment.commentId);
    }

    await dispatch(getAllPostsThunk());
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-[#f5f3ee] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/[0.07] px-6 py-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] transition hover:bg-black/[0.09]"
            >
              <ArrowLeft size={17} />
            </button>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
                Discussion
              </p>

              <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.04em]">
                Comments
              </h2>
            </div>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] transition hover:bg-black/[0.09]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-7">
            {comments.map((comment) => {
              return (
                <div>
                  <div className="flex gap-3">
                    <img
                      src={comment.profilePic}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      {comment.replay && (
                        <div className="mb-2 ml-1 flex items-center gap-1.5 text-[9px] text-black/35">
                          <span className="font-medium">↳ Replied to</span>

                          <span className="font-semibold text-black/50">
                            {comments.find((c) => {
                              return c.commentId === comment.parentId;
                            })
                              ? `replied to ${comment.commentOwnerReplay}`
                              : `replied to Deleted ${comment.commentOwnerReplay}`}
                          </span>

                          <span className="text-black/20">·</span>

                          <span>
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="rounded-[18px] bg-white px-4 py-3">
                        <p className="text-[11px] font-semibold">
                          {comment.username}
                        </p>

                        <p className="mt-1 text-[12px] leading-5 text-black/65">
                          {comment.comment}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between px-2">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              setReplayCheck({
                                commentId: comment.commentId,
                                username: comment.username,
                              });
                            }}
                            className="text-[9px] font-medium text-black/35 transition hover:text-black"
                          >
                            Reply
                          </button>

                          <span className="text-[9px] text-black/25">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              inpRef.current.value = comment.comment;
                              setCheckUpdate(comment);
                            }}
                            className="rounded-md px-2 py-1 text-[9px] font-medium text-black/35 transition hover:bg-black/5 hover:text-black"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              handleDelete(postId, comment);
                            }}
                            className="rounded-md px-2 py-1 text-[9px] font-medium text-red-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-black/[0.07] bg-[#f5f3ee] p-4">
          <div className="flex items-center gap-3 rounded-[18px] bg-white px-4 py-2">
            {replayCheck && (
              <span className="px-1 text-[9px] font-medium text-black/35">
                Replying to {replayCheck.username}
              </span>
            )}

            <input
              ref={inpRef}
              type="text"
              placeholder={
                replayCheck ? "Write a reply..." : "Write a comment..."
              }
              className={`h-10 min-w-0 flex-1 rounded-xl bg-transparent px-3 text-[12px] outline-none ${
                replayCheck
                  ? "border border-black/[0.08] placeholder:text-black/35"
                  : "placeholder:text-black/30"
              }`}
            />

            <button
              onClick={() => {
                handleSend(postId);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#171717] text-white transition hover:bg-black"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
