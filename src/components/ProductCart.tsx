"use client";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { FC } from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
import { SanityProducts } from "@/interfaces";
//import { addToCart } from "@/store/slice/cartSlice";

const ProductCart: FC<{ item: SanityProducts }> = ({ item }) => {
  return (
    <>
      <Link href={`/products/${item.slug.current}`}>
        <Image
          src={urlForImage(item.image[0]).url()}
          width={200}
          height={300}
          className="max-h-[200px] object-cover object-top"
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
        {/* <AddToCart product={item} /> */}
      </Link>
    </>
  );
};

export default ProductCart;
