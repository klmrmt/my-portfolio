import Image from "next/image";

function MedalIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="9,1 16,13 23,1 27,1 18,17 14,17 5,1" fill="#c23b3b" />
      <polygon points="13,1 16,6.5 19,1" fill="#f0ead6" />
      <circle cx="16" cy="22" r="8.5" fill="#e8a33d" stroke="#8a5a14" />
      <circle cx="16" cy="22" r="6.2" fill="#f6c65b" />
      <path
        d="M16 17.2l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z"
        fill="#a06a10"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-10 w-10" aria-hidden="true" focusable="false">
      <path d="M6 4h4v3c0 3.2 1 5.6 2.5 7C9 13.4 6 10.4 6 7z" fill="#f6c65b" stroke="#8a5a14" />
      <path d="M26 4h-4v3c0 3.2-1 5.6-2.5 7 3.5-.6 6.5-3.6 6.5-7z" fill="#f6c65b" stroke="#8a5a14" />
      <path d="M10 3h12v6a6 6 0 0 1-12 0z" fill="#e8a33d" stroke="#8a5a14" />
      <path d="M12 4.5h4V10a4.5 4.5 0 0 1-2-.5z" fill="#f6c65b" />
      <rect x="14.5" y="14.5" width="3" height="5" fill="#e8a33d" stroke="#8a5a14" strokeWidth="0.75" />
      <path d="M10 24c0-2 2.5-3 6-3s6 1 6 3v2H10z" fill="#7a4a12" />
      <rect x="8" y="26" width="16" height="3" rx="1" fill="#5d3a10" />
    </svg>
  );
}

export default function SummerGamesPreview() {
  return (
    <div
      role="img"
      aria-label="The Computer Summer Games desktop with the Summer Games and World Rankings shortcuts"
      className="relative min-h-[300px] overflow-hidden border-2 border-[#17396d] bg-[#1684e8] shadow-[5px_5px_0_rgba(23,23,23,0.24)] sm:min-h-[360px]"
    >
      <Image
        src="/summer-games.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 48vw, 90vw"
        className="select-none object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10" />

      <div className="absolute left-3 top-4 flex flex-col gap-4 sm:left-5 sm:top-6">
        <div className="flex w-[72px] flex-col items-center gap-1 text-center text-[9px] font-medium leading-tight text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.95)] sm:w-20 sm:text-[10px]">
          <MedalIcon className="h-10 w-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" />
          <span>Summer Games.exe</span>
        </div>
        <div className="flex w-[72px] flex-col items-center gap-1 text-center text-[9px] font-medium leading-tight text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.95)] sm:w-20 sm:text-[10px]">
          <div className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
            <TrophyIcon />
          </div>
          <span>World Rankings</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-5 hidden items-center gap-2.5 text-right text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.75)] sm:flex sm:right-8">
        <MedalIcon className="h-12 w-12 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" />
        <div className="flex flex-col">
          <strong className="text-[10px] tracking-[0.12em] sm:text-xs">THE COMPUTER SUMMER GAMES</strong>
          <span className="text-[8px] sm:text-[9px]">Competition desktop · choose an event to begin</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-between border-t border-[#5b9dea] bg-gradient-to-b from-[#2d82df] to-[#0757ba] text-[9px] font-bold text-white">
        <span className="flex h-full items-center gap-1 rounded-r-full bg-gradient-to-b from-[#55b54d] to-[#248a2a] px-3 shadow-[inset_-2px_0_2px_rgba(0,0,0,0.2)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f5f0d8]">
            <MedalIcon className="h-4 w-4" />
          </span>
          games
        </span>
        <span className="px-3 font-normal">12:05 PM</span>
      </div>
    </div>
  );
}
