"use client";
// import {button} from './ui/button';
import { FC } from "react";

const AddToCart: FC<{ item: any }> = ({ item }) => {
  const handleAddToCart = async () => {
    const res = await fetch("api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: item._id,
      }),
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="border py-2 px-6 rounded bg-blue-600 text-white"
      >
        Add to Cart
      </button>
      ; ;
    </>
  );
};
export default AddToCart;
