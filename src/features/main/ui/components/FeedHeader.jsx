export default function FeedHeader() {
  return (
    <div className="mb-7 flex items-end justify-between">
      <div>
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/30">
          Home
        </p>

        <h1 className="text-[32px] font-semibold tracking-[-0.06em]">
          Your feed
        </h1>
      </div>

      <button className="text-[11px] font-medium text-black/40 hover:text-black">
        Latest
      </button>
    </div>
  );
}