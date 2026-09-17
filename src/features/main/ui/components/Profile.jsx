import {
  ArrowLeft,
  CalendarDays,
  Grid3X3,
  Heart,
  Link,
  MapPin,
  MoreHorizontal,
  Settings,
  Share2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteAndEditPost, getAllPostsThunk } from "../../apis/postThunk";
import { updatePostData } from "../../state/postSlice";
import { getMeThunk } from "../../../auth/apis/authThank";

export default function ProfilePage() {
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await deleteAndEditPost(id);
    await dispatch(getMeThunk())
  };

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171717]">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 border-b border-black/[0.06] bg-[#f5f3ee]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/[0.05]">
            <ArrowLeft
              onClick={() => navigate("/home")}
              size={19}
              strokeWidth={1.8}
            />
          </button>

          <div className="text-center">
            <p className="text-[13px] font-semibold tracking-[-0.02em]">
              {user?.email}
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-black/35">
              Profile
            </p>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/[0.05]">
            <MoreHorizontal size={20} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 pb-16 lg:px-8">
        {/* Profile Hero */}
        <section className="pt-10">
          <div className="relative overflow-hidden rounded-[30px] bg-[#171717] px-6 py-7 text-white sm:px-9 sm:py-9">
            {/* Decorative shapes */}
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/[0.08]" />
            <div className="absolute -bottom-32 left-[35%] h-72 w-72 rounded-full border border-white/[0.05]" />

            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-5">
                <img
                  src={user?.profilePic}
                  alt=""
                  className="h-24 w-24 rounded-[24px] border border-white/10 object-cover sm:h-28 sm:w-28"
                />

                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-[25px] font-semibold tracking-[-0.05em]">
                      {user?.name}
                    </h1>

                    <span className="rounded-full bg-white/10 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-white/60">
                      Creator
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-white/40">
                    {user?.email}
                  </p>

                  <p className="mt-4 max-w-[440px] text-[13px] leading-6 text-white/65">
                    {user?.bio ? user?.bio : "your bio"}
                  </p>
                </div>
              </div>

           
            </div>

            <div className="relative mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.08] pt-6">
              <div>
                <p className="text-[18px] font-semibold tracking-[-0.04em]">
                  {user?.posts?.length}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Posts
                </p>
              </div>

              <div>
                <p className="text-[18px] font-semibold tracking-[-0.04em]">
                  {user?.followers}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Followers
                </p>
              </div>

              <div>
                <p className="text-[18px] font-semibold tracking-[-0.04em]">
                  {user?.following}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/30">
                  Following
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Details */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[26px] min-h-[100px] max-h-[150px] border border-black/[0.06] bg-white/60 p-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                About
              </p>

              <Settings size={15} className="text-black/35" />
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-3">
                <Link size={16} strokeWidth={1.7} className="text-black/35" />
                <div>
                  <p className="text-[11px] font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays
                  size={16}
                  strokeWidth={1.7}
                  className="text-black/35"
                />
                <div>
                  <p className="mt-0.5 text-[9px] text-black/35">On VYRO</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Posts */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold tracking-[-0.02em]">
                  Posts
                </p>
                <p className="mt-1 text-[9px] text-black/35">
                  Latest from Hasnain
                </p>
              </div>

              <button className="flex h-9 items-center gap-2 rounded-full bg-black/[0.05] px-4 text-[10px] font-medium">
                <Grid3X3 size={14} />
                Grid
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {user?.posts?.map((post) => {
                return (
                  <div className="group relative aspect-square overflow-hidden rounded-[20px] bg-black">
                    {post?.images?.map((img) => {
                      return (
                        <img
                          src={img.url}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      );
                    })}

                    {/* Edit + Delete */}
                    <div className="absolute right-3 top-3 flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          dispatch(updatePostData({ ...post }));
                          navigate("/home/create-post");
                        }}
                        className="rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-medium text-black backdrop-blur-md transition hover:bg-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="rounded-lg bg-red-500/90 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md transition hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Likes */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-white">
                      <span className="flex items-center gap-1 text-[9px]">
                        <Heart size={12} fill="currentColor" />
                        {post?.likes}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
