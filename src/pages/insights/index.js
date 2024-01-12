'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, Link } from 'next/router';

import CarAnalysis from '../../components/CarAnalysis'

export default function InsightsPage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const image = localStorage.getItem('turoInsightsImageUrl');
    const data =  JSON.parse(localStorage.getItem('turoInsightsData'));
    setData(data);
    setImage(image);
  }, [router])
  return (
    <div className='pt-8'>
        <Link href='/' className='text-md border-2 p-2 px-4 border-gray-300 inline rounded-xl font-light m-8 cursor-pointer'>back</Link>
      <main
      className={`min-h-screen flex flex-row items-start p-12 pt-24`}
    >
      <div className=''>
        <CarAnalysis json={data} />
      </div>
      <div>
      <div className='text-3xl font-light mb-2'>Car Page</div>
        <img className='w-50% shadow-2xl rounded-3xl border-8 border-light' src={image} />
      </div>
    </main>
    </div>
  )
}
