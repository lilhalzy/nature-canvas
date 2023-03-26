import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';

import ocean1 from '../public/ocean-1.jpg'
import ocean2 from '../public/ocean-2.jpg'
import ocean3 from '../public/ocean-3.jpg'
import ocean4 from '../public/ocean-4.jpg'
import ocean5 from '../public/ocean-5.jpg'

const tabs = [
  {
    key: 'all',
    display: 'All',
  },
  {
    key: 'oceans',
    display: 'Oceans',
  },
  {
    key: 'forests',
    display: 'Forests',
  },
]

export default function Home() {
  return (
    <div className="h-full bg-[url('/bgModern.jpg')] bg-top bg-cover overflow-auto">
      <Head>
        <title>Nature Canvas</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='fixed top-0 w-full z-10 flex justify-between items-center h-[90px] px-20'>
        <span className='uppercase text-lg font-medium'>Nature Canvas</span>
        <Link href='#' className='rounded-3xl bg-white text-stone-700 hover:underline decoration-gray-400 px-6 py-2 hover:bg-opacity-90 '>
            Contact
        </Link>
      </header>
      <main className='pt-[120px]'>
        <div className="flex flex-col items-center h-full">
      <Tab.Group>
      <Tab.List className='flex items-center gap-16'>
        {tabs.map(tab => (
        <Tab key={tab.key} className='p-2 uppercase'>
          {({selected}) => (<span className={classNames("uppercase text-lg", selected ? 'text-white' : 'text-stone-600')}>{tab.display}</span>)}
        </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className='h-full max-w-[900px] w-full p-2 sm:p-4 text-slate-700 mt-4'>
        <Tab.Panel>
          <Masonry breakpointCols={2} className='flex gap-4' columnClassName=''>
            <Image src={ocean3} alt={'placeholder'} className='my-4 rounded-xl'/>
            <Image src={ocean2} alt={'placeholder'} className='my-4 rounded-xl'/>
            <Image src={ocean1} alt={'placeholder'} className='my-4 rounded-xl'/>
            <Image src={ocean4} alt={'placeholder'} className='my-4 rounded-xl'/>
            <Image src={ocean5} alt={'placeholder'} className='my-4 rounded-xl'/>
          </Masonry>
        </Tab.Panel>
        <Tab.Panel>Oceans</Tab.Panel>
        <Tab.Panel>Forests</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
        </div>
      </main>
      <footer className='h-[60px] flex justify-center items-center py-2 sm:py-12 uppercase font-medium'>
        <p>Nature Canvas</p>
      </footer>
    </div>
  );
}
