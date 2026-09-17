import { Home, UserRound, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[100px]">
        <p className="mb-4 px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
          Menu
        </p>

        <nav className="space-y-1">
          <button
            onClick={() => navigate("/home")}
            className="flex w-full items-center gap-3 rounded-[14px] bg-[#171717] px-4 py-3 text-[12px] font-medium text-white"
          >
            <Home size={17} strokeWidth={1.8} />
            Home
          </button>

          <button
            onClick={() => navigate("/home/followers")}
            className="flex w-full items-center gap-3 rounded-[14px] px-4 py-3 text-[12px] text-black/50 transition hover:bg-black/[0.045] hover:text-black"
          >
            <Users size={17} strokeWidth={1.8} />
            Followers
          </button>

          <button
            onClick={() => navigate("/home/profile")}
            className="flex w-full items-center gap-3 rounded-[14px] px-4 py-3 text-[12px] text-black/50 transition hover:bg-black/[0.045] hover:text-black"
          >
            <UserRound size={17} strokeWidth={1.8} />
            Profile
          </button>
        </nav>

        <div className="mt-10 border-t border-black/[0.07] pt-7">
          <p className="px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
            Your profile
          </p>

          <button
            onClick={() => navigate("/home/profile")}
            className="mt-5 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-black/[0.04]"
          >
            <img
              src={user?.profilePic}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#171717]">
                {user?.name}
              </p>

              <p className="mt-0.5 truncate text-[10px] text-black/35">
                @{user?.username}
              </p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
