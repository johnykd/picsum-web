'use client'

import { Skeleton } from './Skeleton'

export function SkeletonCard() {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='relative w-full h-64'>
        <Skeleton className='absolute inset-0' />
      </div>
    </div>
  )
}
