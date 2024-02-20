"use client";

import ATPVDMS_Logo from "@/components/icons/atpvdms_logo";

export default function Page() {
  return (
    <div className="w-full h-[100vh] bg-white flex flex-col items-center justify-end gap-[2em] md:justify-center max-sm:justify-between pb-[8px]">
      <span className="w-[107x] h-[101px]">
        <ATPVDMS_Logo />
      </span>
      <a href="/signup" className="flex items-center justify-center w-[366px] h-[48px] bg-[#800E80] text-white rounded-[4px]">
        Get Started
      </a>
    </div>
  )
}