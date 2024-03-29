"use client";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-0 bg-[#F8FAFB]  w-screen h-screen">
        <ThemeProvider>{children}</ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
