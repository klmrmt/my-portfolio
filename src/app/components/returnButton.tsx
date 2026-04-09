import Link from 'next/link';

export default function ReturnButton() {
  return (
    <Link 
      href="/"
      className="relative inline-flex items-center border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[var(--surface-secondary)] hover:shadow-[3px_3px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_var(--shadow-color)] before:pointer-events-none before:absolute before:top-[-4px] before:right-[-8px] before:bottom-[-8px] before:left-[-4px] before:content-['']"
    >
      ←<span className="hidden sm:inline"> Home</span>
    </Link>
  );
}