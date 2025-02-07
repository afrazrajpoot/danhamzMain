import React from 'react'
import  Link  from 'next/link'
import Image from 'next/image'

const Testimonial = ({img, title, url}) => {
  return (
    <div>
        <main className="w-full max-w-[26vw] h-16vw relative overflow-hidden">
      <Link href={url} className="w-full relative block">
        <div className="image-container">
        <Image
  src={img}
  alt={title}
  width={500}  // Set the appropriate width for your image (in pixels)
  height={300} // Set the appropriate height for your image (in pixels)
  className="w-full"
  loading="lazy" // Enables lazy loading
/>
          <h1 className="font-medium text-white absolute bottom-2vw left-2vw text-[1.5vw]">{title}</h1>
        </div>
      </Link>
    </main>
    </div>
  )
}

export default Testimonial