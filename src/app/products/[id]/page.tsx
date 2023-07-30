import ProductCart from "@/components/ProductCart";
import { client } from "@/lib/sanityClient";
import { Image as IImage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import Quantity from "@/components/Quantity";
import AddToCart from "@/components/AddToCart";

const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
      _id,
        price,
        title,
        image,
        tagLine,
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
  tagLine: string;
  category: {
    name: string;
  };
}

const getProductDetail = async (id: string) => {
  const products: IProduct[] = await getProductData();
  return products.filter((product) => product._id === id);
};

const sizes = ["xs", "sm", "md", "lg", "xl"];
export default async function Page({ params }: { params: { id: string } }) {
  const result = await getProductDetail(params.id);
  return (
    <div className="flex flex-row flex-wrap py-10 mt-16">
      {result.map((product) => (
        <div key={product._id} className="flex justify-between gap-6">
          {/*Left Side */}
          <div>
            <Image
              width={300}
              height={500}
              className="max-h-[500px]"
              src={urlForImage(product.image).url()}
              alt={product.title}
            />
          </div>
          {/*Right Side */}
          <div>
            <div>
              <h1 className="text-2xl">{product.title}</h1>
              <h2 className="text-base font-semibold text-gray-400">
                {product.tagLine}
              </h2>
            </div>
            <div>
              <h3 className="mt-6 text-xs font-semibold">SELECT SIZE</h3>
              {/*Sizes*/}
              <div className="flex gap-x-3">
                {sizes.map((size) => {
                  return (
                    <div className="w-6 h-6 mt-2 duration-300 border rounded-full _center hover:shadow-xl">
                      <span className="text-[10px] text-gray-600 text-center font-semibold">
                        {size}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/*Quantity*/}
              <div className="flex mt-6 item-center gap-x-3">
                <h3 className="text-[10px] text-semibold">Quantity:</h3>
                <Quantity />
              </div>
              {/*AddTo Cart & Added Products calculated Price */}

              <div className="flex mt-5 item-center gap-x-4">
                <AddToCart />
                <h2 className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
