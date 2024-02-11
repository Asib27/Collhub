"use client";

import "@/globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { ModalContextProvider } from "@/contexts/ModalContext";
import ModalProvider from "@/providers/ModalProvider";
import ModalBg from "@/app/ui/common/ModalBg";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={""}>
        <div className="">
          <NextTopLoader
            color={"#e36263"}
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            zIndex={1600}
            showAtBottom={false}
          />
          <Toaster />
        </div>
        <ModalContextProvider>
          <ModalProvider>
            <div className="font-rubik relative min-h-screen bg1 content1">
              {children}
              <ModalBg />
            </div>
          </ModalProvider>
        </ModalContextProvider>
      </body>
    </html>
  );
}
