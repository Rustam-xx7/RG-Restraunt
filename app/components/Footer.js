import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-800 border-t border-gray-900/50 text-white w-full h-fit flex flex-col items-center justify-between pt-6 pb-4 gap-4">
      <span className=" font-bold text-xl ">
        Shankar&apos;s Restraunt
      </span>
      <div>
        <ul className="flex items-center justify-center  text-sm  relative z-10">
          <Link href="/">
            <li className="mx-4">Home</li>
          </Link>
          <Link href="/menu">
            <li className="mx-4">Menu</li>
          </Link>
          <Link href="/contact">
            <li className="mx-4">Review</li>
          </Link>
        </ul>
      </div>
      <span className=" font-semibold border-b border-gray-300/50">Contact us : 9883585402</span>
      <span className=" font-semibold border-b border-gray-300/50 text-white/40">Dev&apos;s Contact : 9641682925</span>
      <div className=" w-full flex flex-col items-center justify-center gap-2 py-1">
        <div className="w-full border-b-1 border-amber-800"></div>
        <span className="text-xs">
          {" "}
          &copy;2025 | All Rights Reserved | Created by Dipayan
        </span>
      </div>
    </div>
  );
};

export default Footer;
