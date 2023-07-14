"use client";

import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import { FC } from "react";

const ProductCart: FC<{ item: any }> = ({ item }) => {
  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
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
      <Image
        width={200}
        height={300}
        className="max-h-[200px] object-cover object-top"
        src={urlForImage(item.image).url()}
        alt="product"
      />
      <h2>{item.title}</h2>
      <h3>{item.price}</h3>
      <button
        onClick={handleAddToCart}
        className="border py-2 px-6 rounded bg-blue-600 text-white"
      >
        Add to Cart
      </button>
    </>
  );
};

export default ProductCart;
