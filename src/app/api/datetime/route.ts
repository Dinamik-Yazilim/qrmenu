
export async function GET(request: Request) {
  const clientId = process.env.connector_client_id;
  const clientPass = process.env.connector_client_pass;
  const connectorUrl = process.env.connector_url;

  console.log('clientId:', clientId)
  console.log('clientPass:', clientPass ? '***' : 'not set')
  console.log('connectorUrl:', connectorUrl)

  const response = await fetch(`${connectorUrl}/datetime`, {
    headers: {
      'Content-Type': 'application/json',
      'clientid': clientId || '',
      'clientpass': clientPass || ''
    },
    method: 'POST',
    body: JSON.stringify({})
  })
  if (response.ok) {
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }); 

  }else{
    return new Response(JSON.stringify({ error: response.statusText }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

}