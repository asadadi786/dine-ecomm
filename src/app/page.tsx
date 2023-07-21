import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import ProductCart from "../components/ProductCart";
import Hero from "@/views/Hero";
import ProductList from "@/views/ProductList";
import { dataset } from "../../sanity/env";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    _id,
      price,
      title,
      image,
      category -> {
        name
      }
  }`);

  return res;
};

interface IProduct {
  title: string;
  _id: string;
  description: string;
  price: number;
  image: IImage;
  category: {
    name: string;
  };
}

export default async function Home() {
  const data: IProduct[] = await getProductData();
  return (
    <>
      <div>
        <Hero />
        {/* Products */}
        <ProductList data={data} />
      </div>
    </>
  );
}
