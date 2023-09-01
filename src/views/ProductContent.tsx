import React from "react";
import Image from "next/image";
import productImage from "images/P1.webp";
import { Button } from "@/components/ui/button";
const ProductContent = () => {
  return (
    <>
      <section>
        <div className="flex items-end justify-end text-5xl font-extrabold mr-52 font-col">
          <h1>
            <p>Unique and Authentic</p>
            <p>Vintage Designer</p>
            <p>Jewellery</p>
          </h1>
        </div>
        <div className="flex flex-row mt-8 ml-24 mr-32">
          <div className="w-1/2 ">
            <div className="flex flex-row mt-6 justify-left items-left">
              <div className="w-1/2">
                <h3 className="mb-6 font-sans text-2xl font-bold text-gray-700">
                  Using Good Quality
                  <br />
                  Materials
                </h3>

                <p className="text-xl text-gray-600">
                  Lorem ipsum dolor sit
                  <br /> amt, consectetur
                  <br /> adipiscing elit.
                </p>
              </div>

              <div>
                <h3 className="mb-6 font-sans text-2xl font-bold text-gray-700">
                  100% Handmade
                  <br /> Products
                </h3>

                <p className="text-xl text-gray-600">
                  Lorem ipsum dolor sit
                  <br /> amt, consectetur
                  <br /> adipiscing elit.
                </p>
              </div>
            </div>

            <div className="flex flex-row mt-12 text-gray-700 justify-left items-left">
              <div className="w-1/2 ">
                <h3 className="mb-6 font-sans text-2xl font-bold ">
                  Modern Fashion
                  <br />
                  Design
                </h3>

                <p className="text-xl text-gray-600">
                  Lorem ipsum dolor sit
                  <br /> amt, consectetur
                  <br /> adipiscing elit.
                </p>
              </div>
              <div>
                <h3 className="mb-6 font-sans text-2xl font-bold text-gray-700">
                  Discount for Bulk
                  <br />
                  Orders
                </h3>

                <p className="text-xl text-gray-600">
                  Lorem ipsum dolor sit
                  <br /> amt, consectetur
                  <br /> adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/2 ml-16">
            <Image src={productImage} alt="Product Image" className="w=1/2" />
            <div className="flex flex-col w-1/2 mt-5 ml-16 mr-10">
              <div className="text-xl text-justify text-gray-600">
                <p>
                  This piece is ethically crafted in our <b /> small
                  family-owned workshop in <b /> Peru with unmatched attention
                  to detail and care.The Natural color is the actual natural
                  color of the fiber, undyed and 100% traceable
                </p>
              </div>
              <span className="mt-8">
                <Button>See All Products</Button>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductContent;
