import type { Metadata } from "next";
import "./brain.css";

export const metadata: Metadata = {
  title: "Brain — Private workspace",
  description: "Kyle Morimoto's private personal workspace.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
  },
  referrer: "no-referrer",
};

export default function BrainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="morrow-route">{children}</div>;
}

