"use client";

// import {button} from './ui/button';
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";
import StripeCheckOutButton from "@/components/CheckOut";
import { Product, SanityProducts } from "@/interfaces";
import { product } from "../../sanity/product";
import { useAppDispatch } from "@/store/store";
import Quantity from "./Quantity";

type IProps = {
  product: Product;
  qty: number;
  userId: string;
};

// const AddToCart: FC<{ item: SanityProducts }> = ({ item }) => {
const AddToCart = (props: IProps) => {
  console.log("Quantity: " + props.qty);
  const [qty, setQty] = useState(1);

  //const [qunatityNum, setQuantityNum] = useState(1);

  console.log("Quantity state: " + qty);
  console.log("userrId = " + props.userId);

  const dispatch = useAppDispatch();

  const subtract = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const GetDataFromDB = async () => {
    const res = await fetch(`/api/cart/${props.userId}`);

    if (!res.ok) {
      console.log("Failed to fetch data with userId: " + res);
      throw new Error("Failed to fetch data with userId: " + res);
    }

    const data = await res.json();
    console.log("data: " + JSON.stringify(data));
    return data;
  };

  const handleAddToCart = async () => {
    try {
      console.log("In handleAddToCart: ");
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          product_id: props.product._id,
          product_title: props.product.title,
          quantity: qty,
          price: props.product.price,
          totalPrice: props.product.price * props.qty,
        }),
      });
      console.log("result: " + JSON.stringify(res));
      const result = await res.json();
      console.log("Add to Cart = " + result);

      if (!res.ok) {
        throw new Error("Failed to add data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartUpdate = async () => {
    try {
      const cartData = await GetDataFromDB();
      //console.log("In handleCartUpdate: cartData: " + JSON.stringify(cartData));
      // console.log(
      //   "In handleCartUpdate: cartItems: " + JSON.stringify(cartData.cartItems)
      // );

      const existingItem = cartData.cartItems.find(
        (item: any) => item._id === props.product._id
        
      );

      console.log("existingItem: " + JSON.stringify(existingItem));

      console.log("props.product._id: " + props.product._id);
      if (existingItem) {
        console.log("In existing item if ");
        const newQuantity: number = existingItem.quantity + qty;
        const newTotalPrice = props.product.price * newQuantity;

        const res = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            product_id: props.product._id,
            quantity: newQuantity,
            price: newTotalPrice,
          }),
        });
        console.log("handleCartUpdate: " + JSON.stringify(res));
        if (!res.ok) {
          console.log("!res in handleCartUpdate: ");
          throw new Error("Failed to update data");
        }
      } else {
        console.log("In else handleAddToCart: ");
        await handleAddToCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispach = useDispatch();
  const addToCarts = () => {
    toast.promise(handleCartUpdate(), {
      loading: "Adding data to Cart",
      success: "Product Added Successfully",
      error: "Failed to add data to Cart",
    });
    //success("Product Added Successfully");
    dispach(cartActions.addToCart({ product: props.product, quantity: qty }));
  };

  return (
    <>
      <div className="flex item-center gap-x-2">
        {/*Minus */}
        <button
          className="w-6 h-6 border rounded-full _center"
          onClick={() => {
            setQty(qty <= 1 ? 1 : qty - 1);
          }}
        >
          -
        </button>
        {/*Number */}
        <span className="text-sm">{qty}</span>
        {/*Plus */}
        <button
          className="w-6 h-6 border rounded-full _center"
          onClick={() => {
            setQty(qty + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <Button onClick={addToCarts}>Add to Cart</Button>
      </div>
    </>
  );
};
export default AddToCart;
