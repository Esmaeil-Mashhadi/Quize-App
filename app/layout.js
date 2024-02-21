import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import ReduxProvider from "@/utils/ReduxProvider";
import NextProgress from "@/utils/NextProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "quiz",
  description: "quiz website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body  className={inter.className}>
       <ReduxProvider>
           <Layout>
           <NextProgress />
              {children}
          </Layout>
       </ReduxProvider>

       </body>
    </html>
  );
}
