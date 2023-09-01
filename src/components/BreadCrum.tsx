import Link from "next/link";
import React from "react";
import logo from "images/logo.webp";
import Image from "next/image";

const BreadCrum = () => {
  return (
    <section className="flex flex-row justify-between mt-32">
      <div>
        <Link href="/">
          <Image src={logo} alt="DineMarketingLogo" className="w:40px" />
        </Link>
        <span>Small, artisan label that offers a thoughtfully</span>
        <span>curated collection of high quality everyday</span>
        <span> essentials made.</span>
      </div>
      <div>
        breadCrum
        <nav className="bg-grey-light w-full rounded-md">
          <ol className="list-reset flex">
            <li>
              <Link
                href="#"
                className="mr-2 text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="mr-2 text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Library
              </Link>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">Data</li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default BreadCrum;
