'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faEnvelope, faPhone, faHome, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useCreateBookingMutation } from '@/app/store/storeApi';
import { toast, Toaster } from 'sonner';
import { Loader } from 'lucide-react';
import Layout from '@/app/Component/Layout';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/Component/Common/Loading';

// Field configuration array with validation rules
const fieldArray = [
  {
    id: 'name',
    type: 'text',
    label: 'Full Name',
    icon: faUser,
    placeholder: 'Enter your full name',
    validation: {
      required: 'Full name is required',
      minLength: { value: 2, message: 'Name must be at least 2 characters' },
      pattern: { 
        value: /^[A-Za-z\s]+$/,
        message: 'Name can only contain letters and spaces'
      }
    }
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    icon: faEnvelope,
    placeholder: 'Enter your email',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    }
  },
  {
    id: 'phone',
    type: 'tel',
    label: 'Phone Number',
    icon: faPhone,
    placeholder: 'Enter your phone number',
    validation: {
      required: 'Phone number is required',
      pattern: {
        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        message: 'Invalid phone number'
      }
    }
  },
  {
    id: 'propertyType',
    type: 'select',
    label: 'Property Type',
    icon: faHome,
    options: [
      { value: '', label: 'Select Type' },
      { value: 'apartment', label: 'Apartment' },
      { value: 'house', label: 'House' },
      { value: 'studio', label: 'Studio' },
      { value: 'other', label: 'Other' },
    ],
    validation: {
      required: 'Please select a property type'
    }
  },
 
  {
    id: 'startDate',
    type: 'date',
    label: 'Viewing Date',
    icon: faCalendar,
    validation: {
      required: 'Start date is required'
    }
  },
  // {
  //   id: 'endDate',
  //   type: 'date',
  //   label: 'End Date',
  //   icon: faCalendar,
  //   validation: {
  //     required: 'End date is required'
  //   }
  // }
];

const BookingContent = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [booking, { isLoading, isError, isSuccess, error }] = useCreateBookingMutation();

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Submission handler with enhanced validation
  const onSubmit = (data) => {
    const { startDate, endDate } = data;

    // Validate date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        setError('startDate', {
          type: 'manual',
          message: 'Start date cannot be later than end date',
        });
        setError('endDate', {
          type: 'manual',
          message: 'End date cannot be earlier than start date',
        });
        return;
      }
    }

    booking({
      name: data.name,
      email: data.email,
      phone: data.phone,
      startDate: data.startDate,
      endDate: data.endDate,
      propertyId: id,
    });
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setIsSubmitted(true);
    }
  }, [isSuccess, isError]);

  return (
    <Layout>
      <Toaster />
      <div className="min-h-screen flex">
        <div className="w-full lg:w-full flex items-center justify-center px-6 py-12">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-10 text-center"
            >
             {
              isError ? (<><p className='text-6xl text-red-500 mx-auto mb-6 font-bold'>X</p> </>):<FontAwesomeIcon
            icon={faCheckCircle}
            className="text-6xl text-green-500 mx-auto mb-6"
          />
             }
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isError ? 'Booking failed' : 'Booking Confirmed!'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isError
                  ? error?.data?.message || 'An error occurred'
                  : "We've received your property viewing request. Our team will contact you shortly to confirm details."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsSubmitted(false);
                  reset();
                }}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Book Another Viewing
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Property Viewing Request
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fieldArray.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      <FontAwesomeIcon
                        icon={field.icon}
                        className="mr-2 text-indigo-500"
                      />
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <Controller
                        name={field.id}
                        control={control}
                        rules={field.validation}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <>
                            <select
                              id={field.id}
                              value={field?.value ?? ''} // Default to empty string if field?.value is null or undefined
                              onChange={onChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                            >
                              {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errors[field.id] && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors[field.id].message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    ) : (
                      <Controller
                        name={field.id}
                        control={control}
                        rules={field.validation}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <>
                            <input
                              id={field.id}
                              type={field.type}
                              value={value}
                              onChange={onChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                              placeholder={field.placeholder}
                            />
                            {errors[field.id] && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors[field.id].message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    )}
                  </div>
                ))}
                <motion.button
                  type="submit"
                  className="w-full flex justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? <Loader className="w-[1.5vw] h-[1.5vw] animate-spin text-white" /> :'Book now' }
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const Booking = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BookingContent />
    </Suspense>
  );
};

export default Booking;