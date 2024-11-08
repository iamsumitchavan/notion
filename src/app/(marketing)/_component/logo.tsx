"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2 w-full">
      <Image
        src="/logo.svg"
        height={40}
        width={40}
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        height={40}
        width={40}
        alt="logo"
        className="dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};

export default Logo;