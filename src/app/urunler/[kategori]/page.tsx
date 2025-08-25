"use client"
import Header from "@/app/(components)/header";
import { Kategori } from "@/types/Kategori";
import { SiteInfo } from "@/types/SiteInfo";
import { Stok } from "@/types/Stok";
import Image from "next/image";
import Link from "next/link";
import { config } from "process";
import React, { use, useEffect, useState } from "react";


export default function Urunler({ params }: { params: Promise<{ kategori: string }> }) {
  const [urunler, setUrunler] = useState<Stok[]>([])
  const [loaded, setLoaded] = useState(false)
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({})
  const { kategori } = use(params)
  const getSiteInfo = async () => {
    try {
      const response = await fetch('/api/siteInfo');
      if (response.ok) {
        const data = await response.json();
        setSiteInfo(data as SiteInfo)
      } else {
        console.error('Error fetching site info:', response.statusText)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      getSiteInfo();

      fetch(`/api/urunler?kategori=${kategori}`).then(res => res.json()).then(data => {
        setUrunler(data)
      })
        .catch(err => {
          console.error('Fetch error:', err)
        })
    }
  }, [kategori])

  return (
    <div className="w-full px-4">
      <Header siteInfo={siteInfo} />
      <div className="mb-4">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 border-b border-gray-300 mb-2 pb-2">
          <div className="col-span-2 lg:col-span-4">Urun</div>
          <div className="text-end">Fiyat</div>
        </div>
        {urunler && urunler.map((urun) => (<div key={urun.sto_kod} className="flex flex-col mb-2">
          <div className="flex justify-center mb-2">
            {urun.sto_resim_url ? <img className="max-h-[150px]" src={urun.sto_resim_url} alt={urun.sto_isim} /> : <div className="w-full h-[150px] flex justify-center items-center bg-gray-200 text-gray-500">Resim Yok</div>}
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 border-b border-gray-300 mb-2 pb-2">
            <div className="col-span-2 lg:col-span-4">{urun.sto_isim}</div>
            <div className="text-end">{urun.fiyat?.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })} TL</div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )

}
