import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-[#5b0017] h-fit pt-20 text-white">
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
          <div className="bg-[#5b0017]/50 w-[70vw] px-6 py-4 rounded-2xl md:mx-10 md:my-20 md:text-6xl text-xl flex flex-col md:gap-4 font-serif absolute top-30 z-10">
            <span>Taste the authentic </span>
            <span>Bengali cusine</span>
          </div>
          <div className="md:w-200 w-60  md:h-[60vh] h-60 md:pl-2 md:pt-10 absolute z-0 rounded-2xl right-0 top-20 mx-4">
            <div className=" md:h-20 h-8 md:w-20 w-8 absolute md:top-2 -top-3 md:right-12 -right-2 z-4">
              <Image
                src="/img/vector.png"
                alt=""
                height={50}
                width={50}
                className=" absolu right-19 z-4 top-2 opacity-100 md:opacity-100 "
              ></Image>
            </div>
            <Image
              src="/img/image 1.jpg"
              alt=""
              width={700}
              height={300}
              className=" rounded-xl object-cover md:px-2 md:py-0 px-2 py-2 absolu z-0 md:left-10"
            ></Image>
          </div>
          <div className="leftPart  w-fit relative md:top-40 top-20 md:px-15 px-6 py-2 text-md font-light flex flex-col items-start gap-6">
            <div className="massage flex flex-col items-start opacity-70">
              <span>Among the best Bengali Chefs in the world ,</span>
              <span>serving you something beyond flvor .</span>
            </div>
            <Link href="/menu">
              <button className=" w-fit px-4 py-2 border-amber-400 border-2 font-serif text-xl font-extralight rounded-sm ">
                Our Menu
              </button>
            </Link>
          </div>
        </div>
        <div className="md:h-25 h-10 md:py-5  my-4 relative">
          <Image
            src="/img/pattern 2.png"
            alt=""
            width={260}
            height={20}
            className="opacity-50 md:hidden h-10 absolute  "
          ></Image>
          <Image
            src="/img/Vector 2.png"
            alt=""
            width={60}
            height={30}
            className="md:mx-10 opacity-100 relative md:-top-0 md:left-2 left-70  h-10 w-10 md:w-15 md:h-15 "
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
              className="my-2 mx-2 h-30 md:h-100 w-30 md:w-120 object-cover object-center  md:rounded-2xl rounded-sm relative z-2"
            ></Image>
          </div>
          <div className="rightPart flex flex-col justify-center md:gap-4 ">
            <span className="md:text-5xl font-serif">
              A distinctive dining destination{" "}
            </span>
            <span className="md:text-5xl font-serif">
              inspired by the culture .
            </span>
            <span className="text-sm font-light text-white/60">
              Experiance The Bengali Vibes .
            </span>
            <Link href="/venue">
              <button className=" w-fit px-4 py-2 my-4 border-amber-400 border-2 font-serif md:text-xl text-sm font-extralight rounded-sm  relative z-10">
                Our Venue
              </button>
            </Link>
          </div>
        </div>
        <div className="h-fit my-10 flex justify-center items-center">
          <div className="reviews bg-amber-500 h-50 md:h-80 md:w-[60vw] relative z-2 mx-4 my-4 flex ">
            <div className="massage h-full w-[40%] flex flex-col justify-around items-center px-2 py-2 gap-4 text-amber-950 ">
              <span className="text-[12px] font-serif">
                "I tried there Chicken Mandi , the chicken was cooked perfectly,
                juicy & soft . I would definatly recommend it ."
              </span>
              <div className="bg-amber- h-10 w-full flex flex-col text-[10px] px-2 justify-center items-start border-b-1 border-amber-900 font-light font-mono">
                <span>Dipayan Chakraborty</span>
                <span>july 20, 2025</span>
              </div>
            </div>
            <div className="recipe w-[60%] bg-amber-900 h-full">
              <Image
                src="/img/image 3.jpg"
                alt=""
                width={100}
                height={200}
                className="h-full w-[60%] object-fit object-left absolute z-1"
              ></Image>
            </div>
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
              src="/img/vector.png"
              alt=""
              height={40}
              width={40}
              className="opacity-100  "
            ></Image>
            <div className="text-center flex flex-col text-xl md:text-4xl">
              <span>A unique menu that reflects the</span>
              <span>true essence of the Bengali cuisine</span>
            </div>
            <Link href="/menu">
              <button className=" w-fit px-4 py-2 border-amber-400 border-2 font-serif text-sm font-extralight rounded-sm ">
                Our Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
