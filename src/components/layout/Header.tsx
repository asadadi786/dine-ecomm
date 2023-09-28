"use client";

import logo from "images/logo.webp";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import StripeCheckOutButton from "../CheckOut";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { fetchData } from "@/store/slice/cartSlice";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
//import { Input } from "@/components/ui/input";

const Header = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData(userId)); // Dispatch the fetchData action with the user id
  }, [dispatch, userId]);

  //added code from other project
  const [nav, setNav] = useState(false);
  const cartValue = useAppSelector((state) => state.cart.totalQuantity);
  //const cartValue = useSelector((state: RootState) => state.cart.totalQuantity);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav>
      {/* Large Srceen */}
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <Link href="/">
            <Image src={logo} alt="DineMarketingLogo" className="w:40px" />
          </Link>
        </div>
        <div>
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
        </div>
        {/* <Input /> */}
        <div className="border border-gray-300 rounded-md px-2 bg-white hidden lg:flex items-center w-[30%]">
          <AiOutlineSearch size={15} />
          <input
            type="text"
            placeholder="What you looking for"
            className="outline-none ml-1"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-2 bg-white hidden lg:flex items-center w-[30%]">
          <AiOutlineSearch size={15} />
          <input
            type="text"
            placeholder="What you looking for"
            className="outline-none ml-1"
          />
        </div>
        <div className="hidden lg:flex items-center justify-between gap-2">
          <UserButton afterSignOutUrl="/" />
          <Link href={"/cart"} onClick={handleNav}>
            <div className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
              {/* <AiOutlineShoppingCart size={25} /> */}
              <span className="absolute top-0 w-5 h-5 text-xs text-center text-white bg-red-500 rounded-full right-1">
                {cartValue}
              </span>
              <ShoppingCart className="w-6 h-6" />
            </div>
          </Link>
        </div>

        <div className="flex justify-center items-center lg:hidden">
          <AiOutlineMenu onClick={handleNav} size={25} />
        </div>
      </div>
      {/* Mobile Srceen */}
    </nav>
  );
};

export default Header;
