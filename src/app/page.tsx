import { Image as IImage } from "sanity";
import Hero from "@/views/Hero";
import ProductList from "@/views/ProductList";
import { dataset } from "../../sanity/env";
import PromoList from "@/views/PromotList";
import ProductContent from "@/views/ProductContent";
import NewsLetter from "@/views/NewsLetter";
import BreadCrum from "@/components/BreadCrum";
import { SanityProducts } from "@/interfaces";

// const getProductData = async () => {
//   const res = await client.fetch(`*[_type=="product"]{
//     _id,
//       price,
//       title,
//       image,
//       category -> {
//         name
//       },slug {
//         current,
//       }
//   }`);

//   return res;
// };

export default async function Home() {
  // const data: SanityProducts[] = await getProductData();
  return (
    <>
      <div>
        <Hero />
        {/* Products */}
        <PromoList />
        <ProductList />
        <ProductContent />
        <NewsLetter />
        <BreadCrum />
      </div>
    </>
  );
}
