"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  useEffect(() => {
    // Dynamically import lordicon and lottie only on client
    import("lottie-web").then((lottie) => {
      import("@lordicon/element").then((module) => {
        module.defineElement(lottie.default.loadAnimation);
      });
    });
  }, []);

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
          <lord-icon
            src="https://cdn.lordicon.com/kdduutaw.json"
            trigger="click"
            stroke="bold"
            state="hover-looking-around"
            colors="primary:#e4e4e4,secondary:#eeaa66"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
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
