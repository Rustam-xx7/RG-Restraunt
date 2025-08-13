import React from "react";

const Card = ({image , title , rating}) => {
  return <div className="bg-amber-500 h-30 md:h-60 w-30 md:w-60 text-white">
    <div className="h-[80%]">
        <img src={image} alt={title} className="bg-amber-700 h-full object-top-left object-cover" />
    </div>
    <div className="bg-amber-900 h-[20%] flex justify-between items-center px-2 text-sm">
        <span>{title}</span>
        <span>{rating}</span>
    </div>
  </div>
};

export default Card;
