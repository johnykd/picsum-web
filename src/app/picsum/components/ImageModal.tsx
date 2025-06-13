'use client'

import Image from 'next/image'
import { type PicsumImage } from '../types'
import { LoadingSpinner } from './LoadingSpinner'

interface ImageModalProps {
  image: PicsumImage | null
        onClose: () => void
        isLoading: boolean
}

export function ImageModal({ image,isLoading,onClose  }: ImageModalProps) {


    console.log("ImageModal rendered with image:", isLoading);
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-black relative h-[60vh] w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <LoadingSpinner className="w-12 h-12 text-blue-500" />
            </div>
          )}
          <Image
            src={image.download_url}
            alt={`Photo by ${image.author}`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="p-6 bg-white text-black">
          <h2 className="text-2xl font-bold mb-4">Photo Details</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Photo by:</span> {image.author}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Original size:</span> {image.width} x {image.height}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">ID:</span> {image.id}
          </p>
          <a
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            View on Picsum Photos
          </a>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg ml-4 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
