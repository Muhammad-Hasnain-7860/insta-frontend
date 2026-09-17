import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.authSlice);

  return (
    <div className="mb-7 border-b border-black/[0.08] pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user?.profilePic}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-[11px] font-semibold text-[#171717]">
              Create a post
            </p>
            <p className="mt-0.5 text-[9px] text-black/35">
              Share something with your network
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/home/create-post")}
          className="flex h-10 items-center gap-2 rounded-xl bg-[#171717] px-4 text-[10px] font-semibold text-white transition hover:bg-black active:scale-95"
        >
          <Plus size={15} />
          Create
        </button>
      </div>
    </div>
  );
}