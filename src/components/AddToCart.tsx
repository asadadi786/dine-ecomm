"use client";
// import {button} from './ui/button';
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";

const AddToCart: FC<{ item: any }> = ({ item }) => {
  const handleAddToCart = async () => {
    const res = await fetch("api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: item._id,
      }),
    });

    const result = await res.json();
    console.log(result);
  };

  const dispach = useDispatch();
  const addItem = () => {
    dispach(cartActions.addToCart({ quantity: 1 }));
    toast.success("Product Added Successfully");
  };
  return (
    <>
      <Button onClick={addItem}>Add to Cart</Button>
    </>
  );
};
export default AddToCart;
