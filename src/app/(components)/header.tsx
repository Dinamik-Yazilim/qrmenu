import { SiteInfo } from "@/types/SiteInfo";
import Link from "next/link";

export default function Header({ siteInfo }: { siteInfo: SiteInfo }) {
  return (
    <Link href={'/'} className="flex flex-col justify-center border-b-2 border-gray-300 mb-4 pb-4 w-full">
      <div className="flex justify-center w-full "> <img className="max-h-[80px]" src={siteInfo?.site_logo_url} alt="logo" /></div>
      <h1 className="text-2xl text-center">{siteInfo?.site_title}</h1>
      <h2 className="text-xl text-center">{siteInfo?.site_subtitle}</h2>
    </Link>
  )
}