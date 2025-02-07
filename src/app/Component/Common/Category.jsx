'use client'
import React from 'react'
import { categories } from '@/app/Data'
import Link from 'next/link'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const Category = () => {
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <span 
        onClick={onClick}
        className="text-vw text-black absolute cursor-pointer top-[32vw] md:top-[14vw] -left-2vw xl:-left-0.5vw lg:-left-2vw md:-left-2vw z-50"
      >
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className='text-5vw md:text-vw text-white rounded-full hover:bg-yellow-400 bg-yellow-500 p-[2.3vw] md:p-[0.7vw] text-center' 
        />
      </span>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <span 
        onClick={onClick}
        className="text-vw text-black absolute cursor-pointer top-[32vw] md:top-[14vw] -right-[1.5vw] xl:right-vw lg:right-vw md:right-vw"
      >
        <FontAwesomeIcon 
          icon={faArrowRight} 
          className='text-5vw xl:text-vw lg:text-vw md:text-vw text-white rounded-full hover:bg-yellow-400 bg-yellow-500 p-[2.3vw] md:p-[0.7vw] text-center' 
        />
      </span>
    );
  };

  const settings2 = {
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1248,
        settings: { slidesToShow: 4, slidesToScroll: 1 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className='bg-gray-100'>
      <div className="col-center p-4vw md:p-2vw">
        <h1 className='text-yellow-600 text-center mt-[5vw] md:mt-[1vw] text-[4.5vw] xl:text-3vw lg:text-3vw md:text-3vw font-medium'>
          Cities we cover
        </h1>
        <p className='text-center text-[#152347] text-[3.5vw] mt-[2vw] md:mt-[1vw] md:text-[1.5vw] w-full max-w-[80vw] md:max-w-[70vw]'>
          Danhamz are nationwide and can help you with your property requirement whenever you may be. We currently have main hubs in the following cities but we're extending our services to a city near you.
        </p>
      </div>

      <main className='col-center mt-[2vw] md:mt-[1vw] w-full p-3vw'>
        <div className="grid grid-cols-1 gap-2 ml-vw">
          <Slider {...settings2}>
            {categories?.map((category, index) => (
              <section key={index} className='relative rounded-lg bg-white w-full xl:max-w-[20vw] lg:max-w-[20vw] md:max-w-[20vw]'>
              <Image
  src={category.img}
  alt={category.title}
  loading="lazy"
  className="w-full rounded-t-lg object-cover"
  width={700}  // Adjust to match the natural size or the desired width for your layout
  height={500} // Adjust to match the natural size or the desired height for your layout
  layout="intrinsic" // Maintains the aspect ratio based on the provided width/height
  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 27vw, 27vw"  // Responsive size handling based on viewport width
/>
                <div className='mt-[7.5vw] md:mt-[1.5vw] pb-3vw xl:pb-2vw lg:pb-2vw md:pb-3vw col-center'>
                  <Link 
                    href={category?.url} 
                    className='text-[#ffff] bg-yellow-600 p-[1vw] lg:p-[0.7vw] rounded-md font-medium text-[4vw] xl:text-vw lg:text-vw md:text-vw hover:text-gray-200'
                  >
                    {category?.title}
                  </Link>
                </div>
              </section>
            ))}
          </Slider>
        </div>
      </main>
    </div>
  )
}

export default Category