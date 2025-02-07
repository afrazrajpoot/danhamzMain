'use client'
import React, { useEffect } from 'react'
import Layout from '@/app/Component/Layout'
import { Icon } from '@iconify/react'

import { useRouter } from 'next/navigation'

const Confirmation = () => {
    const navigate = useRouter()
    useEffect(() => {
        setTimeout(() => {
            navigate.push('/')
        }, 5000);
    }, [])
  return (
    <Layout>
        <main className='bg-white w-full h-[60vw] md:h-[30vw] flex justify-center items-center'>
            <div className='w-full max-w-[70vw] md:max-w-[50vw] italic bg-[#152347] rounded-[0.7vw] text-white'>
                <h1 className='text-center flex items-center justify-center text-6vw font-medium'>Thank you! <Icon icon="mingcute:emoji-fill" className="text-[3.5vw] md:text-[1.5vw] ml-0.5vw text-amber-500" />  </h1>
                <p className='text-center text-4vw md:text-2vw italic font-medium mt-2vw'>We will contact you within 48 hours.</p>
            </div>
        </main>
    </Layout>
  )
}

export default Confirmation