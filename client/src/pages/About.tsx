import profilePhoto from '../assets/vitaliy-kulesh.png'

function About() {
  return (
    <section className="page">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">About Me</p>
          <h1>Vitaliy Kulesh</h1>
        </div>

        <div className="about-grid">
          <img
            className="profile-photo"
            src={profilePhoto}
            alt="Vitaliy Kulesh"
          />

          <div className="card">
            <p>
              I am a Software Engineering Technology – Artificial Intelligence student
              with a strong technical background in marine engineering, automation,
              electronics and marine surveying. I am currently expanding my skills in
              React, JavaScript, TypeScript, Python, Java, databases and modern web
              application development.
            </p>
            <p>
              My professional background includes work as a marine surveyor and senior
              marine engineer on technically complex vessels. I enjoy practical problem
              solving and combining engineering experience with software to create clear,
              reliable and useful solutions.
            </p>

            <a className="btn btn-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
              Open My Résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
