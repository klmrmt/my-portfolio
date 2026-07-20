export default function SummerGamesPreview() {
  return (
    <div
      role="img"
      aria-label="Preview of The Computer Summer Games running inside its early-2000s desktop interface"
      className="relative min-h-[300px] overflow-hidden border-2 border-[#17396d] bg-[#64b8ee] shadow-[5px_5px_0_rgba(23,23,23,0.24)] sm:min-h-[360px]"
    >
      {/* Original, abstracted desktop landscape. */}
      <div className="absolute -left-[12%] top-[42%] h-[46%] w-[82%] rotate-[-5deg] rounded-[50%] bg-[#72b83f] shadow-[inset_0_10px_0_rgba(255,255,255,0.12)]" />
      <div className="absolute -right-[22%] top-[48%] h-[52%] w-[92%] rotate-[7deg] rounded-[50%] bg-[#4b9636]" />
      <div className="absolute left-[8%] top-[12%] h-6 w-20 rounded-[50%] bg-white/55 blur-[1px]" />
      <div className="absolute right-[10%] top-[18%] h-8 w-28 rounded-[50%] bg-white/45 blur-[1px]" />

      <div className="absolute left-3 top-4 flex w-16 flex-col items-center gap-1 text-center text-[9px] font-medium leading-tight text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)] sm:left-5 sm:top-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#e6bd47] bg-[#b83624] text-lg shadow-md">
          ★
        </span>
        Summer Games.exe
      </div>

      <div className="absolute inset-x-[7%] top-[12%] overflow-hidden border border-[#143b78] bg-[#ece9d8] shadow-[7px_8px_0_rgba(14,33,58,0.3)] sm:inset-x-[10%]">
        <div className="flex h-7 items-center justify-between bg-gradient-to-b from-[#3988e8] via-[#1166ce] to-[#0b4db2] px-2 text-[10px] font-bold text-white sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#ffdc69]">★</span>
            <span>The Computer Summer Games</span>
          </div>
          <div className="flex gap-1 text-[9px]">
            <span className="flex h-4 w-4 items-center justify-center border border-white/70 bg-[#2c78d6]">_</span>
            <span className="flex h-4 w-4 items-center justify-center border border-white/70 bg-[#2c78d6]">□</span>
            <span className="flex h-4 w-4 items-center justify-center border border-white/70 bg-[#d9502f]">×</span>
          </div>
        </div>

        <div className="flex h-6 items-center gap-4 border-b border-[#aaa58e] px-2 text-[9px] text-[#29291f] sm:text-[10px]">
          <span>Game</span>
          <span>View</span>
          <span>Help</span>
        </div>

        <div className="flex items-center justify-between border-b border-[#c1baa3] bg-[#f4f1e5] px-3 py-2 text-[8px] uppercase tracking-wide text-[#655f4f] sm:text-[9px]">
          <span className="font-bold text-[#b7442e]">100m Dash</span>
          <span>110m Hurdles</span>
          <span className="hidden sm:inline">Shot Put</span>
          <span className="hidden sm:inline">Long Jump</span>
          <span>Total&nbsp; 0</span>
        </div>

        <div className="flex min-h-[190px] items-center justify-center px-4 py-5 sm:min-h-[220px]">
          <div className="grid w-full max-w-[390px] grid-cols-[72px_1fr] border border-[#8f8a76] bg-[#f7f4e8] shadow-[3px_3px_0_rgba(65,61,49,0.2)] sm:grid-cols-[92px_1fr]">
            <div className="flex flex-col items-center justify-center bg-[#f06c4f] px-2 py-5 text-center text-white [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_6px,rgba(255,255,255,0.08)_6px,rgba(255,255,255,0.08)_8px)]">
              <span className="text-[8px] uppercase tracking-[0.18em]">Event</span>
              <strong className="text-4xl leading-none sm:text-5xl">01</strong>
              <span className="mt-1 text-[8px] tracking-[0.18em]">CSG</span>
            </div>
            <div className="flex flex-col p-3 text-[#2f2d26] sm:p-4">
              <span className="text-[8px] uppercase tracking-[0.16em] text-[#706a5a]">Event 1 of 5</span>
              <strong className="mt-1 text-xl text-[#b43c27] sm:text-2xl">100m Dash</strong>
              <span className="border-b border-[#b9b29d] pb-2 text-[10px] text-[#615c50]">Scroll Sprint</span>
              <div className="mt-3 border border-[#d2ccba] bg-[#f1eee3] p-2 text-[9px] leading-relaxed sm:text-[10px]">
                Scroll fast. Your first move starts the clock.
              </div>
              <span className="mt-3 self-end border border-[#6c6657] bg-[#ece9d8] px-3 py-1 text-[9px] font-bold shadow-[inset_1px_1px_0_white]">
                Start event
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-between border-t border-[#5b9dea] bg-gradient-to-b from-[#2d82df] to-[#0757ba] text-[9px] font-bold text-white">
        <span className="flex h-full items-center rounded-r-full bg-gradient-to-b from-[#55b54d] to-[#248a2a] px-4 shadow-[inset_-2px_0_2px_rgba(0,0,0,0.2)]">
          games
        </span>
        <span className="px-3 font-normal">12:05 PM</span>
      </div>
    </div>
  );
}
