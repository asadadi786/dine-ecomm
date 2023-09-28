"use client";


import { useState } from "react";
const Quantity = () => {
  const [qunatityNum, setQuantityNum] = useState(1);

  return (
    <div className="flex item-center gap-x-2">
      {/*Minus */}
      <button
        className="w-6 h-6 border rounded-full _center"
        onClick={() => {
          setQuantityNum(qunatityNum <= 1 ? 1 : qunatityNum - 1);
        }}
      >
        -
      </button>
      {/*Number */}
      <span className="text-sm">{qunatityNum}</span>
      {/*Plus */}
      <button
        className="w-6 h-6 border rounded-full _center"
        onClick={() => {
          setQuantityNum(qunatityNum + 1);
        }}
      >
        +
      </button>
      
    </div>
  );
};

export default Quantity;

// export const OpertaionButton = () => {};
