import React from 'react'
import  Link  from 'next/link'
import Image from 'next/image'

const RightImageContainer = ({bg_color, title, info, img, title_color, info_color, button, btn_text, btn_bg, url}) => {
  return (
    <div>
          <div className={`flex justify-center items-center w-full ${bg_color} p-2vw`}>
            <section className='w-full max-w-[85vw]'>
                <div className="flex justify-between items-center p-vw">
                      <section className='w-[40vw]'>
                      <Image
  src={img || '/images/no_preview.jpg'} // Fallback image in case `img` is not available
  alt="remote"
  width={1600} // Adjust based on your image's aspect ratio
  height={900} // Adjust based on your image's aspect ratio
  className="w-full h-[30vw] object-cover"
  loading="lazy" // Lazy loading enabled by default
/>
                  </section>
                  <section className='w-[40vw]'>
                    <p className={` text-[1.9vw] ${title_color} font-semibold `}>{title}</p>
                    <p className={`${info_color} text-vw w-full max-w-[35vw]`}>{info}</p>
                    <div className="mt-2vw">
                    {button && <Link href={url || '#'} className={`p-vw ${btn_bg} ${btn_text} text-vw font-medium text-center`}>{button}</Link>}
                    </div>
                  </section>
                </div>
            </section>
            </div>
    </div>
  )
}

export default RightImageContainer