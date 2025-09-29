"use client";
import React, { useState, useRef, useEffect } from "react";
import Contains from "./Contains";
import Image from "next/image";

const Card2 = ({ image, title, price, contains, onAddToCart }) => {
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
      className="bg-black/20 shadow-md shadow-black/40 h-30 md:h-50 w-70 md:w-130 text-white relative cursor-pointer rounded-xl flex justify-start items-center gap-2 px-2 py-2 "
      onClick={handleCardClick}
    >
      {/* Show full title above card when clicked */}
      {showCart && (
        <>
          <div className="absolute bottom-1 right-4 bg-amber-500 text-white px-3 py-1 rounded shadow-lg shadow-black/60 z-9 text-sm md:text-base w-max max-w-xs">
            {title}
          </div>
        </>
      )}

      {showContain && (
        <Contains contains={contains} title={title} image={image} />
      )}
      <div className="h-[90%] w-[35%] rounded-2xl">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover object-center rounded-xl bg-amber-700"
        />
      </div>
      {/* <div className="bg-purple-300 h-full w-[65%] flex flex-col"> </div> */}
      <div className=" h-full w-[65%] flex flex-col items-start gap-4 px-2 min-w-0 ">
        <div className="flex w-full justify-between items-center">
          <span className="truncate flex-1 mr-2 md:text-xl border-b border-gray-400/70 pb-2 pt-2" title={title}>
            {title}
          </span>
          <span className="truncate" title={price}>
            {price}/-
          </span>
        </div>
        <div className="w-full flex flex-row-reverse justify-start gap-6">
          <button
            className="bg-red-800 h-fit px-2 py-1 rounded-md text-sm md:text-xl md:px-4 md:py-2 font-bold shadow-md shadow-black/30"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(title, price);
            }}
          >
            Add +
          </button>
          {contains && contains.length > 0 && (
            <button
              className="text-white font-semibold px-3 py-1 rounded shadow-md shadow-black/40 z-9 text-xs md:text-base w-max max-w-xs bg-amber-200/50 "
              onClick={(e) => {
                e.stopPropagation();
                handleContainClick();
              }}
            >
              contains
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card2;
