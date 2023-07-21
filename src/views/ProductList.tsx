import P1 from "images/P1.webp";
import Image from "next/image";
import ProductCart from "@/components/ProductCart";
import { FC } from "react";

const ProductList: FC<{ data: any }> = ({ data }) => {
  const productChecks = data.slice(0, 4);
  //console.log(productChecks);
  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-10 py-10">
      {productChecks.map((product) => (
        <div key={product}>
          <ProductCart item={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
