import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getAllUsersThunk,
  unFollowUser,
} from "../../apis/postThunk";
import { useEffect } from "react";
import { getMeThunk } from "../../../auth/apis/authThank";
import { useNavigate } from "react-router";
import { X } from "lucide-react";

export default function Followers() {
  const { allUsers } = useSelector((store) => store.postSlice);
  const { user } = useSelector((store) => store.authSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  const handleClick = async (id) => {
    await followUser(id);
    await dispatch(getMeThunk());
  };

  const handleClick2 = async (id) => {
    await unFollowUser(id);
    await dispatch(getMeThunk());
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee] px-4 py-8">
      <div className="mx-auto w-full max-w-[650px] overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#fffefa] shadow-[0_20px_70px_rgba(0,0,0,0.08)]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/30">
              Community
            </p>

            <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.045em] text-[#171717]">
              All Users
            </h1>

            <p className="mt-1 text-[10px] text-black/35">
              Connect with people on Vyro
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-black/[0.06] bg-[#f7f5ef] px-3 py-1.5 text-[10px] font-semibold text-black/45">
              {user?.followers} followers
            </div>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.07] bg-white text-black/45 transition hover:bg-[#171717] hover:text-white active:scale-95"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Users */}
        <div className="px-5 py-3">
          {allUsers?.map((User) => {
            return (
              <div
                key={User._id}
                className="group flex items-center justify-between border-b border-black/[0.055] px-2 py-4 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#171717] ring-2 ring-black/[0.04]">
                    <img
                      src={User.profilePic}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold text-[#171717]">
                      {User.name}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-black/35">
                      @{User.username}
                    </p>
                  </div>
                </div>

                {user?.followingUsers.find((u) => {
                  return u._id === User._id;
                }) ? (
                  <button
                    onClick={() => {
                      handleClick2(User._id);
                    }}
                    type="button"
                    className="ml-4 rounded-xl bg-[#171717] px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-black active:scale-95"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleClick(User._id);
                    }}
                    type="button"
                    className="ml-4 rounded-xl border border-black/[0.09] bg-white px-4 py-2.5 text-[10px] font-semibold text-[#171717] transition hover:border-black/20 hover:bg-[#f5f3ee] active:scale-95"
                  >
                    Follow
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}