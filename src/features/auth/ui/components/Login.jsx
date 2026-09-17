import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { register, handleSubmit, handleLogin, isLoading, errors } = useAuth();

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
                Welcome
                <span className="ml-4 text-white/25">back.</span>
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
                  WELCOME BACK
                </p>

                <h2 className="text-4xl font-semibold tracking-[-0.05em]">
                  Good to see you.
                </h2>

                <p className="mt-2 text-sm text-black/40">
                  Log in to continue sharing.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-3.5"
              >
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className={`h-12 w-full rounded-xl border bg-[#f8f7f4] px-4 text-sm outline-none placeholder:text-black/25 focus:border-black/30 ${
                      errors.email
                        ? "border-red-400"
                        : "border-black/10"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`h-12 w-full rounded-xl border bg-[#f8f7f4] px-4 text-sm outline-none placeholder:text-black/25 focus:border-black/30 ${
                      errors.password
                        ? "border-red-400"
                        : "border-black/10"
                    }`}
                  />

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-medium text-black/45 transition hover:text-black"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-[#171717] text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-black/40">
                Don't have an account?{" "}
                <span className="font-medium text-black">
                  Create account
                </span>
              </p>

              <p className="mt-6 text-center text-[10px] leading-4 text-black/25">
                By continuing, you agree to our Terms
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
