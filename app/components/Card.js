"use client";
import React, { useState, useRef, useEffect } from "react";
import Contains from "./Contains";
import Image from "next/image";

const Card = ({ image, title, price, contains, onAddToCart }) => {
  const [showCart, setShowCart] = useState(false);
  const [showContain, setShowContain] = useState(false);
  const cardRef = useRef(null);

  const handleCardClick = () => {
    setShowCart(!showCart);
  };
  const handleContainClick = () => {
    setShowContain(!showContain);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  useEffect(() => {
    const handleClickOutsideContain = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowContain(false);
      }
    };

    if (showContain) {
      document.addEventListener("mousedown", handleClickOutsideContain);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideContain);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideContain);
    };
  }, [showContain]);

  return (
    <div
      ref={cardRef}
      className="bg-amber-500 h-30 md:h-60 w-30 md:w-60 text-white relative cursor-pointer rounded-xl "
      onClick={handleCardClick}
    >
      {/* Show full title above card when clicked */}
      {showCart && (
        <>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-amber-950 text-white px-3 py-1 rounded shadow-lg shadow-black/60 z-9 text-sm md:text-base w-max max-w-xs">
            {title}
          </div>
        </>
      )}
      {showCart && contains && contains.length > 0 && (
        <div className="absolute -bottom7 left-1/2 -translate-x-1/2 h-ful z-10">
          <button
            className="text-black font-semibold px-3 py-1 rounded shadow-lg shadow-black/70 z-9 text-xs md:text-base w-max max-w-xs bg-white/50 "
            onClick={(e) => {
              e.stopPropagation();
              handleContainClick();
            }}
          >
            contains
          </button>
        </div>
      )}
      {showContain && (
        <Contains contains={contains} title={title} image={image} />
      )}
      <div
        className={`addToCart h-full w-full flex justify-center items-center absolute ${
          showCart ? "block" : "hidden"
        }`}
      >
        <button
          className="bg-red-800 h-fit px-2 py-1 rounded-full text-sm md:text-xl md:px-4 md:py-2 font-bold shadow-lg shadow-black/60"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(title, price);
          }}
        >
          Add to Cart +
        </button>
      </div>
      <div className="h-[80%] rounded-2xl">
        <Image 
        src={image} 
        alt={title} 
        width={500} 
        height={300}
        className="w-full h-full object-cover object-center rounded-t-xl bg-amber-700"/>
      </div>
      <div className="bg-amber-900 h-[20%] flex justify-between items-center px-2 text-sm min-w-0 rounded-b-xl">
        <span className="truncate flex-1 mr-2" title={title}>
          {title}
        </span>
        <span className="truncate" title={price}>
          {price}/-
        </span>
      </div>
    </div>
  );
};

export default Card;
