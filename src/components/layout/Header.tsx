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
    <div className="flex items-center justify-between px-8 py-6">
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

      <div className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
        <span className="absolute top-0 w-5 h-5 text-xs text-center text-white bg-red-500 rounded-full right-1">
          {cartValue}
        </span>
        <ShoppingCart className="w-6 h-6" />
      </div>
      <StripeCheckOutButton />
    </div>
  );
};

export default Header;
