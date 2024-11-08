"use client";

import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl h-full">
      <div className="flex items-center h-full">
        <div className="relative w-[300px] h-[300px] sm:[350px] sm:h-[350px] md:h-[400px] md-w-[400px]">
          <Image
            src="/documents.png"
            fill
            alt="docuement"
            className="object-contain"
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            src="/reading.png"
            fill
            alt="docuement"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
