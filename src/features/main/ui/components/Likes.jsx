import { X } from "lucide-react";

export default function Likes({ setOpen, likes }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-[#f5f3ee] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.07] px-6 py-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
              Engagement
            </p>

            <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.04em]">
              Likes
            </h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] transition hover:bg-black/[0.09]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Likes */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-4">

            {likes.map((like) => {
              return (
                <div
                  key={like._id}
                  className="flex items-center gap-3 rounded-[18px] bg-white px-4 py-3"
                >
                  <img
                    src={like.profilePic}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold">
                      {like.username}
                    </p>

                    <p className="mt-1 text-[10px] text-black/35">
                      Liked your post
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </aside>
    </div>
  );
}
