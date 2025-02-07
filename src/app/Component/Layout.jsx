'use client'
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Topbar from './Common/Topbar';
import Navbar from './Common/Navbar';
import MobileNav from './Common/MobileNav';
import Footer from './Common/Footer';
import Chat from './Chat/Chat';

const Layout = ({ children }) => {
    const [show, setShow] = useState(false)
    return (
        <div className='w-full z-50'>
            <main className="bg-gray-100  relative w-full h-screen overflow-x-hidden">
                <Topbar />
                <div className="hidden xl:block lg:block md:block"> 
                    <Navbar />
                </div>
               <Icon icon={!show ? 'ph:list-bold' : 'basil:cancel-outline'} onClick={()=> setShow(!show)} className='text-[#ffff] z-50 block xl:hidden lg:hidden md:hidden text-[6vw] absolute top-2vw right-2vw ' />
                {show && <div className="block xl:hidden lg:hidden md:hidden"> {/* Hide on desktop */}
                    <MobileNav showSidebar={()=> setShow(!show)}/>
                </div>}
              {!show && <div className="">
                {children}
                <Footer />
                </div>}
                <div className="fixed z-50 bottom-[15vw] md:bottom-[2vw] right-[2vw]">
                <Chat />
                </div>
            </main>
        </div>
    );
};

export default Layout;
