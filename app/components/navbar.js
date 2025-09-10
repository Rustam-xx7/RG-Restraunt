"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className=" h-full flex items-center justify-between text-white px-5 md:py-8 md:px-6">
      <div className="logo">
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt=""
            height={10}
            width={60}
            className="opacity-100"
          />
        </Link>
      </div>
      <div className=" bg-ambe-300 w-full md:w-120 h-fit py-2 px-2 ">
        <ul className="flex  h-full items-center w-full justify-around font-bold text-sm ">
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
      </div>
      <div className="flex items-center gap-2 md:gap-6 justify-center">
        <Link href="/login">
          {/* <lord-icon
            src="https://cdn.lordicon.com/kdduutaw.json"
            trigger="click"
            colors="primary:#121331,secondary:#e8b730"
            style={{ width: "25px", height: "25px" }}
          ></lord-icon> */}
          <Image
            src="/img/account2.png"
            alt=""
            height={50}
            width={60}
            className=" h-7 w-35 md:h-10 md:w-10"
          />
        </Link>
        <Link href="/cart">
          <button className="w-20 px-2 py-1 rounded-xl  font-bold bg-amber-500 text-sm">
            Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
