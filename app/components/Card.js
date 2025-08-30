"use client";
import React, { useState } from "react";

const Card = ({ image, title, price }) => {
  const [showCart, setShowCart] = useState(false);

  const handleCardClick = () => {
    setShowCart(!showCart);
  };

  return (
    <div
      className="bg-amber-500 h-30 md:h-60 w-30 md:w-60 text-white relative cursor-pointer"
      onClick={handleCardClick}
    >
      <div
        className={`addToCart h-full w-full flex justify-center items-center absolute ${
          showCart ? "block" : "hidden"
        }`}
      >
        <button className="bg-red-800 h-fit px-2 py-1 rounded-full text-sm md:text-xl md:px-4 md:py-2 font-bold ">Add to Cart + </button>
      </div>
      <div className="h-[80%]">
        <img
          src={image}
          alt={title}
          className="bg-amber-700 h-full object-top-left object-cover"
        />
      </div>
      <div className="bg-amber-900 h-[20%] flex justify-between items-center px-2 text-sm">
        <span>{title}</span>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default Card;
