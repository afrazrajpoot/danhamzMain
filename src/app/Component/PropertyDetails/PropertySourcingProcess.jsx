import React, { useState } from "react";
import { simple_proc } from "@/app/Data";
import Image from "next/image";

const PropertySourcingProcess = () => {
  const [selectedTitle, setSelectedTitle] = useState(simple_proc?.[0]?.title);

  const handleListClick = (title) => {
    setSelectedTitle(title);
  };

  return (
    <div>
      <main className="flex w-full max-w-[90vw] bg-white p-vw">
      <div className="w-full max-w-[22vw]">
      {simple_proc?.map((item, index) => (
          <div className=" relative bg-white" key={index}>
            <section className="max-w-[22vw] w-full">
              <h1
                className={`text-[#152347] font-medium text-vw p-vw w-full cursor-pointer ${
                  selectedTitle === item.title ? "bg-blue-800 text-white" : ""
                }`}
                onClick={() => handleListClick(item.title)}
              >
                {item.title}
              </h1>
            </section>
          </div>
        ))}
      </div>
        <div className="flex max-w-[65vw] w-full">
          {simple_proc?.map((item, index) => (
            <div key={index} className={selectedTitle === item.title ? "w-full flex" : "hidden"}>
              <section className="max-w-[30vw] ml-2vw">
                <p className="w-full text-vw mt-2vw max-w-[28vw]">{item.info?.[0]?.para}</p>
                <p className="w-full text-vw mt-vw max-w-[28vw]">{item.info?.[0]?.para2}</p>
              </section>
              <section className="max-w-[30vw] ml-2vw">
              <Image
  src={item.info?.[0]?.img || '/images/no_preview.jpg'} // Fallback image
  alt={item.title}
  width={300} // Adjust width based on your design or available space
  height={600} // Adjust height based on your design or available space
  className="w-full max-w-[24vw] h-28vw"
  loading="lazy" // Optional: Lazy loading enabled by default
/>
              </section>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PropertySourcingProcess;