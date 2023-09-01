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

type IProps = {
  product: Product;
  qty: number;
  userId: string;
};

// const AddToCart: FC<{ item: SanityProducts }> = ({ item }) => {
const AddToCart = (props: IProps) => {
  const [qty, setQty] = useState(1);

  const GetDataFromDB = async () => {
    const res = await fetch(`/api/cart/${props.userId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data with userId");
    }

    const data = await res.json();

    console.log(
      "In GetDataFromDB: data.cartItems" + JSON.stringify(data.cartItems)
    );
    return data;
  };

  const handleAddToCart = async () => {
    try {
      console.log("In handleAddToCart: ");
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          product_id: props.product._id,
          quantity: qty,
          user_id: props.product.userId,
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
      console.log("In handleCartUpdate: cartData: " + JSON.stringify(cartData));
      console.log(
        "In handleCartUpdate: cartItems: " + JSON.stringify(cartData.cartItems)
      );

      const existingItem = cartData.cartItems.find(
        (item: any) => item._id === props.product._id
      );

      console.log("existingItem: " + JSON.stringify(existingItem));

      console.log("props.product._id: " + props.product._id);
      if (existingItem) {
        console.log("In existingItem: " + JSON.stringify(existingItem));
        const newQuantity = existingItem.quantity + qty;
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
      <div>
        <Button onClick={addToCarts}>Add to Cart</Button>
      </div>
    </>
  );
};
export default AddToCart;
