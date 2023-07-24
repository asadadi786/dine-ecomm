"use client";

import logo from "images/logo.webp";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import StripeCheckOutButton from "../CheckOut";
//import { Input } from "@/components/ui/input";

const Header = () => {
  const cartValue = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <div className="flex justify-between items-center py-6 px-8">
      <Link href="/">
        <Image src={logo} alt="DineMarketingLogo" className="w:40px" />
      </Link>
      <ul className="flex gap-x-10">
        <li className="text-lg">
          <Link href="/category/Female">Female</Link>
        </li>
        <li className="text-lg">
          <Link href="/category/Male">Male</Link>
        </li>
        <li className="text-lg">
          <Link href="/category/kids">Kids</Link>
        </li>
        <li className="text-lg">
          <Link href="/products">All Products</Link>
        </li>
      </ul>
      {/* <Input /> */}
      <div>        <StripeCheckOutButton /></div>
      <div className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center relative">
        <span className="absolute right-1 top-0 rounded-full bg-red-500 h-5 w-5 text-white text-xs text-center">
          {cartValue}
        </span>
        <ShoppingCart className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Header;
