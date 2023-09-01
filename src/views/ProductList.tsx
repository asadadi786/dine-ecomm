import P1 from "images/P1.webp";
import Image from "next/image";
import ProductCart from "@/components/ProductCart";
import { FC } from "react";
import { SanityProducts } from "@/interfaces";
import { client } from "@/lib/sanityClient";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    _id,
      price,
      title,
      image,
      category -> {
        name
      },slug {
        current,
      }
  }`);

  return res;
};

const ProductList = async () => {
  const data: SanityProducts[] = await getProductData();
  //console.log(data);
  const productChecks = data.slice(0, 4);
  //console.log(productChecks);
  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-10 py-10">
      {productChecks.map((product: any) => (
        <div key={product}>
          <ProductCart item={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
