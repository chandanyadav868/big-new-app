import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";


export const metadata: Metadata = {
    title: "News Website - Human Talking",
    description: "This is the website for getting trending, latest news",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: `${process.env.WEBSITE_URL}`,
    },
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
        other: [
            {
                rel: "mask-icon",
                url: "/safari-pinned-tab.svg",
                color: "#0f172a",
            },
        ],
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* <!-- Google Tag Manager --> */}
                <script>
                    {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PTT8LKVV');`}
                </script>

                {/* <!-- End Google Tag Manager --> */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-SBKV8PB2QN"></script>
                <script>
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-SBKV8PB2QN');
                    `}
                </script>

            </head>
            <body>
                {/* <!-- Google Tag Manager (noscript) --> */}
                <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTT8LKVV"
                        height="0" width="0" style={{ display: "none", visibility: "hidden" }}>
                    </iframe>
                </noscript>
                {/* <!-- End Google Tag Manager (noscript) --> */}
                {children}
            </body>
        </html>
    );
}
