import Link from 'next/link';

interface Button3DProps {
  name: string;
  route: string;
}

export default function Button3D({ name, route }: Button3DProps) {
  return (
    <Link 
      href={route}
      className="inline-block border-2 border-[var(--border)] bg-[var(--surface-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] transition-all duration-150 ease-out hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[var(--surface-secondary)] hover:shadow-[5px_5px_0px_var(--shadow-color)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0px_var(--shadow-color)]"
    >
      {name}
    </Link>
  );
}