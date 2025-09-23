
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
  //       query: `SELECT * FROM (
  // SELECT K.KategoriID, K.KategoriKodu, K.KategoriAdi,  S.StokKodu, S.StokIsmi,
  // ISNULL((SELECT TOP 1  SatisFiyati FROM SATIS_FIYATLARI WHERE Fk_StokID=S.StokID AND ListeSiraNo=1),0) as fiyat,
  // CASE WHEN S.UrunResmi IS NULL THEN
  // 'https://www.thefuzzyduck.co.uk/wp-content/uploads/2024/05/image-coming-soon-placeholder-01-660x660.png'
  // ELSE Base64_Encode(S.UrunResmi) END
  // as resimUrl
  // FROM KATEGORILER K INNER JOIN
  // STOK_KARTLARI S ON S.Fk_KategoriID=K.KategoriID
  // WHERE S.SatisDursun=0 AND K.KategoriID=${kategori}
  // ) X
  // ORDER BY X.KategoriKodu,X.StokIsmi
  // `
        query: `SELECT * FROM (
  SELECT K.KategoriID, K.KategoriKodu, K.KategoriAdi,  S.StokKodu, S.StokIsmi,
  ISNULL((SELECT TOP 1  SatisFiyati FROM SATIS_FIYATLARI WHERE Fk_StokID=S.StokID AND ListeSiraNo=1),0) as fiyat,
  '' as resimUrl
  FROM KATEGORILER K INNER JOIN
  STOK_KARTLARI S ON S.Fk_KategoriID=K.KategoriID
  WHERE S.SatisDursun=0 AND K.KategoriID=${kategori}
  ) X
  ORDER BY X.KategoriKodu,X.StokIsmi
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