'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { debounce } from 'lodash';
import { Icon } from '@iconify/react';

import SearchInput from './SearchInput';
import PropertySearch from '@/app/(pages)/propertySearch/page';
import Loader from '@/app/Reports/Loader';
import { rentContainer1 } from '@/app/Data';

const BuySection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filteredResult, setFilteredResult] = useState({
    location: '',
    propertyType: '',
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    bathrooms: null,
    features: '',
    isAvailableFrom: ''
  });

  const [availableProperties, setAvailableProperties] = useState([]);
  const [searchedLettingsProperties, setSearchedLettingsProperties] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const propertiesPerPage = 10;
  const totalPages = Math.ceil(searchedLettingsProperties?.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      bathrooms: null,
      propertyType: '',
      location: '',
      features: '',
      isAvailableFrom: ''
    },
  });

  const fetchDataFromQueryString = async (queryString) => {
    setShowLoading(true);
    try {
      const fetchData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales/advancedBuySearch?${queryString}`);
      setSearchedLettingsProperties(fetchData.data);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setShowLoading(false);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((queryString) => fetchDataFromQueryString(queryString), 300),
    []
  );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    
    Object.entries(params).forEach(([key, value]) => {
      setValue(key, value);
    });

    const queryString = searchParams.toString();
    if (queryString) {
      debouncedFetchData(queryString);
    }
  }, [searchParams, setValue, debouncedFetchData]);

  useEffect(() => {
    const currentLettingsProperties = searchedLettingsProperties?.slice(
      indexOfFirstProperty, 
      indexOfLastProperty
    );
    setAvailableProperties(currentLettingsProperties);
  }, [currentPage, searchedLettingsProperties]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    
    setFilteredResult(prev => ({ ...prev, [name]: value }));
    setValue(name, value);

    const formData = watch();
    const searchParams = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-full h-full'>
        <main className="w-full bg-[#152347] opacity-90 p-vw">
          <div className="flex p-[2vw] items-center relative">
            <SearchInput />
          </div>
          <article className='w-full col-center'>
            <section className='bg-white mt-[1vw] w-full xl:max-w-[90vw] lg:max-w-[90vw] md:max-w-[90vw] flex'>
              {rentContainer1?.map((item, index) => (
                <div 
                  key={index} 
                  className="flex h-[7vw] items-center w-full cursor-pointer max-w-[20vw] border-[1px]"
                >
                  <span className='text-[2vw] xl:text-[1.5vw] lg:text-[1.5vw] md:text-[1.5vw] ml-vw text-blue-950'>
                    {item?.icon}
                  </span>
                  <Controller 
                    control={control}
                    name={item?.name}
                    render={({ field }) => (
                      <select 
                        {...field} 
                        onChange={handleSearch} 
                        className='w-full bg-inherit -ml-0.5vw cursor-pointer text-[2vw] xl:text-vw lg:text-vw md:text-vw font-medium text-black p-vw focus:outline-none appearance-none'
                      >
                        <option value="" className='text-[2vw] xl:text-vw lg:text-vw md:text-vw bg-inherit'>
                          {item?.title}
                        </option>
                        {item?.options?.map((option, index) => (
                          <option 
                            key={index} 
                            className='text-[2vw] xl:text-vw lg:text-vw md:text-vw' 
                            value={option?.value}
                          >
                            {option?.title}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              ))}
            </section>
          </article>
        </main>

        {showLoading && <Loader />}

        {searchedLettingsProperties?.length > 0 ? (
          <PropertySearch 
            totalProperties={searchedLettingsProperties} 
            searchedProperties={availableProperties} 
          />
        ) : null}
      </form>

      {totalPages > 1 && (
        <div className="flex pt-[3vw] bg-gray-100 justify-center items-center w-full">
          <button 
            className={`${currentPage === 1 ? 'bg-[#152347] cursor-not-allowed' : 'bg-amber-500 hover:shadow-md hover:font-semibold'} text-[3vw] md:text-vw text-white font-medium p-[1vw] md:p-[0.7vw] rounded-[0.5vw] m-[0.7vw]`}
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <Icon icon="ep:arrow-left-bold" className="text-3vw text-white md:text-vw cursor-pointer" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${currentPage === index + 1 ? 'bg-amber-500' : 'bg-[#152347] hover:shadow-md hover:font-semibold'} text-[3vw] md:text-vw text-white font-medium w-[5vw] h-[5vw] md:w-[2.5vw] md:h-[2.5vw] flex items-center justify-center rounded-[0.5vw] m-[1.5vw]`}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}

          <button 
            className={`${currentPage === totalPages ? 'bg-[#152347] cursor-not-allowed' : 'bg-amber-500 hover:shadow-md hover:font-semibold'} text-[3vw] md:text-vw text-white font-medium p-[1vw] md:p-[0.7vw] rounded-[0.5vw] m-[0.7vw]`}
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            <Icon icon="ep:arrow-right-bold" className="text-3vw text-white md:text-vw cursor-pointer" />
          </button>
        </div>
      )}
    </>
  );
};

export default BuySection;