
export async function GET(request: Request) {
  const myURL = new URL(request.url)
  const kategori = myURL.searchParams.get('kategori') || ''

  if(kategori===''){
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  const response = await fetch(`${process.env.connector_url || ''}/mssql`, {
      headers: {
        'Content-Type': 'application/json',
        'clientid': process.env.connector_client_id || '',
        'clientpass': process.env.connector_client_pass || ''
      },
      method: 'POST',
      body: JSON.stringify({
        config: {
          server: process.env.config_server,
          database: process.env.config_database,
          user: process.env.config_user,
          password: process.env.config_password,
          port: Number(process.env.config_port) || 1433,
          options: {
            encrypt: false,
            trustedConnection: false,
            trustServerCertificate: true
          }
        },
        query: `SELECT * FROM (
  SELECT K.ktg_kod, K.ktg_isim, S.sto_kod, S.sto_isim, S.sto_yabanci_isim,
  ISNULL((SELECT TOP 1  sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod=S.sto_kod AND sfiyat_deposirano=0 and sfiyat_listesirano=1),0) as fiyat,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzIVL9apsvyeObnJbCmWRPy83fgKPRNuXSg&s' as sto_resim_url
  FROM STOK_KATEGORILERI K INNER JOIN
  STOKLAR S ON S.sto_kategori_kodu=K.ktg_kod
  WHERE S.sto_satis_dursun=0 AND K.ktg_kod='${kategori}'
  ) X
  ORDER BY X.ktg_kod,X.sto_isim
  `
      })
    })
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return new Response(JSON.stringify(data.data && data.data.recordsets[0]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      } else {
        return new Response(JSON.stringify({ error: data.error }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }


    } else {
      return new Response(JSON.stringify({ error: response.statusText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  

  

}