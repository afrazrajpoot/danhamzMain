import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./UserContext/UserContext";
import Providers from "@/redux/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Danhamz",
  description: "Welcome to danhamz, your trusted property lettings agency specializing in rental homes, apartments, and commercial properties. We offer personalized service, expert advice, and a wide range of properties to meet your needs. Whether you're a landlord or a tenant, our team is here to make the lettings process seamless and stress-free. Discover your perfect property today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
         <UserProvider>
        {children}
         </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
