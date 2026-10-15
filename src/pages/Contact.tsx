import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="container-x py-8">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Get in Touch</p>
        <h1 className="section-heading">Contact Us</h1>
        <p className="text-cricket-gray mt-3 max-w-xl mx-auto">
          Have questions about our products or your order? We're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: Mail, title: 'Email', value: 'support@cricketpro.example', note: 'We respond within 24 hours' },
          { icon: Phone, title: 'Phone', value: '— Editable placeholder —', note: 'Mon-Fri, 9am to 6pm' },
          { icon: MapPin, title: 'Address', value: '— Editable placeholder —', note: 'Business address' },
        ].map((c) => (
          <div key={c.title} className="p-6 border border-gray-200 rounded-xl text-center">
            <div className="w-12 h-12 bg-cricket-red/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <c.icon className="w-6 h-6 text-cricket-red" />
            </div>
            <h3 className="font-bold text-sm uppercase mb-1">{c.title}</h3>
            <p className="text-sm font-semibold text-cricket-black">{c.value}</p>
            <p className="text-xs text-cricket-gray mt-1">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-cricket-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-cricket-green" />
            </div>
            <h2 className="font-black text-xl uppercase mb-2">Message Sent!</h2>
            <p className="text-cricket-gray mb-6">Thank you for reaching out. We'll get back to you soon.</p>
            <button onClick={() => setSubmitted(false)} className="btn-outline">Send Another Message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 border border-gray-200 rounded-xl space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="Your email" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Subject</label>
              <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="How can we help?" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" placeholder="Your message..." />
            </div>
            <button type="submit" className="btn-primary w-full">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
