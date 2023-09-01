import React from "react";
import Image from "next/image";
import promo60Img from "images/promo-60.webp";
import promoDiscountShirtImg from "images/promo-discount-1.webp";
import promoDiscountJacketImg from "images/promo-discount-2.webp";
import { Button } from "@/components/ui/button";

const PromoList = () => {
  return (
    <section className="flex flex-col">
      <div className="flex justify-center items-center flex-col">
        <div className="text-blue-700 text-sm mt-10 font-semibold font-serif ">
          <h4>PROMOTIONS</h4>
        </div>
        <div className="font-bold text-4xl mt-4">
          <h2>Our Promotions Events</h2>
        </div>
      </div>
      <section className="flex justify-between gap-5 mt-4 ml-16 mr-16">
        <div className="flex flex-col w-1/2 ">
          <div className=" flex flex-row border-2 bg-gray-300 h-1/2 ">
            <div className="font-bold w-3/4 pt-16 pl-8">
              <span className=" text-4xl">GET UP TO </span>
              <span className=" text-5xl">60%</span>
              <p className="text-gray-800 text-2xl font-medium font-serif ">
                For the summer season
              </p>
            </div>
            <div className="w-1/2 ml-10  flex justify-end">
              <Image src={promo60Img} alt="promo 60% Image" />
            </div>
          </div>
          <div className="mt-2 flex flex-col h-1/2 justify-center items-center border-2 bg-gray-900 text-white">
            <h2 className="text-5xl font-serif font-bold">GET 30% Off</h2>
            <p className="mt-4">USE PROMO CODE</p>
            <Button className="mt-3 p-5 bg-gray-700 border-2 text-2xl font-semibold font-sans">
              DINEWEEKLYSALE
            </Button>
          </div>
        </div>
        <div className="w-1/4 bg-green-300 text-lg">
          <div className=" mt-7 pl-5 ">
            <p>Flex Sweatshirt</p>
            <span className="text-decoration-line: line-through">$100.00</span>
            <span className="pl-3 font-bold text-xl">$75.00</span>
          </div>
          <div className="flex justify-center items-center">
            <Image src={promoDiscountShirtImg} alt="promotion Discount Shirt" />
          </div>
        </div>
        <div className="w-1/4 bg-gray-300 text-lg">
          <div className=" mt-7 pl-5 ">
            <p>Flex Push Button Bomber</p>
            <span className="text-decoration-line: line-through">$225.00</span>
            <span className="pl-3 font-bold text-xl">$190.00</span>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={promoDiscountJacketImg}
              alt="Promotion Discount Jacket Image"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default PromoList;
