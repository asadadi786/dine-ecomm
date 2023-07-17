import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import ProductCart from "../components/ProductCart";
import React from "react";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    _id,
      price,
      title,
      image,
      category -> {
        name
      }
  }`);

  return res;
};

interface IProduct {
  title: string;
  _id: string;
  description: string;
  price: number;
  image: IImage;
  category: {
    name: string;
  };
}

export default async function Home() {
  const data: IProduct[] = await getProductData();

  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-10">
      {data.map((item, index) => (
        <div key={index}>
          <ProductCart item={item} />
        </div>
      ))}
    </div>
  );
}
