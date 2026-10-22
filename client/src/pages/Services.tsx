type Service = {
  icon: string
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: '💻',
    title: 'Web Development',
    description:
      'Responsive websites and front-end interfaces using React, JavaScript, TypeScript, HTML and CSS.',
  },
  {
    icon: '⚙️',
    title: 'Programming',
    description:
      'Small applications and programming assignments using Python, Java and object-oriented design.',
  },
  {
    icon: '🧠',
    title: 'AI & Data Projects',
    description:
      'Entry-level artificial intelligence, data processing and software-analysis projects for practical applications.',
  },
]

function Services() {
  return (
    <section className="page">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h1>What I Can Help With</h1>
        </div>

        <div className="grid grid-3">
          {SERVICES.map((service) => (
            <article className="card service-card" key={service.title}>
              <div className="service-icon" aria-hidden="true">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
