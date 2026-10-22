import {useEffect,useState} from 'react'
import {api} from '../api'
type Qualification = {
  school: string
  program: string
  period: string
  details: string
}


function Education() {
 const [QUALIFICATIONS,setRecords]=useState<Qualification[]>([])
 const [error,setError]=useState(''),[loading,setLoading]=useState(true)
 useEffect(()=>{api('/api/qualifications').then(rows=>setRecords(rows.map((r:any,index:number)=>({school:r.school||r.firstname+' '+r.lastname,program:r.title,period:r.period||new Date(r.completion).toLocaleDateString(),details:r.description})))).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[])
  return (
    <section className="page">
      <div className="container narrow">
        {loading&&<p role="status">Loading…</p>}{error&&<p className="error-banner" role="alert">{error}</p>}{!loading&&!error&&QUALIFICATIONS.length===0&&<p>No records yet.</p>}
        <div className="section-heading">
          <p className="eyebrow">Education</p>
          <h1>Education & Qualifications</h1>
        </div>

        <div className="timeline">
          {QUALIFICATIONS.map((item) => (
            <article className="card timeline-item" key={`${item.school}-${item.program}`}>
              <p className="eyebrow">{item.period}</p>
              <h2>{item.program}</h2>
              <h3>{item.school}</h3>
              <p>{item.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
