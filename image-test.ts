import lqip from 'lqip-modern';
import fetch from 'node-fetch'

const imgUrl = "https://images.unsplash.com/photo-1669022929235-992c2639e641?ixid=Mnwz0DIyNTh8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHx8MTY20TAzNzA5Ng&ixlib=rb-4.0.3"

async function getDataUrl(url: string) {
    const imgData = await fetch(url)

    const arrayBufferData = await imgData.arrayBuffer()
    const lqipData = await lqip(Buffer.from(arrayBufferData))
    
    return lqipData.metadata.dataURIBase64

}

getDataUrl(imgUrl).then(console.log);
