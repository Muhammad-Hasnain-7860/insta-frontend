import useAuth from "../../hooks/useAuth";

export default function Register() {
  const {
    register,
    handleRegister,
    errors,
    navigate,
    handleSubmit,
    isLoading,
  } = useAuth();

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 py-4 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)] lg:grid-cols-2">
          {/* Left */}
          <div className="relative hidden min-h-[680px] overflow-hidden bg-[#171717] p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.25em] text-white/40">
                VYRO / 26
              </p>

              <h1 className="mt-16 max-w-md text-6xl font-semibold leading-[0.92] tracking-[-0.06em]">
                Share what feels
                <br />
                <span className="text-white/25">real.</span>
              </h1>
            </div>

            <div className="flex items-end justify-between">
              <p className="max-w-[220px] text-xs leading-5 text-white/40">
                A space for people, ideas and moments worth sharing.
              </p>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-lg">
                ↗
              </div>
            </div>

            <div className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full border-[45px] border-white/[0.04]" />
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/[0.025]" />
          </div>

          {/* Right */}
          <div className="flex min-h-[680px] items-center px-7 py-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-md">
              <div className="mb-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-sm font-bold text-white">
                  V
                </div>

                <p className="mb-2 text-[11px] font-medium tracking-[0.18em] text-black/35">
                  CREATE ACCOUNT
                </p>

                <h2 className="text-4xl font-semibold tracking-[-0.05em]">
                  Welcome in.
                </h2>

                <p className="mt-2 text-sm text-black/40">
                  Create your profile and start sharing.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-3.5"
              >
                <div className="grid grid-cols-2 gap-3">
                  <input
                    {...register("name", {
                      required: "Name is Required",
                      minLength: {
                        value: 3,
                        message: "Minium 3 character are Required",
                      },
                    })}
                    type="text"
                    placeholder="Full name"
                    className="h-12 w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-4 text-sm outline-none placeholder:text-black/25 focus:border-black/30"
                  />

                  {errors.name && (
                    <p className="mb-4 rounded-xl border border-red-500/15 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                      {errors.name.message}
                    </p>
                  )}

                  <input
                    {...register("username", {
                      required: "username is Required",
                      minLength: {
                        value: 3,
                        message: "Minium 3 character are Required",
                      },
                    })}
                    type="text"
                    placeholder="@username"
                    className="h-12 w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-4 text-sm outline-none placeholder:text-black/25 focus:border-black/30"
                  />

                  {errors.username && (
                    <p className="mb-4 rounded-xl border border-red-500/15 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <input
                  {...register("email", {
                    required: "email is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid Email",
                    },
                  })}
                  type="email"
                  placeholder="Email address"
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-4 text-sm outline-none placeholder:text-black/25 focus:border-black/30"
                />

                {errors.email && (
                  <p className="mb-4 rounded-xl border border-red-500/15 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                    {errors.email.message}
                  </p>
                )}

                <input
                  {...register("password", {
                    required: "password is Required",
                    minLength: {
                      value: 6,
                      message: "minium 6 character are Required",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#f8f7f4] px-4 text-sm outline-none placeholder:text-black/25 focus:border-black/30"
                />

                {errors.password && (
                  <p className="mb-4 rounded-xl border border-red-500/15 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                    {errors.password.message}
                  </p>
                )}

                <div className="relative">
                  <input
                    {...register("profilePic", {
                      required: "ProfilePic is Required",
                    })}
                    type="file"
                    accept="image/*"
                    id="profilePic"
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />

                  <label
                    htmlFor="profilePic"
                    className="flex h-12 w-full cursor-pointer items-center rounded-xl border border-black/10 bg-[#f8f7f4] px-4 text-sm text-black/40 transition hover:border-black/20"
                  >
                    Choose profile picture
                  </label>
                </div>

                {errors.profilePic && (
                  <p className="mb-4 rounded-xl border border-red-500/15 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                    {errors.profilePic.message}
                  </p>
                )}

                {isLoading ? (
                  <button
                    type="button"
                    disabled
                    className="h-12 w-full cursor-not-allowed rounded-xl bg-[#171717] text-sm font-medium text-white"
                  >
                    Creating account...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-[#171717] text-sm font-medium text-white transition hover:bg-black"
                  >
                    Create account
                  </button>
                )}
              </form>

              <p className="mt-6 text-center text-xs text-black/40">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/")}
                  className="font-medium text-black"
                >
                  Log in
                </span>
              </p>

              <p className="mt-6 text-center text-[10px] leading-4 text-black/25">
                By creating an account, you agree to our Terms
                <br />
                and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
