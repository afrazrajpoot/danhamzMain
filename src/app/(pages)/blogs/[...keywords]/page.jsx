import { Toaster } from 'sonner';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import SocialShare from '@/app/Component/SocialShare';
import Head from 'next/head';
import Layout from '@/app/Component/Layout';
import { BlogActions } from '../components/BlogActions';
import Image from 'next/image';

async function fetchBlogData(keywords) {
  try {
    const url = `https://api.danhamz.co.uk/api/v1/blogs/${keywords}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Next.js Server'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const blogData = await response.json();
    
      return blogData;
    } else {
      const textResponse = await response.text();
      console.error('Response is not JSON. Raw response:', textResponse);
      throw new Error('Response is not JSON');
    }
  } catch (error) {
    console.error('Fetch Error:', {
      message: error.message,
      stack: error.stack
    });
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { keywords } = await params;

  const blogData = await fetchBlogData(keywords[0]);

  if (!blogData) {
    return {
      title: 'Danhamz Blog',
      description: 'Read this blog post to learn more.',
      openGraph: {
        type: 'article',
        locale: 'en_US',
        url: `https://danhamz.co.uk/blogs/${keywords[0]}`,
        title: 'Danhamz Blog',
        description: 'Read this blog post to learn more.',
        images: [
          {
            url: 'https://danhamz.co.uk/images/danhamz_logo.jpg',
            width: 1200,
            height: 630,
            alt: 'Danhamz Logo',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@yourTwitterHandle',
        creator: '@yourTwitterHandle',
        title: 'Danhamz Blog',
        description: 'Read this blog post to learn more.',
        images: ['https://danhamz.co.uk/images/danhamz_logo.jpg'],
      },
    };
  }

  const canonicalUrl = `https://danhamz.co.uk/read-blog/${keywords[0]}`;

  const getFullImageUrl = (fileName) => {
    if (!fileName) return 'https://danhamz.co.uk/images/danhamz_logo.jpg';
    return `https://api.danhamz.co.uk/api/v1/blogsPosts/${fileName}`;
  };

  const imageUrl = getFullImageUrl(blogData.image1?.fileName);
  return {
    metadataBase: new URL('https://danhamz.co.uk'),
    title: blogData.keywords,
    description: blogData.info1 || 'Read this blog post to learn more.',
    canonical: canonicalUrl,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      title: blogData.keywords,
      description: blogData.info1 || 'Read this blog post to learn more.',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blogData.keywords,
        },
      ],
      publishedTime: blogData.createdAt,
      authors: [blogData.name],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourTwitterHandle',
      creator: '@yourTwitterHandle',
      title: blogData.keywords,
      description: blogData.info1 || 'Read this blog post to learn more.',
      images: [imageUrl],
    },
  };
}

export default async function ReadSingleBlog({ params }) {
  const { keywords } = await params;

  if (!keywords || !keywords[0]) {
    return <p>Invalid blog keywords.</p>;
  }

  const blogData = await fetchBlogData(keywords[0]);

  if (!blogData) {
    return <p>Failed to load blog data.</p>;
  }

  const headersList = headers();
  const activePath = headersList.get('x-invoke-path') || '';

  const getFullImageUrl = (fileName) => {
    if (!fileName) return '/images/danhamz_logo.jpg';
    return `https://api.danhamz.co.uk/api/v1/blogsPosts/${fileName}`;
  };

  const canonicalUrl = `https://danhamz.co.uk/read-blog/${keywords[0]}`;
  const imageUrl = getFullImageUrl(blogData.image1?.fileName);

  return (
  <Layout>
      <main className=''>
      <Head>
        <meta property="og:title" content={blogData.keywords} />
        <meta property="og:description" content={blogData.info1 || 'Read this blog post to learn more.'} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:title" content={blogData.keywords} />
        <meta name="twitter:description" content={blogData.info1 || 'Read this blog post to learn more.'} />
      </Head>
      <Toaster />
      <Suspense fallback={<h1>Loading...</h1>}>
        {blogData && (
          <>
            <BlogActions
              blogId={blogData._id}
              keywords={keywords}
              admin={activePath.includes('/admin') ? 'admin' : 'user'}
            />
            <section className="p-[2vw] bg-white">
              <h1 className="text-[#152347] text-center text-[5vw] md:text-2vw font-medium">
                All you want to know about us
              </h1>
              <div className="flex items-center flex-col my-[4vw] md:my-[2vw]">
                <SocialShare
                  fbURL={canonicalUrl}
                  twURL={canonicalUrl}
                  waURL={canonicalUrl}
                  title={blogData.title}
                  image={imageUrl}
                />
                <p>Click here to share this article</p>
              </div>

              {[...Array(15)].map((_, index) => (
                <main className="my-[1vw]" key={index}>
                  <article className="flex flex-col w-full my-[5vw] justify-around items-center">
                    {blogData?.[`image${index + 1}`] && (
                      <figure className="w-full max-w-[80vw] md:max-w-[50vw] rounded-md">
                      <Image
  src={getFullImageUrl(blogData?.[`image${index + 1}`]?.fileName)} // Image URL from your function
  alt="blog_image" // Alt text for accessibility
  width={500} // Adjust width based on your design
  height={300} // Adjust height based on your design
  className="w-full rounded-md" // Styling classes
  objectFit="cover" // Ensures the image covers the available area without stretching
/>
                      </figure>
                    )}
                    {blogData?.[`heading${index + 1}`] && (
                      <h1 className="text-[#152347] font-semibold text-start w-full max-w-[70vw] md:max-w-[50vw] text-[4.5vw] md:text-[1.5vw] mt-[5vw] md:mt-2vw">
                        {blogData?.[`heading${index + 1}`]}
                      </h1>
                    )}
                  </article>
                  {blogData?.[`info${index + 1}`] && (
                    <div className="text-[#152347] mt-[5vw] md:[mt-3vw] w-full max-w-[70vw] md:max-w-[50vw] mx-auto text-[3vw] md:text-vw">
                      {blogData?.[`info${index + 1}`]?.split('\n')?.map((paragraph, idx) => (
                        <div key={idx}>
                          <p>{paragraph}</p>
                          {idx !== blogData[`info${index + 1}`]?.split('\n')?.length - 1 && <br />}
                        </div>
                      ))}
                    </div>
                  )}
                </main>
              ))}

              <p className="text-[#152347] mt-[5vw] md:[mt-3vw] font-medium w-full max-w-[80vw] mx-auto text-[3vw] md:text-vw">
                By: {blogData?.name}
              </p>
            </section>
          </>
        )}
      </Suspense>
    </main>
  </Layout>
  );
}
