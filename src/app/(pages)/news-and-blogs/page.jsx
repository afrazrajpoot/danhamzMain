'use client'
import React, { useEffect, useState } from "react";
import Layout from "@/app/Component/Layout";
import BlogsCard from "@/app/Component/Cards/BlogsCard";

import axios from "axios";
import { Toaster } from "sonner";

import Loader from "@/app/Reports/Loader";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/app/UserContext/UserContext";
import Link from "next/link";

const Blogs = () => {
  const [blogsPosts, setBlogsPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [admin, setAdmin] = useState("user");
  const { newBlog } = useGlobalContext();

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "lettings", label: "Lettings" },
    { value: "sales", label: "Sales" },
    { value: "refurbishment", label: "Refurbishment" },
    { value: "maintenance", label: "Maintenance" },
    { value: "block management", label: "Block management" },
    { value: "nightly lets", label: "Nightly lets" }

  ];

  const getBlogData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/readBlogs`);
      setBlogsPosts(res.data);
      setFilteredPosts(res.data);
    } catch (err) {
      // Error handling preserved
    }
  };

  useEffect(() => {
    getBlogData();
  }, [newBlog]);

  // Filter posts when category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(blogsPosts);
    } else {
      const filtered = blogsPosts.filter(post => post?.category === selectedCategory);
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, blogsPosts]);

  // Animation variants preserved...
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("userLoginInfo"));
      setAdmin(token?.admin ? token?.admin : "user");
    }
  }, []);


  return (
    <Layout>
      <Toaster />
      <motion.main
        className="min-h-screen bg-white overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="relative mb-8 sm:mb-12 lg:mb-16">
            {/* Admin Button - Preserved */}
            {admin === 'admin' && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute left-4 sm:left-6 lg:left-8 top-0 z-10"
              >
                <Link href="/create-blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-[#152347] text-white text-xs sm:text-sm lg:text-[1vw] rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <motion.svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </motion.svg>
                    <span className="whitespace-nowrap">Create New Blog</span>
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Header Section - Preserved */}
            <motion.div
              variants={headerVariants}
              className="text-center max-w-3xl mx-auto pt-12 sm:pt-16"
            >
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-[2vw] text-amber-500 font-bold mb-3 sm:mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Our Blog Posts
              </motion.h1>
              <motion.div
                className="h-1 w-16 sm:w-20 bg-amber-500 mx-auto mb-4 sm:mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.p
                className="text-sm sm:text-base lg:text-[1vw] text-gray-600 px-4 mb-8"
                variants={headerVariants}
              >
                All you want to know about our landlords and tenants
              </motion.p>

              {/* Category Filter Buttons */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {categories.map((category) => (
                  <motion.button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-amber-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Loading State - Preserved */}
          {blogsPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]"
            >
              <Loader />
            </motion.div>
          )}

          {/* Blog Grid - Now using filteredPosts */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 ml-[9vw] lg:ml-0  lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-full px-4 sm:px-0"
            variants={containerVariants}
          >
            {filteredPosts.map((item, index) => (
              <motion.div
                key={item._id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
                layout
                className="w-full"
              >
                <BlogsCard
                  keywords={item?.keywords}
                  info={item?.info1}
                  img={`${process.env.NEXT_PUBLIC_API_URL}/blogsPosts/${item?.image1?.fileName}`}
                  {...item}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results State */}
          {filteredPosts.length === 0 && blogsPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-8 sm:py-12"
            >
              <p className="text-gray-500 text-base sm:text-lg">
                No posts found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </motion.main>
    </Layout>
  );
};

export default Blogs;