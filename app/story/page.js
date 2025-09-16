import React from "react";
import Image from "next/image";

const story = () => {
  return (
    <div className="bg-[#5b0017] h-[90vh] md:h-[160vh] pt-20 text-white">
      <Image
        src="/img/pattern.png"
        height={500}
        width={600}
        alt=""
        className=" opacity-100 absolute left-0 top-0  "
      ></Image>
      <div className="hero flex  px-6 md:px-40 items-center justify-between mt-6 md:h-110 h-50">
        <div className="leftPart w-[40%] h-full flex flex-col items-start justify-center md:text-6xl text-2xl md:gap-2 font-serif">
          <span className="border-b-2 py-1 border-amber-400">Our story</span>
        </div>
        <div className="rightPart md:w-[40%] w-[60%] p-2  md:text-xl text-xs font-extralight flex flex-col items-start justify-center gap-4 h-full  ">
          <span>One of the best resturants in Est Burdwan.</span>
          <span>
            Our restaurant is a culinary journey that celebrates the rich and
            diverse flavors of Bengali cuisine, offering a unique dining
            experience that transports you to the heart of Bengal.
          </span>
        </div>
      </div>
      <div className="bg-amber-800 relative z-2 h-90 md:h-100 md:mx-60 my-8 mx-6 p-2 rounded-sm flex flex-col items-center justify-between gap-2 md:gap-6 pb-2">
        <span className="font-bold text-2xl">Shankar&apos;s Restraunt</span>
        <div className="h-full w-full flex justify-around">
          <div className="h-full  w-20 flex flex-col items-center gap-2">
            <span className="font-bold text-xl border-b-2">2004</span>
            <span className="text-sm font-light">Hailing from Odisha,</span>
            <span className="text-sm font-light">we began our journey with a humble sweet shop,</span>
            <span className="text-sm font-light">earning love and trust for authentic flavors.</span>
          </div>
          <div className="h-full  w-20 flex flex-col items-center gap-2">
            <span className="font-bold text-xl border-b-2">2024</span>
            <span className="text-sm font-light">Inspired by success,</span>
            <span className="text-sm font-light">we expanded to open Shankar's Restaurant,</span>
            <span className="text-sm font-light">serving a wider variety of delicious dishes.</span>
          </div>
          <div className="h-full  w-20 flex flex-col items-center gap-2">
            <span className="font-bold text-xl border-b-2">2025</span>
            <span className="text-sm font-light">Now offering a perfect blend of Sweet & Spicy delights,</span>
            <span className="text-sm font-light">we continue our mission to serve joy on every plate.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default story;
