import Footer from "../../components/Footer";
import ReducerProvider from "../../components/ReducerProvider";
import HeaderWrapper from "../../components/HeaderWrapper";

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