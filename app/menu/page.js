"use client";
import React, { useState } from "react";
import Image from "next/image";
import Card from "../components/Card";
import Link from "next/link";

// Sample menu data
const menuItems = [
  { image: "/img/item1.jpg", title: "Chicken Feast", price: "450/-", category: "Feast" },
  { image: "/img/item2.jpg", title: "Coffee Latte", price: "150/-", category: "Coffee" },
  { image: "/img/item3.jpg", title: "Chocolate Dessert", price: "200/-", category: "Dessert" },
  { image: "/img/item4.jpg", title: "Grilled Chicken", price: "500/-", category: "Feast" },
  { image: "/img/item5.jpg", title: "Espresso", price: "120/-", category: "Coffee" },
  { image: "/img/item6.jpg", title: "Fruit Tart", price: "250/-", category: "Dessert" },
];

const categories = ["All", "Feast", "Coffee", "Dessert"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#5b0017] min-h-[100vh] pt-20 text-white md:px-20 px-10">
      <Image
        src="/img/pattern.png"
        height={500}
        width={800}
        alt=""
        className=" opacity-100 absolute left-0 top-0  "
      />
      <div className="hero flex items-center justify-between mt-6 md:h-110 h-50">
        <div className="leftPart w-[40%] h-full flex flex-col items-start justify-center md:text-6xl text-2xl md:gap-2 font-serif">
          <span>Discover</span>
          <span>Our menu</span>
        </div>
        <div className="rightPart md:w-[40%] w-[60%] p-2  md:text-xl text-sm font-extralight flex flex-col items-start justify-center gap-4 h-full  ">
          <span>
            There is a wide selection of choices served by top Bengali chefs, prepared using best quality local ingredients.
          </span>
        </div>
      </div>
      <div className="py-4">
        <div className="menuBar flex gap-4 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-sm text-gray-400/80 md:text-xl ${selectedCategory === cat ? "font-bold  text-white" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="my-4 h-fit grid md:grid-cols-4 grid-cols-2 gap-6 relative z-2">
          {filteredItems.map((item, idx) => (
            <Card
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
        <Link href="/fullMenu">
          <button className="border border-white px-4 py-2 rounded-sm text-sm relative z-10">Show more</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
