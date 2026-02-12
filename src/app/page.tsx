"use client";
import { useState } from "react";
import Button3D from "./components/Button3D";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-black">
      <div className="w-[90%] md:w-[60%] p-6 border-2 border-black bg-white shadow-[12px_10px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-bold mb-4">Kyle M</h1>
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
