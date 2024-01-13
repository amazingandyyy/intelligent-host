'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import CarAnalysis from '../../components/CarAnalysis'

export default function InsightsPage() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [originalUrl, setOriginalUrl] = useState(null);

  useEffect(() => {
    const image = localStorage.getItem('turoInsightsImageUrl');
    const originalUrl = localStorage.getItem('turoInsightsOriginalUrl');
    const data =  JSON.parse(localStorage.getItem('turoInsightsData'));
    setData(data);
    setImage(image);
    setOriginalUrl(originalUrl);
  }, [router])
  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <Link href='/' className='hover:opacity-70 text-md border-2 p-2 px-4 border-gray-300 rounded-xl font-semibold m-8 cursor-pointer flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline pr-1">
            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>

            <span>Back</span>
          </Link>
        </div>
        <div className='flex items-center'>
          <a href={originalUrl} className='hover:opacity-70 text-md border-2 p-2 px-4 border-[#593CFB] bg-[#593CFB] text-white rounded-xl font-semibold mr-2 cursor-pointer flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline pr-1">
              <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
              <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
            </svg>
            <span>Original Post</span>
            </a>
          <a href={`https://turo.com/us/en/your-car/${originalUrl?.split('/')[originalUrl.split('/').length-1]}/details`} className='hover:opacity-70 text-md border-2 p-2 px-4 bg-gray-900 border-gray-900 text-white rounded-xl font-semibold mr-8 cursor-pointer flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline w-5 h-5 pr-1">
              <path fillRule="evenodd" d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 0 1 1.262.125l.962.962a1 1 0 0 1 .125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 0 1 .804.98v1.361a1 1 0 0 1-.804.98l-1.473.295a6.95 6.95 0 0 1-.587 1.416l.834 1.25a1 1 0 0 1-.125 1.262l-.962.962a1 1 0 0 1-1.262.125l-1.25-.834a6.953 6.953 0 0 1-1.416.587l-.294 1.473a1 1 0 0 1-.98.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a6.957 6.957 0 0 1-1.416-.587l-1.25.834a1 1 0 0 1-1.262-.125l-.962-.962a1 1 0 0 1-.125-1.262l.834-1.25a6.957 6.957 0 0 1-.587-1.416l-1.473-.294A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 0 1 .125-1.262l.962-.962A1 1 0 0 1 5.38 3.03l1.25.834a6.957 6.957 0 0 1 1.416-.587l.294-1.473ZM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
            </svg>
            <span>Car setting</span>
          </a>
        </div>
      </div>
      {data && <main
        className={`min-h-screen flex flex-row items-start p-12 pt-24`}
      >
      <div className=''>
        <CarAnalysis json={data} />
      </div>
      <div>
      <div className="flex flex-row items-center pb-8">
        <div>🚗 {`${data?.vehicleDetail?.vehicle.year} ${data?.vehicleDetail?.vehicle.make} ${data?.vehicleDetail?.vehicle.model} ${data?.vehicleDetail?.vehicle.trim}`}</div>
        <div className="pl-2">🌎 {`${data?.vehicleDetail?.location.city}, ${data?.vehicleDetail?.location.state}, ${data?.vehicleDetail?.location.country}`}</div>
      </div>
        <img className='w-50% shadow-2xl rounded-3xl border-8 border-light' src={image} />
      </div>
    </main>}
    </div>
  )
}
