import React from "react";
import Image from "next/image";
import Card from "../components/Card";

const menu = () => {
  return (
    <div className="bg-[#5b0017] min-h-[100vh] pt-20 text-white md:px-20 px-10">
        <Image
        src="/img/pattern.png"
        height={500}
        width={800}
        alt=""
        className=" opacity-100 absolute left-0 top-0  "
        ></Image>
        <div className="hero flex items-center justify-between mt-6 md:h-110 h-50">
          <div className="leftPart w-[40%] h-full flex flex-col items-start justify-center md:text-6xl text-2xl md:gap-2 font-serif">
            <span>Discover</span>
            <span>Our menu</span>
          </div>
          <div className="rightPart md:w-[40%] w-[60%] p-2  md:text-xl text-sm font-extralight flex flex-col items-start justify-center gap-4 h-full  ">
            <span>There is a wide selection of choices served by top Bengali chefs, prepared using besr quality local ingredients.</span>
          </div>
        </div>
        <div className="py-4">
          <div className="menuBar flex gap-4 ">
            <button className="text-sm md:text-xl">All</button>
            <button className="text-sm md:text-xl">Feast</button>
            <button className="text-sm md:text-xl">Coffee</button>
            <button className="text-sm md:text-xl">Dessert</button>
          </div>
          <div className="my-4 h-fit grid md:grid-cols-4 grid-cols-2 gap-6 relative z-2">
            <Card 
            image="/img/item1.jpg"
            title="chicken"
            rating="4.5"></Card>
            <Card 
            image="/img/item2.jpg"
            title="chicken"
            rating="4.5"></Card>
            <Card 
            image="/img/item3.jpg"
            title="chicken"
            rating="4.5"></Card>
            <Card 
            image="/img/item4.jpg"
            title="chicken"
            rating="4.5"></Card>
            <Card 
            image="/img/item5.jpg"
            title="chicken"
            rating="4.5"></Card>
            <Card 
            image="/img/item6.jpg"
            title="chicken"
            rating="4.5"></Card>
          </div>
          <button className="border border-white px-4 py-2 rounded-sm text-sm">Show more</button>
        </div>
    </div>
  );
};

export default menu;
