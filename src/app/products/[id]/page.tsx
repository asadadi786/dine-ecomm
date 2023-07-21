import ProductCart from "@/components/ProductCart";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";

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

const getProductDetail = async (id: string) => {
  const products: IProduct[] = await getProductData();
  return products.filter((product) => product._id === id);
};

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getProductDetail(params.id);
  return (
    <div className="flex flex-row  mt-16 py-10 flex-wrap">
      {result.map((product) => (
        <div key={product._id} className="flex justify-between gap-6">
          <div>
            <Image
              width={300}
              height={500}
              className="max-h-[500px]"
              src={urlForImage(product.image).url()}
              alt={product.title}
            />
          </div>
          <div>
            Product Details
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
