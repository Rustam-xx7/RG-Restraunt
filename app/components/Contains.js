"use client";
import React from "react";
import Image from "next/image";

const Contains = ({ contains, title, image }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12">
      <div className="containsCard px-4 h-100 md:h-140 w-80 md:w-100  bg-[#FEFDF5] text-black relative z-2 mt-2 shadow-md shadow-black/50 rounded-xl py-4 mb-0 overflow-y-auto overflow-x-auto">
        <Image
          src="/img/containsBg.jpeg"
          alt=""
          width={500}
          height={300}
          className="h-full w-full absolute top-0 left-0 object-fill"
        />
        <ul className="list-disc list-inside pl-2 relative z-2">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-20 w-20 rounded-2xl shadow-md shadow-black/60"
            />
            <h2 className="text-xl font-semibold font-serif border-b border-black/50 pb-1 text-wrap ">
              {title}
            </h2>
          </div>
          {contains.map((item, idx) => (
            <li key={idx} className="font-semibol break-words pb-1 md:text-base">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contains;
