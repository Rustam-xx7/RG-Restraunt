"use client";
import Image from "next/image";
import Link from "next/link";
import ReviewCard from "./components/ReviewCard";

export default function Home() {
  return (
    <>
      <style>
        {`
          /* Custom scrollbar for menu grid */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #a0522d #ffd700;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #a0522d;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ffd700;
            border-radius: 8px;
          }
        `}
      </style>
      <div className="bg-[#5b0017] h-fit  pt-20 text-white">
        <div>
          <Image
            src="/img/pattern.png"
            alt=""
            width={500}
            height={300}
            className=" opacity-100 absolute left-0 top-0 "
          />
        </div>
        <div className="hero flex items-center md:h-110 h-70">
          <div className="bg-[#5b0017]/60 w-[70vw] px-6 py-4 rounded-2xl md:mx-10 md:my-20 md:text-6xl text-xl flex flex-col md:gap-4 font-serif absolute top-30 z-10 shadow-md shadow-black/20">
            <span>Taste the authentic </span>
            <span>Bengali cusine</span>
          </div>
          <div className="md:w-200 w-60  md:h-[60vh] h-60 md:pl-2 md:pt-10 absolute z-0 rounded-2xl right-0 top-20 mx-4">
            <div className=" md:h-20 h-8 md:w-20 w-8 absolute md:top-2 -top-3 md:right-12 -right-2 z-4">
              <Image
                src="/img/Vector.png"
                alt=""
                height={50}
                width={50}
                className=" opacity-100 md:opacity-100 "
              ></Image>
            </div>
            <div className="h-40 w-full bg-aber-300 relative">
              <Image
                src="/img/Half Plate Chicken Biryani.jpeg"
                alt=""
                width={170}
                height={100}
                className=" rounded-2xl md:rounded-4xl object-cover  absolute z-0 md:right-22 md:h-130 md:w-140 h-40 w-40 right-0 top-0 shadow-md shadow-black/40"
              ></Image>
            </div>
          </div>
          <div className="leftPart  w-fit relative md:top-40 top-20 md:px-15 px-6 py-2 text-md font-light flex flex-col items-start gap-6">
            <div className="massage flex flex-col items-start opacity-70">
              <span>Among the best Bengali Chefs in the world ,</span>
              <span>serving you something beyond flvor .</span>
            </div>
            <Link href="/menu">
              <button className=" w-fit px-4 py-2 border-amber-400 border-2 bg-black/30 shadow-md shadow-amber-400/30  font-serif text-xl font-extralight rounded-sm ">
                Our Menu
              </button>
            </Link>
          </div>
        </div>
        <div className="md:h-25 h-10 md:py-5  my-4 relative">
          <Image
            src="/img/Vector 2.png"
            alt=""
            width={60}
            height={30}
            className="md:mx-10 opacity-70 relative md:-top-0 md:left-2 left-70  h-10 w-10 md:w-15 md:h-15 "
          ></Image>
        </div>
        <div className="h-fit bg-amber400 my-4 flex relative">
          <div>
            <Image
              src="/img/pattern.png"
              alt=""
              width={600}
              height={300}
              className=" opacity-100 absolute right-0 top-10"
            />
          </div>
          <div className="md:px-15 px-2">
            <Image
              src="/img/venu.jpg"
              alt=""
              height={500}
              width={500}
              className="my-2 mx-2 h-30 md:h-100 w-30 md:w-120 object-cover object-center  md:rounded-2xl rounded-sm relative z-2 shadow-md shadow-black/50"
            ></Image>
          </div>
          <div className="rightPart flex flex-col justify-center md:gap-4 ">
            <span className="md:text-5xl font-sans">
              A distinctive dining destination{" "}
            </span>
            <span className="md:text-5xl font-sans">
              inspired by the culture .
            </span>
            <span className="text-sm font-light text-white/60">
              Experiance The Bengali Vibes .
            </span>
          </div>
        </div>
        <div className="h-fit my-10 flex justify-center items-center">
          <div className="reviews h-50 md:h-80 md:w-[90vw] relative z-2 mx-4 my-4 flex overflow-x-auto space-x-4 custom-scrollbar">
            <ReviewCard />
          </div>
        </div>
        <div className="h-60 md:h-100 w-full bg-amber-700/20 relative">
          <Image
            src="/img/image 4.jpg"
            alt=""
            width={400}
            height={200}
            className="h-full w-full object-cover absolute z-1"
          ></Image>
          <div className="h-full w-full relative z-2 flex flex-col justify-center items-center text-white font-serif gap-2 px-2">
            <Image
              src="/img/Vector.png"
              alt=""
              height={40}
              width={40}
              className="opacity-100  "
            ></Image>
            <div className="text-center flex flex-col text-xl md:text-4xl">
              <span>A unique menu that reflects the</span>
              <span>true essence of the Bengali cuisine</span>
            </div>
            <Link href="/contact">
              <button className=" w-fit px-4 py-2 border-amber-400 border-2 bg-black/30  shadow-md shadow-amber-400/30 font-serif text-sm font-extralight rounded-sm ">
                Give Review
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
