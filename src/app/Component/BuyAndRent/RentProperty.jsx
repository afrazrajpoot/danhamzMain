'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { rentContainer1 } from '@/app/Data';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useGetAllLettingsQuery } from '@/app/store/storeApi';
import { useGlobalContext } from '@/app/UserContext/UserContext';
import { Icon } from '@iconify/react';
import SearchInput from './SearchInput';
import { useSearchParams, useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import Loader from '@/app/Reports/Loader';
import PropertySearch from '@/app/(pages)/propertySearch/page';
import Pagination from '../Pagination';

const RentProperty = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    setSearchedLettingsProperties, 
    searchedRentLocation, 
    searchedLocation, 
    setSearchedRentLocation, 
    searchedLettingsProperties 
  } = useGlobalContext();
  
  const [filteredResult, setFilteredResult] = useState({
    location: searchedRentLocation || "",
    propertyType: "",
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    bathrooms: null,
    features: "",
    isAvailableFrom: ""
  });

  const { data: lettings } = useGetAllLettingsQuery();
  const [availableProperties, setAvailableProperties] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  
  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      bathrooms: null,
      propertyType: searchedRentLocation || "",
      location: '',
      features: '',
      isAvailableFrom: ''
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;
  const totalPages = Math.ceil(searchedLettingsProperties?.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  const fetchDataFromQueryString = async (queryString) => {
    setShowLoading(true);
    try {
      const url = queryString
        ? `${process.env.NEXT_PUBLIC_API_URL}/lettings/advancedSearch?${queryString}`
        : `${process.env.NEXT_PUBLIC_API_URL}/lettings/advancedSearch`;

      const fetchData = await axios.get(url);
      const result = fetchData.data;
      setSearchedLettingsProperties(result);
    } catch (error) {
      console.error('Error during search:', error);
      setSearchedLettingsProperties([]);
    } finally {
      setShowLoading(false);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((queryString) => fetchDataFromQueryString(queryString), 300),
    []
  );

  // Initial search and parameter setup
  useEffect(() => {
    // Convert search params to an object
    const params = Object.fromEntries(searchParams.entries());
    
    // Update form values
    Object.keys(params).forEach(key => {
      setValue(key, params[key]);
    });

    // Construct query string
    const queryString = searchParams.toString();
    
    // Fetch data based on query parameters
    if (queryString) {
      debouncedFetchData(queryString);
    } else {
      // If no parameters, fetch all listings
      fetchDataFromQueryString('');
    }
  }, [searchParams]);

  // Pagination effect
  useEffect(() => {
    const currentLettingsProperties = searchedLettingsProperties?.slice(indexOfFirstProperty, indexOfLastProperty);
    setAvailableProperties(currentLettingsProperties);
  }, [currentPage, searchedLettingsProperties]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    
    // Update filtered result
    setFilteredResult(prev => ({ ...prev, [name]: value }));
    setValue(name, value);

    // Create search params
    const formData = watch();
    const searchParams = new URLSearchParams();

    // Add non-empty values to search params
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });

    // Ensure location is set if available
    if (searchedRentLocation) {
      searchParams.set('location', searchedRentLocation);
    }

    // Update URL
    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  // Additional location-based search effect
  useEffect(() => {
    if (searchedLocation) {
      const params = new URLSearchParams({ location: searchedLocation });
      fetchDataFromQueryString(params.toString());
    }
  }, [searchedLocation]);

  return (
    <>
      <form onSubmit={handleSubmit(() => {})} className='bg-white w-full h-full'>
        <main className="w-full bg-[#152347] opacity-90 p-vw">
          <div className="flex flex-col md:flex-row p-[2vw] items-center relative">
            <SearchInput />
          </div>
          
          <article className='w-full col-center'>
            <section className='bg-white mt-[1vw] w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2'>
              {rentContainer1?.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center w-full cursor-pointer border-[1px] p-[2vw]"
                >
                  <span className='text-base md:text-lg mr-2 text-blue-950'>{item?.icon}</span>
                  <Controller 
                    control={control}
                    name={item?.name}
                    render={({ field }) => (
                      <select 
                        {...field} 
                        onChange={handleSearch} 
                        className='w-full bg-inherit cursor-pointer text-sm md:text-base font-medium text-black focus:outline-none appearance-none'
                      >
                        <option value="" className='text-sm md:text-base bg-inherit'>{item?.title}</option>
                        {item?.options?.map((option, index) => (
                          <option 
                            key={index} 
                            className='text-sm md:text-base' 
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
        ) : (
          <p className="text-center text-gray-500 mt-4">No properties found</p>
        )}
      </form>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default RentProperty;