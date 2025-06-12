'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

// Define the type for our image data
type PicsumImage = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

// Server component to fetch data
async function getImages(page: number = 1): Promise<PicsumImage[]> {
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  if (!res.ok) {
    throw new Error('Failed to fetch images')
  }
  return res.json()
}

export default function PicSumPage() {
  const [images, setImages] = useState<PicsumImage[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadImages = useCallback(async () => {
    try {
      setLoading(true)
      const newImages = await getImages(page)
      setImages(prev => [...prev, ...newImages])
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setLoading(false)
    }
  }, [page])

  // Load initial images
  useEffect(() => {
    loadImages()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>PicSum Gallery</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {images.map((image) => (
          <div
            key={image.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <div className='relative w-full h-64'>
              <Image
                src={image.download_url}
                alt={`Photo by ${image.author}`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover'
              />
            </div>
            <div className='p-4'>
              <p className='text-gray-700'>Photo by: {image.author}</p>
              <p className='text-sm text-gray-500'>
                Resolution: {image.width} x {image.height}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-8'>
		<div
		  ref={(el) => {
			if (!el) return;
			const observer = new IntersectionObserver(
			  (entries) => {
			if (entries[0].isIntersecting && !loading) {
			  loadImages();
			}
			  },
			  { threshold: 1.0 }
			);
			observer.observe(el);
			return () => observer.disconnect();
		  }}
		  className="h-10 mt-8"
		>
		  <p className={`px-6 py-3 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-lg`}>
			{'Loading...'}
		  </p>
		</div>
      </div>
    </div>
  )
}