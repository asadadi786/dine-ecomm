import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Providers from "@/components/utils/Provider";
import Header from "@/components/layout/Header";
import { ClerkProvider, auth } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
//const sora = Sora({subsets:["latin"], style:"normal"})

export const metadata = {
  title: "Dine Marketing",
  description: "Ecommerce Shopping Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* <body className={sora.className}> */}
          <Providers>
            <Header userId={userId as string} />
            <main className="px-8">{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
