import lqip from 'lqip-modern';
import fetch from 'node-fetch'

const imgUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixid=Mnw0Mjc3Mzh8MHwxfHNlYXJjaHw3fHxvZmZpY2V8ZW58MHx8fHwxNjc5ODcyNjkx&ixlib=rb-4.0.3"

async function getDataUrl(url: string) {
    const imgData = await fetch(url)

    const arrayBufferData = await imgData.arrayBuffer()
    const lqipData = await lqip(Buffer.from(arrayBufferData))
    
    return lqipData.metadata.dataURIBase64

}

getDataUrl(imgUrl).then(console.log);
