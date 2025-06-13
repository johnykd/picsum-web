'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { ImageModal } from './components/ImageModal'
import { LoadingSpinner } from './components/LoadingSpinner'
import { SkeletonCard } from './components/SkeletonCard'
import { type PicsumImage } from './types'
import ImageCard from './components/ImageCard'



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
  const [loading, setLoading] = useState(true) // Start with true for initial load
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedImage, setSelectedImage] = useState<PicsumImage | null>(null)

  const loadImages = useCallback(async () => {
    try {
      const isInitialLoad = images.length === 0
      if (isInitialLoad) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const newImages = await getImages(page)
      setImages(prev => [...prev, ...newImages])
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [page, images.length])

  useEffect(() => {
    loadImages()
  }, [loadImages])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>PicSum Gallery</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading ? (
          // Show skeleton cards during initial load
          Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          // Show actual images
          images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))
        )}
        
        {/* Show skeleton cards when loading more */}
        {loadingMore && (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={`loading-${index}`} />
          ))
        )}
      </div>

      {!loading && (
        <div className='flex justify-center mt-8'>
          <div
            ref={(el) => {
              if (!el) return;
              const observer = new IntersectionObserver(
                (entries) => {
                  if (entries[0].isIntersecting && !loadingMore && !loading) {
                    loadImages();
                  }
                },
                { threshold: 1.0 }
              );
              observer.observe(el);
              return () => observer.disconnect();
            }}
            className="h-10 mt-8 flex items-center justify-center"
          >
            {loadingMore ? (
              <div className="flex items-center gap-3 text-gray-600">
                <LoadingSpinner className="w-6 h-6" />
                <span>Loading...</span>
              </div>
            ) : (
              <p className="text-blue-500">Scroll for more</p>
            )}
          </div>
        </div>
      )}

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} isLoading={loading} />
    </div>
  )
}