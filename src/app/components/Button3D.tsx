import Link from 'next/link';

interface Button3DProps {
  name: string;
  route: string;
}

export default function Button3D({ name, route }: Button3DProps) {
  return (
    <Link 
      href={route}
      className="inline-block px-4 py-2 border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] font-semibold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-75"
    >
      {name}
    </Link>
  );
}