import React from 'react';
import Image from 'next/image';

const FileInput = ({ name, imageUrl, onChange, accept }) => {
  return (
    <div className="flex items-center flex-col w-full max-w-[25vw]">
      <label htmlFor="" className='text-vw m-0.5vw font-medium mb-0.3vw capitalize'>{name}</label>
      {accept !== 'application/pdf' && imageUrl && 
        <div className="w-full max-w-[20vw] mt-vw">
          <Image
            src={imageUrl} // Image source
            alt={`${name} preview`} // Alt text for accessibility
            width={200} // You can adjust the width to fit your layout
            height={200} // You can adjust the height to fit your layout
            className='rounded-md border-[1px] border-gray-300' // Add your desired styling
            objectFit="cover" // This ensures the image is correctly scaled
          />
        </div>
      }
      <input 
        accept={accept} 
        type="file" 
        name={name} 
        onChange={(e) => onChange(e, name)} 
        className='text-vw p-0.5vw border-[1px] focus:outline-none w-full focus:shadow-md max-w-[30vw] rounded-md' 
      />
    </div>
  );
};

export default FileInput;
