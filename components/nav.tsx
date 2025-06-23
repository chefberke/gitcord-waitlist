import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Github, Twitter } from "lucide-react";

function nav() {
  return (
    <div className="h-20 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Gitcord Logo" width={24} height={24} />
        <h1 className="text-lg font-medium text-neutral-100">Gitcord</h1>
      </div>
      <div className="flex items-center gap-1">
        <Link
          href="https://github.com/lumi-work/gitcord"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label="Visit Gitcord on GitHub"
        >
          <Github className="w-5 h-5" />
        </Link>
        <Link
          href="https://x.com/works_lumi"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label="Follow Gitcord on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default nav;
