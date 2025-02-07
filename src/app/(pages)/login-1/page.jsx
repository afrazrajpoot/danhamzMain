'use client'
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { download_app, signup_content } from '@/app/Data';


import Login from './Login';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

const Signup = () => {
  const [loginContainer, setLoginContainer] = useState(false)
    const images = ["/images/carousel-1.jpg", "/images/carousel-2.jpg", "/images/carousel-3.jpg"];

    const settings = { dots: false, arrows: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000 };
 
  return (
     <div className='relative w-full h-screen overflow-x-hidden '>
     <main className='relative w-full h-full'>
     <Link href='/' className='absolute top-2vw left-2vw cursor-pointer'>
     <Icon icon="majesticons:arrow-left-line"className='relative text-4vw text-white cursor-pointer'/>
     </Link>
     <Image
  src="/images/bg-valu.jpg"
  alt="signin"
  className="w-full"
  width={1920} // Set the width according to the image's natural dimensions
  height={1080} // Set the height according to the image's natural dimensions
  layout="responsive" // Makes the image responsive and adapts to the container size
  priority // Optional: Preload the image if it's critical for the page
/>
        <article className='w-full absolute top-2vw col-center'>
          <section className='col-center w-full p-2vw'>
            <h1 className='text-[#152347] italic text-3vw font-medium'>Keeping <span className=''>landlords</span> connected with their properties</h1>
            <p className='text-white font-medium text-[1.3vw] text-center w-full max-w-[60vw]'>PropertyFile is an online platform designed to keep you informed & updated on your properties whether you’re selling, letting or renting.</p>
            <button className='text-white text-vw font-semibold bg-[#152347] hover:bg-pink-400 text-center p-0.3vw mt-vw rounded-md w-full max-w-[10vw]' onClick={() => setLoginContainer(true)}>Sign In</button>
          <div className="relative cursor-pointer">
          <Image
  src="/images/macbook.png"
  alt="signin"
  className="w-full max-w-[50vw] mt-2vw"
  width={800} // Set the width according to the image's natural dimensions
  height={600} // Set the height according to the image's natural dimensions
  layout="responsive" // Makes the image responsive
  priority // Optional: Preload the image if it's important for the page
/>
            <section className='w-full absolute top-2vw left-[6.5vw] mt-vw max-w-[35vw] ml-vw'>
                <Slider {...settings}>
                  {images.map((image, index) => (
                    <div key={index}>
                 <Image
  src={image}
  alt={`slide-${index}`}
  className="w-full rounded-lg max-w-[47vw]"
  width={800}  // Set width according to the image's natural size
  height={600} // Set height according to the image's natural size
  loading="lazy" // Lazy loading for optimization
  layout="responsive" // Makes the image responsive
/>
                    </div>
                  ))}
                </Slider>
              </section>
          </div>
          </section>
        </article>
        {/* signin container */}
        {loginContainer && (
          <main className='fixed inset-0 flex mt-4vw justify-center items-center z-50'>
            <div className=' w-full max-w-[40vw] shadow-gray-500 shadow-2xl'>
              <Login onCancel={() => setLoginContainer(false)} />
            </div>
          </main>
        )}

        {/* property file */}
        <article className='w-full bg-white col-center p-3vw'>
            {
                signup_content?.map((content, index) => (
                    <div key={index} className='col-center'>
                        <h1 className='text-black italic text-2vw font-medium'>{content.title}</h1>
                        <p className='text-gray-800 mt-vw text-vw text-center w-full max-w-[40vw]'>{content.info}</p>
                        <section className="grid grid-cols-2 gap-5 mt-vw">
                            {content?.content?.map((item, index) =>(
                                <div className="w-full col-center max-w-[40vw]" key={index}>
                               <Image
  src={item?.img}
  alt={item?.title}
  className="w-full h-[10vw] max-w-[10vw]"
  width={160}  // Set width in pixels, e.g., 160px (adjust as necessary)
  height={160} // Set height in pixels, e.g., 160px (adjust as necessary)
  loading="lazy" // Lazy loading for optimization
  layout="intrinsic" // Maintains the image aspect ratio
/>
                                <h1 className='text-black itali mt-vw text-[1.7vw] font-semibold'>{item?.title}</h1>
                                <p className='text-gray-800 mt-vw font-medium text-vw text-center w-full max-w-[27vw]'>{content.info}</p>
                                <Link href={'#'} className="p-0.4vw border-[0.2vw] hover:bg-[#152347] hover:text-white text-center border-black text-[#152347] font-medium mt-vw">Find Out More</Link>
                                </div>
                            ))}
                        </section>
                    </div>
                ))
            }
          </article>
          {/* banner ---  */}
          <div className="banner flex w-full justify-center items-center bg-pink-400 p-4vw">
          <h1 className="text-center text-white text-[1.3vw] font-medium">Not registered for a PropertyFile account yet? Get in touch with us today.</h1>
        </div>
        {/* instant access */}
        <section className='relative w-full bg-purple-500'>
                    <div className="relative w-full">
                    <Image
  src="/images/pc-1.jpg"
  alt="about"
  className="w-full h-20vw"
  width={500}  // Set width in pixels, adjust as needed
  height={500} // Set height in pixels, adjust as needed
  loading="lazy" // Lazy loading for optimization
  layout="intrinsic" // Maintains the image aspect ratio
/>
                        <div className="absolute top-3vw p-vw left-10vw w-full max-w-[35vw]">
                            <h1 style={{lineHeight: "2.7vw"}} className='text-white text-[2.2vw] font-medium w-full max-w-[30vw]'>Instant access from any location on any device</h1>
                            <p className='text-white text-vw mt-[1.2vw] font-medium w-full max-w-[30vw]'>PropertyFile is designed and built so that you can securely log into the system and access your vital information whenever and where ever you may need it.</p>
                        </div>
                    </div>
            </section>
            {/* download */}
            <div className="flex justify-center items-center w-full bg-[#efeff4] p-2vw">
            <section className='w-full max-w-[85vw]'>
              {download_app?.map((item, index) => (
                <div className="flex justify-between items-center p-vw" key={index}>
                      <section className='w-[40vw]'>
                      <Image
  src={item?.img}
  alt="remote"
  className="w-full h-[30vw]"
  width={500}  // Set width in pixels, adjust as needed
  height={500} // Set height in pixels, adjust as needed
  loading="lazy" // Lazy loading for optimization
  layout="intrinsic" // Maintains the image aspect ratio
/>
                  </section>
                  <section className='w-[40vw]'>
                    <p className='text-[#152347] text-[2.1vw] font-semibold'>{item?.title}</p>
                    <p className='text-gray-700 text-vw w-full max-w-[35vw]'>{item?.info}</p>
                    <div className="mt-2vw flex items-center">
                    <Image
  src="/images/appstore.png"
  alt="appstore"
  className="w-full max-w-[14vw] cursor-pointer h-4vw"
  width={150} // Adjust based on your actual image size
  height={50} // Adjust based on your actual image size
  loading="lazy" // Lazy load the image
  layout="intrinsic" // Keep aspect ratio consistent
/>

<Image
  src="/images/playstore.png"
  alt="playstore"
  className="max-w-[14vw] h-4vw cursor-pointer ml-2vw"
  width={150} // Adjust based on your actual image size
  height={50} // Adjust based on your actual image size
  loading="lazy" // Lazy load the image
  layout="intrinsic" // Keep aspect ratio consistent
/>

                    </div>
                  </section>
                </div>
              ))}
            </section>
            </div>
             {/* banner ---  */}
          <div className="banner flex w-full justify-center items-center bg-pink-400 p-4vw">
          <h1 className="text-center text-white text-[1.3vw] font-medium">Instant access to your information 24 hours a day, 7 days a week.</h1>
        </div>
          {/* footer ---  */}
          <footer className="banner flex w-full justify-between items-center bg-[#152347] p-2vw">
          <Image
  src="/images/pr_file.png"
  alt="property"
  className="w-full max-w-[15vw]"
  width={300} // Adjust based on your image size
  height={200} // Adjust based on your image size
  loading="lazy" // Lazy load the image
  layout="intrinsic" // Keeps the aspect ratio consistent
/>
            <Link href="#">
            <h1 className="text-right text-white text-vw cursor-pointer font-medium">Terms Of Use • Privacy Policy • Cookie Policy <br /> Proudly part of the Property Software Group • Copyright © 2023</h1>
            </Link>
        </footer>
      </main>
     </div>
  );
}

export default Signup;
