import Link from 'next/link';

export default function ReturnButton() {
  return (
    <Link 
      href="/"
      className="relative px-4 py-2 border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-75 inline-block before:content-[''] before:absolute before:top-[-4px] before:left-[-4px] before:right-[-8px] before:bottom-[-8px]"
    >
      ← Home
    </Link>
  );
}