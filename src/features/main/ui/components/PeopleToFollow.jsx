import { Check, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { followUser } from "../../apis/postThunk";
import { getMeThunk } from "../../../auth/apis/authThank";
export default function PeopleToFollow() {
  const { allUsers } = useSelector((store) => store.postSlice);
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();

  const dispatch = useDispatch()

  let users = [];

  if (allUsers.length > 4) {
    for (let i = 0; i < 4; i++) {
      const user = allUsers[i];
      users.push({ ...user });
    }
  } else {
    users = [...allUsers];
  }

  const handleClick = async (id) => {
    await followUser(id);
    await dispatch(getMeThunk(id));
  };

  return (
    <section className="border-b border-black/[0.08] pb-7">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
            Network
          </p>

          <h2 className="text-[22px] font-semibold tracking-[-0.05em]">
            People to follow
          </h2>
        </div>

        <button
          onClick={() => navigate("/followers")}
          className="text-[10px] font-medium text-black/40 hover:text-black"
        >
          View all
        </button>
      </div>

      {users.map((User) => {
        return (
          <div className="flex items-center justify-between border-t border-black/[0.06] py-4">
            <div className="flex items-center gap-3">
              <img
                src={User.profilePic}
                alt=""
                className="h-11 w-11 rounded-full object-cover"
              />

              <div>
                <p className="text-[12px] font-semibold">{User.name}</p>
                <p className="mt-0.5 text-[9px] text-black/40">
                  {User.bio ? User.bio : User.username}
                </p>
              </div>
            </div>

            {user?.followingUsers.find((followingUser) => {
              return followingUser._id === User._id;
            }) ? (
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black text-white">
                <Check size={15} />
              </button>
            ) : (
              <button onClick={()=>{
                handleClick(User._id)
              }} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-black hover:text-white">
                <Plus size={15} />
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
}
