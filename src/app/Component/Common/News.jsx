import React from 'react'
import  Link from 'next/link';
import Image from 'next/image';

const News = ({img, investment, news,date, title}) => {
  return (
    <div>
      <main className="w-full relative bg-white border-[1px] h-[28vw] border-gray-400 max-w-[27vw] m-vw">
        <section className="w-full relative">
        <Image
  src={img}
  alt="remote"
  width={500} // Adjust the width to fit your design (in pixels)
  height={300} // Adjust the height as needed (in pixels)
  className="w-full h-[15vw]"
  loading="lazy" // Lazy load for better performance
/>
          <div className="-mt-4vw ml-vw">
          {investment && <Link href="" className="bg-pink-400 text-white text-[.9vw] p-[.7vw] text-center" >{investment}</Link>} 
          <Link href="#" className="bg-pink-400 ml-vw text-white text-[.9vw] p-[.7vw] text-center" >{news}</Link>
          </div>
          <section className='xl:mt-2vw  md:mt-2vw sm:mt-0.3vw p-[1.5vw]'>
            <p className='text-black text-vw'>{date}</p>
            <p className='text-black mt-vw text-vw font-semibold'>{title}</p>
            <Link href="#" className='text-[#152347] xl:mt-0.5vw lg:mt-0.5vw md:mt-0.5vw sm:-mt-0.3vw text-vw'>Read More</Link>
          </section>
        </section>
      </main>
    </div>
  )
}

export default News
