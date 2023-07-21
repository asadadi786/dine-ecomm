"use client";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { FC } from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
//import { addToCart } from "@/store/slice/cartSlice";

const ProductCart: FC<{ item: any }> = ({ item }) => {
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
      <Link href={`/products/${item._id}`}>
        <Image
          width={200}
          height={300}
          className="max-h-[200px] object-cover object-top"
          src={urlForImage(item.image).url()}
          alt="product"
        />

        <h2 className="font-bold text-lg mt-3">{item.title}</h2>
        <h3 className="font-bold text-lg">{item.price}</h3>
        <p className="font-bold text-lg">
          Category{" "}
          <span className="text-base font-normal capitalize">
            {item.category.name}
          </span>
        </p>
        <AddToCart item={item} />
        {/* <button
        onClick={handleAddToCart}
        className="border py-2 px-6 rounded bg-blue-600 text-white"
      >
        Add to Cart
      </button> */}
      </Link>
    </>
  );
};

export default ProductCart;
