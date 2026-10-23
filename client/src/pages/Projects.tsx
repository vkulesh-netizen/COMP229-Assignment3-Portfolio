import {useEffect,useState} from 'react'
import {api} from '../api'
import projectWeb from '../assets/project-web.svg'
import projectJava from '../assets/project-java.svg'
import projectAi from '../assets/project-ai.svg'

type Project = {
  title: string
  image: string
  imageAlt: string
  role: string
  outcome: string
  technologies: string
}


function Projects() {
 const [PROJECTS,setRecords]=useState<Project[]>([])
 const [error,setError]=useState(''),[loading,setLoading]=useState(true)
 useEffect(()=>{api('/api/projects').then(rows=>setRecords(rows.map((r:any,index:number)=>({title:r.title,image:({web:projectWeb,java:projectJava,ai:projectAi} as Record<string,string>)[r.imageKey]||[projectWeb,projectJava,projectAi][index%3],imageAlt:r.title,role:r.role||'Portfolio Project',outcome:r.description,technologies:r.technologies||'Completed: '+new Date(r.completion).toLocaleDateString()})))).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[])
  return (
    <section className="page">
      <div className="container">
        {loading&&<p role="status">Loading…</p>}{error&&<p className="error-banner" role="alert">{error}</p>}{!loading&&!error&&PROJECTS.length===0&&<p>No records yet.</p>}
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h1>Selected Work</h1>
          <p>Projects that demonstrate my current technical skills.</p>
        </div>

        <div className="grid grid-3">
          {PROJECTS.map((project) => (
            <article className="card project-card" key={project.title}>
              <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" width="600" height="340" />
              <div className="card-body">
                <h2>{project.title}</h2>
                <p><strong>Role:</strong> {project.role}</p>
                <p><strong>Outcome:</strong> {project.outcome}</p>
                <p><strong>Technologies:</strong> {project.technologies}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
