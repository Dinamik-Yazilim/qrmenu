
export async function GET(request: Request) {

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
      query: `SELECT TOP 30 K.ktg_kod, K.ktg_isim
FROM STOK_KATEGORILERI K
ORDER BY K.ktg_kod
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