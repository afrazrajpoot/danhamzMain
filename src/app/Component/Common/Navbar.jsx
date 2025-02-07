'use client'
import React from "react";
import { navbar } from "@/app/Data";
import  Link  from 'next/link'
import Image from "next/image";

const Navbar = () => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = JSON.parse(localStorage.getItem("userLoginInfo"));
    }
     const admin = token?.admin ? token?.admin : "user";
    return (
        <>
            <nav className="bg-[#fff] z-50 flex justify-center items-center w-full">
                {navbar?.map((item, index) => {
                    return (
                        <main className="flex relative flex-col justify-center items-center w-full" key={index}>
                            <div className="flex justify-between p-[1.5vw] items-center w-full max-w-[90vw]">
                                <Link href={item?.link} className="flex items-center">
                                <Image
  src="/images/Danhamz_logo.gif"
  alt="Danhamz"
  width={300}  // Adjust to the desired width (for example 300px)
  height={100} // Adjust to the desired height (for example 100px)
  className="w-full max-w-[12vw]"
  loading="lazy"  // Lazy load the image for better performance
/>
                                </Link>
                                <section className="flex justify-evenly items-center w-full xl:max-w-[70vw] lg:max-w-[70vw] md:max-w-[70vw]">
                                    {item?.lists?.map((list, index) => {
                                        return (
                                            <main className="" key={index}>
                                                <div className="flex items-center cursor-pointer">
                                                    <Link className="" href={list?.link} target={list?.title === 'Auction' || list?.title === 'Nightly Lets' ? '_blank' : ''}>
                                                    <p className="text-[#152347] hover:text-amber-500 font-medium text-[1.5vw] xl:text-vw lg:text-vw md:text-vw capitalize fomt-medium">{list?.title}</p>
                                                    </Link>
                                                </div>
                                            </main>
                                        );
                                    })}
                                   {admin && admin === 'admin' ? <Link href='/cms' className="p-[0.7vw] bg-amber-500 hover:bg-amber-400 text-vw text-white w-fit rounded-md">Dashboard</Link>: !token && <Link href='/login' className="p-[0.7vw] bg-[#152347] hover:bg-[#1c2e5e] text-vw text-white w-fit rounded-md">Login</Link>}
                                </section>
                            </div>
                   </main>
                    );
                })}
            </nav>
        </>
    );
};

export default Navbar;
