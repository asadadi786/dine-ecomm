import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import ProductCart from "@/components/ProductCart";
import { SanityProducts } from "@/interfaces";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    _id,
      price,
      title,
      image,
      category -> {
        name
      },
      slug {
        current,
      },
  }`);

  return res;
};

const AllProducts = async () => {
  const products: SanityProducts[] = await getProductData();
  console.log("In All products page");
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
