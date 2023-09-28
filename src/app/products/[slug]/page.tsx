import ProductCart from "@/components/ProductCart";
import { client } from "@/lib/sanityClient";
//import { Image as IImage } from "sanity";
import Image from "next/image";
//import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import Quantity from "@/components/Quantity";
import AddToCart from "@/components/AddToCart";
import { Product, SanityProducts } from "@/interfaces";
import ImageComponent from "@/components/utils/ImageComponent";
import Wrapper from "@/components/Wrapper";
import { auth } from "@clerk/nextjs";

type Props = {
  params: {
    slug: string;
  };
};

const getProductData = async ({ params }: Props) => {
  const res =
    await client.fetch(`*[_type=="product" && slug.current == "${params.slug}"][0]{
      _id,
        price,
        title,
        image,
        tagLine,
        category -> {
          name
        },
    }`);

  // console.log("sanity result: " + JSON.stringify(res));
  return res;
};

// const getProductDetail = async (id: string) => {
const getProductDetail = async ({ params }: Props) => {
  // const products: SanityProducts[] = await getProductData({ params });
  const products: Product = await getProductData({ params });
  //return products.filter((product) => product.slug === params.slug);
  return products;
};

const sizes = ["xs", "sm", "md", "lg", "xl"];

// export default async function Page({ params }: { params: { id: string } }) {
const SingleProduct = async ({ params }: Props) => {
  const product: Product = await getProductDetail({ params });
  const { userId: user_id } = auth();
  console.log("userrId = " + user_id);
  return (
    <Wrapper>
      <h1>Design Correction req</h1>
      {/*Left Side */}

      <div className="grid grid-cols-[5rem,1fr] bs:grid-cols-[10rem,1fr] lg:grid-cols-[10rem,1fr,1fr] px-10 lg:px-0 gap-1">
        <ImageComponent product={product} />

        <div className="flex flex-col justify-start items-start col-span-2 lg:col-span-1 lg:ml-5">
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
                {sizes.map((size, index) => {
                  return (
                    <div
                      key={index}
                      className="w-6 h-6 mt-2 duration-300 border rounded-full _center hover:shadow-xl"
                    >
                      <span className="text-[10px] text-gray-600 text-center font-semibold">
                        {size}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/*Quantity*/}
              {/* <div className="flex mt-6 item-center gap-x-3">
                <h3 className="text-[10px] text-semibold">Quantity:</h3>
                <Quantity />
              </div> */}
              {/*AddTo Cart & Added Products calculated Price */}

              <div className="flex mt-5 item-center gap-x-4">
                <AddToCart
                  product={product}
                  qty={1}
                  userId={user_id as string}
                />
                <h2 className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProduct;

// export async function generateStaticParams() {
//   const query = `*[_type == "product"]{
//     slug {
//       current
//     }
//   }`;
//   const res: SanityProducts[] = await client.fetch(query);

//   return res.map((product) => ({
//     slug: product.slug.current,
//   }));
// }
