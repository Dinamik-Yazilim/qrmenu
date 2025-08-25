"use client"
import { Kategori } from "@/types/Kategori";
import { SiteInfo } from "@/types/SiteInfo";
import Image from "next/image";
import Link from "next/link";
import { config } from "process";
import React, { use, useEffect, useState } from "react";
import Header from "./(components)/header";

export default function Home() {
  const [categories, setCategories] = useState<Kategori[]>([])
  const [loaded, setLoaded] = useState(false)
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({})

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

      fetch('/api/kategoriler').then(res => res.json()).then(data => {
        setCategories(data)
      })
        .catch(err => {
          console.error('Fetch error:', err)
        })
    }
  }, [])
  return (
    <div className="container mx-4">
      <Header siteInfo={siteInfo} />
      <ul>
        {categories && categories.map((category) => (
          <li key={category.ktg_kod}>
            <Link href={`/urunler/${category.ktg_kod}`}>
            {category.ktg_isim} ({category.ktg_kod})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

}
