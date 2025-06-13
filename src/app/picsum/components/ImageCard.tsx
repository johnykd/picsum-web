import React from 'react'
import Image from 'next/image'
import { PicsumImage } from '../types';

const ImageCard = ({ image, onClick }: { image: PicsumImage; onClick: () => void }) => {
 

  return (
    <div
      className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]'
      onClick={onClick}
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
    <div className='h-64 absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end'>
              <p className='text-white p-4'>{image.author}</p>
            </div>
    </div>
  )
}
export default ImageCard