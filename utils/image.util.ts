import { Photo } from "@/types"
import lqip from "lqip-modern"
import { createApi } from "unsplash-js"

async function getDataUrl(url: string) {
  const imgData = await fetch(url)
  const arrayBufferData = await imgData.arrayBuffer()
  const lqipData = await lqip(Buffer.from(arrayBufferData))
  
  return lqipData.metadata.dataURIBase64
}

export async function getImages(cli: ReturnType<typeof createApi>, query:string): Promise<Photo[]> {
    const mapPhotos: Photo[] = []
    
    const photos = await cli.search.getPhotos({
      query,
    })
  
    if(photos.type === 'success') {
      const photoArr = photos.response.results.map((photo, i) => ({
          src: photo.urls.full,
          thumb: photo.urls.thumb,
          width: photo.width,
          height: photo.height,
          alt: photo.alt_description ?? `img-${i}`,
        }))
  
        const photosArrWithDataURL: Photo[] = []
  
        for(const photo of photoArr) {
          const blurDataURL = await getDataUrl(photo.src)
          photosArrWithDataURL.push({...photo, blurDataURL})
        }
        mapPhotos.push(...photosArrWithDataURL)
      } else {
        console.error('ERROR: Could not get photo');
      }
      return mapPhotos
    }
