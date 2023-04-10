import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

import { Gallery } from '@/components/Gallery';
import type { Photo } from '@/types';
import { getImages } from '@/utils/image.util';
import { useMemo, useState } from 'react';
import Contact from '../components/Contact';
import bgModern from '../public/bgModern.jpg';

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
];

type HomeProps = {
  oceans: Photo[];
  forests: Photo[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch as unknown as typeof fetch,
  });

  const [oceans, forests] = await Promise.all([
    getImages(unsplash, 'oceans'),
    getImages(unsplash, 'forests'),
  ]);

  return {
    props: {
      oceans,
      forests,
    },
    revalidate: 10,
  };
};

export default function Home({ oceans, forests }: HomeProps) {
  const allPhotos = useMemo(() => {
    const all = [...oceans, ...forests];
    return all.sort((a, b) => b.likes - a.likes);
  }, [oceans, forests]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const handleOpenContact = () => {
    setIsContactOpen(true);
  };
  const handleCloseContact = () => {
    setIsContactOpen(false);
  };
  return (
    <div className='h-full overflow-auto'>
      <Head>
        <title>Nature Canvas</title>
        <meta
          name='description'
          content='A Journey Through the Seas and Trees'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      (Contact)
      <Image
        src={bgModern}
        alt='background-img'
        className='fixed top-0 left-0 z-0'
        placeholder='blur'
      />
      <div className='fixed top-0 left-0 w-full h-full from-zinc-900 bg-gradient-to-t z-10'></div>
      <header className='fixed top-0 w-full z-30 flex justify-between items-center h-[90px] px-20 from-zinc-900 bg-gradient-to-b'>
        <span className='uppercase text-lg font-medium'>Nature Canvas</span>
        <button
          className='rounded-3xl bg-white text-stone-700 px-6 py-2 hover:underline decoration-gray-400  hover:bg-opacity-90'
          onClick={handleOpenContact}
        >
          Contact
        </button>
        <Contact isOpen={isContactOpen} onClose={handleCloseContact}>
        </Contact>
      </header>
      <main className='relative pt-[120px] z-20'>
        <div className='flex flex-col items-center h-full'>
          <Tab.Group>
            <Tab.List className='flex items-center gap-16'>
              {tabs.map((tab) => (
                <Tab key={tab.key} className='p-2 uppercase'>
                  {({ selected }) => (
                    <span
                      className={classNames(
                        'uppercase text-lg',
                        selected ? 'text-white' : 'text-stone-600'
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='h-full max-w-[900px] w-full p-2 sm:p-4 my-6'>
              <Tab.Panel className='overflow-auto'>
                <Gallery photos={allPhotos} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={oceans} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={forests} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className='relative h-[60px] flex justify-center items-center py-2 sm:py-12 uppercase font-medium z-20 select-none'>
        <p className='opacity-30 hover:opacity-60 cursor-text'>lilhalzy | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
