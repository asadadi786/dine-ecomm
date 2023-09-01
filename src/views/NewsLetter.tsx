import { Button } from "@/components/ui/button";
import React from "react";

const NewsLetter = () => {
  return (
    <div className="mt-48 flex justify-center items-center flex-col">
      <h1 className="font-bold text-4xl">Subscribe Our Newsletter</h1>
      <p className="text-gray-600 text-lg mt-6">
        Get the latest information and promo offers directly
      </p>
      <div className="flex mt-8">
        <input type="email" placeholder="Input email address" />
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default NewsLetter;
