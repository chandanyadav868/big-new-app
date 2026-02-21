import Footer from "../../components/Footer";
import ReducerProvider from "../../components/ReducerProvider";
import HeaderWrapper from "../../components/HeaderWrapper";
import Banner_width_height_728_90 from "@/components/adsComponents/banner/adult/banner_width_height_728_90";
import Banner_width_height_160_600 from "@/components/adsComponents/banner/simple/banner_width_height_160_600";

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string }>
}) {

  return (
    <html lang="en">
      <body>
        <div className="max-[720px]:hidden">
          {/* ads */}
          <Banner_width_height_160_600/>
        </div>
        <main>
          {/*  */}
          <Banner_width_height_728_90 />
          <ReducerProvider>
            <HeaderWrapper />
            {children}
            <Footer />
          </ReducerProvider>
        </main>

        <div className="max-[720px]:hidden">
          {/* ads */}
          <Banner_width_height_160_600/>
        </div>
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