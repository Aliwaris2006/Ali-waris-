import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setError('Please enter a valid email address')
      return
    }
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="font-bold text-cricket-green mb-1">✓ Subscribed successfully!</p>
        <p className="text-sm text-cricket-gray">You'll receive cricket tips and updates soon.</p>
        <button onClick={() => setStatus('idle')} className="text-sm text-cricket-red font-semibold mt-3 hover:underline">
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          placeholder="Enter your email"
          aria-label="Email address"
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
      </div>
      {status === 'error' && <p className="text-cricket-red text-sm mt-2 text-center sm:text-left">{error}</p>}
      <p className="text-xs text-cricket-gray mt-3 text-center sm:text-left">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  )
}
