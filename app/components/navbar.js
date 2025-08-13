import React from "react";
import Link from "next/link";
import Image from "next/image";

const navbar = () => {
  return (
    <div className=" h-full flex items-center justify-between text-white px-5">
      <div className="logo">
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt=""
            height={10}
            width={40}
            className="opacity-100"
          ></Image>
        </Link>
      </div>
      <ul className="flex  h-full items-center w-full justify-around mx-6 font-bold text-sm ">
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/menu">
          <li>Menu</li>
        </Link>
        <Link href="/story">
          <li>Story</li>
        </Link>
      </ul>
      <div className="">
        <button className="w-20 px-2 py-1 rounded-xl  font-bold bg-amber-500 text-sm">
          Order
        </button>
      </div>
    </div>
  );
};

export default navbar;
