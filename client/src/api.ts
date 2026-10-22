export async function api(url:string, options:RequestInit={}) {
  const response=await fetch(url,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}})
  const data=await response.json().catch(()=>({error:'The server returned an invalid response.'}))
  if(!response.ok) throw new Error(data.error || 'Request failed.')
  return data
}
