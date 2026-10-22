import { ChangeEvent, FormEvent, useState } from 'react'


type ContactFormData = {
  firstName: string
  lastName: string
  contactNumber: string
  email: string
  message: string
}

const INITIAL_FORM: ContactFormData = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  message: '',
}

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {

      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.error || 'Unable to save the contact information.')
      }

      setFormData(INITIAL_FORM)
      setSuccess('Your message has been saved. Thank you!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit the form.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page">
      <div className="container contact-grid">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Contact Me</p>
            <h1>Let’s Connect</h1>
            <p>Use the form to send a message.</p>
          </div>

          <aside className="card contact-panel">
            <h2>Contact Information</h2>
            <p><strong>Name:</strong> Vitaliy Kulesh</p>
            <p><strong>Email:</strong> vkulesh@engineer.com</p>
            <p><strong>Phone:</strong> 437-233-6444</p>
            <p><strong>Location:</strong> Whitby, Ontario, Canada</p>
          </aside>
        </div>

        <form className="card contact-form" onSubmit={handleSubmit}>
          {success && <p role="status">{success}</p>}
          {error && <div className="error-banner" role="alert">{error}</div>}

          <div className="form-row">
            <label>
              First Name
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Last Name
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Contact Number
            <input
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </label>

          <label>
            Email Address
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
