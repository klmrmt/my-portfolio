"use client";
import Button3D from "./components/Button3D";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--text-primary)]">
      <div className="w-[90%] border-2 border-[var(--border)] bg-[var(--surface-primary)] p-6 shadow-[12px_10px_0px_var(--shadow-color)] md:w-[60%]">
        <h1 className="font-display text-3xl font-extrabold mb-4 crt-cursor">Kyle M</h1>
        <p className="text-lg leading-relaxed">
          Hello, I’m a SWE currently working <span className="font-semibold">@epsilon</span>. <br />
          I currently am focused on developing testing frameworks through automation.
        </p>
        <div className="mt-6 flex space-x-4">
          <Button3D name="Resume" route="/resume" />
          <Button3D name="About" route="/about" />
          <Button3D name="Portfolio" route="/portfolio" />
        </div>

      </div>
    </div>
  );
}
