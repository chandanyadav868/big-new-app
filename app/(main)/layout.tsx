import Footer from "../../components/Footer";
import ReducerProvider from "../../components/ReducerProvider";
import HeaderWrapper from "../../components/HeaderWrapper";
import Banner_width_height_728_90 from "@/components/adsComponents/banner/adult/banner_width_height_728_90";

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string }>
}) {

  return (
    <html lang="en">
      <body >
        <ReducerProvider>
          <HeaderWrapper />
          
          <Banner_width_height_728_90/>

          {children}
          <Footer />
        </ReducerProvider>
      </body>
    </html>
  );
}





// export default function RootLayout({
//   children,
//   params : {[keys:string]}
// }: Readonly<{
//   children: React.ReactNode;
// }>) {