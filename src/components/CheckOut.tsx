"use client";
import { Product } from "@/interfaces";
import getStripePromise from "@/lib/stripe";

interface IProps {
  products: Product[];
}

const product = [
  {
    product: 1,
    name: "Stripe Product",
    price: 400,
    quantity: 3,
  },
  {
    product: 2,
    name: "Stripe Product 2",
    price: 500,
    quantity: 5,
  },
  {
    product: 3,
    name: "Stripe Product 3",
    price: 5000,
    quantity: 1,
  },
];

const StripeCheckOutButton = (props: IProps) => {
  console.log("props.product=" + JSON.stringify(props.products));
  const handleButton = async () => {
    console.log("handleButton: ");
    const stripe = await getStripePromise();
    console.log("after handleButton: ");
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(props.products),
    });
    const data = await response.json();
    console.log("data in checkout: " + data);
    if (data.session) {
      console.log("in if data.session in checkout: " + data.session);
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <div className="py-5">
      <button
        className="bg-green-500 py-3 px-3 rounded-md"
        onClick={handleButton}
      >
        Check Out
      </button>
    </div>
  );
};
export default StripeCheckOutButton;
