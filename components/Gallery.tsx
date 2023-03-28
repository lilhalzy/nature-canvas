/* eslint-disable react/jsx-key */
import type { Photo } from "@/types"
import LightGalleryComponent from 'lightgallery/react';
import { LightGallery } from "lightgallery/lightgallery"
import { useRef } from "react"
import Image from "next/image"
import Masonry from "react-masonry-css"

import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';

// plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

type GalleryProps = {
    photos: Photo[],
  }

export function Gallery({photos}:GalleryProps) {
    const lightBoxRef = useRef<LightGallery | null>(null)
    return (
      <>
        <Masonry breakpointCols={2} className='flex gap-4' columnClassName=''>
         {photos.map((photo, i) => (
          <div className='relative'>
           <Image key={photo.src} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} className='my-4 rounded-lg' placeholder='blur' blurDataURL={photo.blurDataURL} 
          />
          <div className='absolute w-full h-full inset-0 bg-transparent hover:bg-stone-900 hover:opacity-10 cursor-pointer' onClick={() => {
            lightBoxRef.current?.openGallery(i)
          }}></div>
          </div>
            ))}
       </Masonry>
       <LightGalleryComponent onInit={ref => {
         if(ref) {
           lightBoxRef.current = ref.instance
         }
       }} speed={500} plugins={[lgThumbnail, lgZoom]} dynamic dynamicEl={photos.map(photo => ({
         src: photo.src,
         thumb: photo.src,
       }))}/> 
      </>
    )
  }