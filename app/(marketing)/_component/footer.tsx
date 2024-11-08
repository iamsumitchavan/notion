"use client";

import { Button } from "@/components/ui/button";
import Logo from "./logo";

const Footer = () => {
  return (
    <>
      <div className="flex items-center w-full p-6 bg-background">
        <Logo />
        <div className="flex justify-between w-full items-center md:ml-auto md:justify-end gap-x-2">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm">
            Terms and Condition
          </Button>
        </div>
      </div>
    </>
  );
};

export default Footer;
