import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import ProductCart from "@/components/ProductCart";

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

const AllProducts = async () => {
  const products: IProduct[] = await getProductData();
  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-10 py-10">
      {products.map((product, index) => (
        <div key={index}>
          <ProductCart item={product} />
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
