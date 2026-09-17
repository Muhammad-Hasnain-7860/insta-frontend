import { Bell, Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.authSlice);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f5f3ee]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1480px] items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#171717] text-sm font-bold text-white">
            V
          </div>

          <span className="text-[19px] font-bold tracking-[-0.07em]">
            VYRO
          </span>
        </button>

        {/* Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => navigate("/home")}
            className="rounded-full px-4 py-2 text-[12px] font-semibold text-[#171717] transition hover:bg-black/[0.05]"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/home/followers")}
            className="rounded-full px-4 py-2 text-[12px] font-medium text-black/40 transition hover:bg-black/[0.05] hover:text-black"
          >
            Followers
          </button>

          <button
            onClick={() => navigate("/home/profile")}
            className="rounded-full px-4 py-2 text-[12px] font-medium text-black/40 transition hover:bg-black/[0.05] hover:text-black"
          >
            Profile
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Create */}
          <button
            onClick={() => navigate("/home/create-post")}
            className="hidden h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-[11px] font-medium transition hover:bg-black hover:text-white sm:flex"
          >
            <Plus size={15} />
            Create
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/home/profile")}
            className="ml-1 h-10 w-10 overflow-hidden rounded-full border border-black/[0.08] transition hover:ring-2 hover:ring-black/10"
          >
            <img
              src={user?.profilePic}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>

        </div>
      </div>
    </header>
  );
}