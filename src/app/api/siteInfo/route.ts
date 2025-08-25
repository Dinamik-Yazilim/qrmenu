import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(request: Request) {
  return new Response(JSON.stringify({
    site_title: process.env.site_title || 'site title',
    site_subtitle: process.env.site_subtitle || 'subtitle',
    site_address: process.env.site_address || 'address',
    site_phone: process.env.site_phone || 'phone',
    site_copyright: process.env.site_copyright || 'copyright',
    site_logo_url: process.env.site_logo_url || '',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });

}
// type ResponseData = {
//   message: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   console.log('API route accessed');
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }