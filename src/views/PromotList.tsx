import React from "react";
import Image from "next/image";
import promo60Img from "images/promo-60.webp";
import promoDiscountShirtImg from "images/promo-discount-1.webp";
import promoDiscountJacketImg from "images/promo-discount-2.webp";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";

const PromoList = () => {
  return (
    <Wrapper>
      <p className="flex justify-center items-center font-bold">Promotions</p>
      <h3 className="my-4  first:mt-0 text-center">Our Promotions Event</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
        <div className="sm:col-span-2 space-y-2">
          <div className=" bg-[#d6d6d8]  flex justify-center items-center px-5">
            <div>
              <h4>
                GET UP TO <span className="text-2xl">60%</span>
              </h4>
              <p>For the summer season</p>
            </div>
            <Image
              src={promo60Img}
              alt="promo 60% Image"
              width={226}
              height={226}
            />
          </div>
          <div className="flex flex-col items-center justify-center  bg-[#212121] h-48 py-5 text-center text-white">
            <h3>GET 30% Off</h3>
            <p className="text-xs">USE PROMO CODE</p>
            <Button className="mt-1 px-8 py-3 bg-gray-700 border-2 tracking-widest text-sm text-white font-semibold font-sans">
              DINEWEEKLYSALE
            </Button>
          </div>
        </div>
        <div className=" bg-[#efe1c7]">
          <div className="p-5">
            <p>Flex Sweatshirt</p>
            <p className="text-base">
              <span className="line-through text-sm mr-1">$100.00</span> $75.00
            </p>
          </div>
          <Image
            alt="promotion Discount Shirt"
            src={promoDiscountShirtImg}
            width={220}
            height={220}
            className="mx-auto"
          />
        </div>
        <div className=" bg-[#d7d7d9]">
          <div className="p-5">
            <p className="capitalize">Flex Push button bombar</p>
            <p className="text-base">
              <span className="text-sm line-through mr-1">$225.00</span>$190.00
            </p>
          </div>
          <Image
            alt="Promotion Discount Jacket Image"
            src={promoDiscountJacketImg}
            width={220}
            height={220}
            className="mx-auto"
          />
        </div>
      </div>
    </Wrapper>
    // <section className="flex flex-col">

    //   <section className="flex justify-between gap-5 mt-4 ml-16 mr-16">
    //     <div className="flex flex-col w-1/2 ">
    //       <div className=" flex flex-row border-2 bg-gray-300 h-1/2 ">
    //         <div className="font-bold w-3/4 pt-16 pl-8">
    //           <span className=" text-4xl">GET UP TO </span>
    //           <span className=" text-5xl">60%</span>
    //           <p className="text-gray-800 text-2xl font-medium font-serif ">
    //             For the summer season
    //           </p>
    //         </div>
    //         <div className="w-1/2 ml-10  flex justify-end">
    //           <Image src={promo60Img} alt="promo 60% Image" />
    //         </div>
    //       </div>
    //       <div className="mt-2 flex flex-col h-1/2 justify-center items-center border-2 bg-gray-900 text-white">
    //         <h2 className="text-5xl font-serif font-bold">GET 30% Off</h2>
    //         <p className="mt-4">USE PROMO CODE</p>
    //         <Button className="mt-3 p-5 bg-gray-700 border-2 text-2xl font-semibold font-sans">
    //           DINEWEEKLYSALE
    //         </Button>
    //       </div>
    //     </div>
    //     <div className="w-1/4 bg-green-300 text-lg">
    //       <div className=" mt-7 pl-5 ">
    //         <p>Flex Sweatshirt</p>
    //         <span className="text-decoration-line: line-through">$100.00</span>
    //         <span className="pl-3 font-bold text-xl">$75.00</span>
    //       </div>
    //       <div className="flex justify-center items-center">
    //         <Image src={promoDiscountShirtImg} alt="promotion Discount Shirt" />
    //       </div>
    //     </div>
    //     <div className="w-1/4 bg-gray-300 text-lg">
    //       <div className=" mt-7 pl-5 ">
    //         <p>Flex Push Button Bomber</p>
    //         <span className="text-decoration-line: line-through">$225.00</span>
    //         <span className="pl-3 font-bold text-xl">$190.00</span>
    //       </div>
    //       <div className="flex justify-center items-center">
    //         <Image
    //           src={promoDiscountJacketImg}
    //           alt="Promotion Discount Jacket Image"
    //         />
    //       </div>
    //     </div>
    //   </section>
    // </section>
  );
};

export default PromoList;
