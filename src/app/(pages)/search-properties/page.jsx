'use client'

import React, { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/app/Component/Layout'
import BuySection from '@/app/Component/BuyAndRent/BuySection'
import RentProperty from '@/app/Component/BuyAndRent/RentProperty'
import PageAddress from '@/app/Component/Common/PageAddress'
import { useGlobalContext } from '@/app/UserContext/UserContext'
import Loading from '@/app/Component/Common/Loading'

const SearchPropertyContent = () => {
  const { showRentSection, setShowRentSection, SearchProperty } = useGlobalContext()
  
  // Use Next.js searchParams hook
  const searchParams = useSearchParams()
  
  // Get location from search params
  const location = searchParams.get('location')

  // Handle setting initial search type from localStorage if it exists
  useEffect(() => {
    const savedSearchType = localStorage.getItem('searchType')
    if (savedSearchType) {
      setShowRentSection(savedSearchType === 'rent')
    }
  }, [setShowRentSection])

  const handleRentClick = () => {
    setShowRentSection(true)
    localStorage.setItem('searchType', 'rent')
  }

  const handleBuyClick = () => {
    setShowRentSection(false)
    localStorage.setItem('searchType', 'buy')
  }

  return (
    <Layout>
      <PageAddress main="Home" mainLink="/" category="Property Search" />
      
      <section className='relative w-full flex items-center bg-[#fff] justify-evenly p-vw'>
        <div className="flex ml-[3vw] w-full max-w-[70vw] items-center">
          <p
            className={`text-[4.5vw] xl:text-[1.1vw] lg:text-[1.1vw] md:text-[1.1vw] text-center font-medium cursor-pointer ${
              showRentSection 
                ? 'text-blue-950 border-b-[2px] border-yellow-600' 
                : 'text-gray-700 hover:text-blue-950'
            }`}
            onClick={handleRentClick}
          >
            Rent
          </p>
          <p
            className={`text-[4.5vw] xl:text-[1.1vw] ml-[2vw] lg:text-[1.1vw] md:text-[1.1vw] text-center font-medium cursor-pointer ${
              !showRentSection 
                ? 'text-blue-950 border-b-[2px] border-yellow-600' 
                : 'text-gray-700 hover:text-blue-950'
            }`}
            onClick={handleBuyClick}
          >
            Buy
          </p>
        </div>
      </section>

      <article className='flex flex-col justify-center items-center w-full'>
        {showRentSection 
          ? <RentProperty location={location} /> 
          : <BuySection location={location} />
        }
      </article>
    </Layout>
  )
}

const SearchProperty = () => {
  return (
    <Suspense fallback={<Loading />}>
    <SearchPropertyContent />
    </Suspense>
  )
}


export default SearchProperty