'use client'
import React from 'react'
import Layout from '@/app/Component/Layout'
import PageAddress from '@/app/Component/Common/PageAddress'
import { hassleFreeRefub, howITWorks,  propOtimisation, responseRefurbish, strategicApproach, trustedTeam } from '@/app/Data'
import ListInfoContainer from '@/app/Component/TextAndImageContainer/ListInfoContainer'
import ListInfoContainer2 from '@/app/Component/TextAndImageContainer/ListInfoContainer2'

import { useMediaQuery } from 'react-responsive';
import RatingsContainer from '@/app/Component/RatingsContainer'
import Link from 'next/link'

const Refurbishment = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div>
      <Layout>
      <PageAddress main='Home' category='Danhamz Management' subCategory='Refubs & Property Optimisation' mainLink='/' /> 
       <article className="w-full pt-[10vw] md:pt-[3vw] bg-white">
        {propOtimisation?.map((item, index) => (
          isMobile 
            ? <ListInfoContainer {...item} key={index} />
            : <ListInfoContainer2 {...item} key={index} />
        ))}
      </article>
      <article className="w-full bg-gray-100">
        {responseRefurbish?.map((item, index) => (
          <ListInfoContainer {...item} key={index} />
        ))}
      </article>
      <article className="w-full bg-white">
        {howITWorks?.map((item, index) => (
          isMobile 
            ? <ListInfoContainer {...item} key={index} />
            : <ListInfoContainer2 {...item} key={index} />
        ))}
      </article>
      <article className="w-full bg-gray-100">
        {strategicApproach?.map((item, index) => (
          <ListInfoContainer {...item} key={index} />
        ))}
      </article>
      <article className="w-full bg-white">
        {hassleFreeRefub?.map((item, index) => (
          isMobile 
            ? <ListInfoContainer {...item} key={index} />
            : <ListInfoContainer2 {...item} key={index} />
        ))}
      </article>
      <article className="w-full bg-gray-50">
        {trustedTeam?.map((item, index) => (
          <ListInfoContainer {...item} key={index} />
        ))}
      </article>
      <div className="w-full">
          <RatingsContainer />
         </div>
      <div className="p-3vw bg-[#152347] col-center">
        <h1 className='text-white text-[3.6vw] md:text-[1.6vw] font-medium text-center w-full max-w-[80vw] md:max-w-[100%]'>
        To find out more, speak to our friendly team on 0113 204 2900
        </h1>
        <Link href='/contact' className='mt-2vw text-[2.5vw] md:text-vw  text-center p-[0.7vw] hover:bg-amber-500 rounded-sm w-full max-w-[12vw] bg-amber-400 text-white'>Call Us</Link>
      </div>
      </Layout>
    </div>
  )
}

export default Refurbishment