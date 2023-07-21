import ProductCart from "@/components/ProductCart";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";

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

const getProductByCategory = async (category: string) => {
  const products: IProduct[] = await getProductData();
  return products.filter((product) => product.category.name === category);
};

export default async function Page({ params }: { params: { slug: string } }) {
  const result = await getProductByCategory(params.slug);
  return (
    <div className="grid grid-cols-[repeat(3,auto)] justify-center gap-x-10 py-10">
      {result.length > 0 ? (
        result.map((product, index) => (
          <div key={index}>
            <ProductCart item={product} />
          </div>
        ))
      ) : (
        <p>No Product Found</p>
      )}
    </div>
  );
}
