import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, CreditCard, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'United States',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  })

  const shipping = subtotal >= 50 ? 0 : 7.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="container-x py-20 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-cricket-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-cricket-green" />
        </div>
        <h1 className="text-2xl font-black uppercase mb-2">Order Confirmed!</h1>
        <p className="text-cricket-gray mb-2">Thank you for your order. A confirmation has been sent to your email.</p>
        <p className="text-xs text-gray-400 mb-8">This is a demonstration checkout — no payment has been processed.</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-black uppercase mb-4">Your Cart is Empty</h1>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="container-x py-8">
      <h1 className="text-2xl md:text-3xl font-black uppercase mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="p-6 border border-gray-200 rounded-xl">
            <h2 className="font-bold uppercase text-sm mb-4">Contact Details</h2>
            <div className="grid gap-4">
              <input type="email" required placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
            </div>
          </div>

          {/* Shipping */}
          <div className="p-6 border border-gray-200 rounded-xl">
            <h2 className="font-bold uppercase text-sm mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" required placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="input-field" />
              <input type="text" required placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="input-field" />
              <input type="text" required placeholder="Street address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field sm:col-span-2" />
              <input type="text" required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" />
              <input type="text" required placeholder="ZIP / Postal code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="input-field" />
              <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="input-field sm:col-span-2">
                <option>United States</option><option>United Kingdom</option><option>Australia</option><option>India</option><option>Pakistan</option><option>South Africa</option><option>New Zealand</option><option>Other</option>
              </select>
            </div>
          </div>

          {/* Payment */}
          <div className="p-6 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold uppercase text-sm">Payment Method</h2>
              <span className="text-xs text-cricket-gray flex items-center gap-1"><Lock className="w-3 h-3" /> Demo only</span>
            </div>
            <div className="grid gap-4">
              <input type="text" required placeholder="Name on card" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} className="input-field" />
              <div className="relative">
                <input type="text" required placeholder="Card number" maxLength={19} value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} className="input-field pr-12" />
                <CreditCard className="w-5 h-5 text-cricket-gray absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="input-field" />
                <input type="text" required placeholder="CVV" maxLength={4} value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} className="input-field" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">This is a demonstration checkout. No real payment will be processed. Do not enter real card details.</p>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 border border-gray-200 rounded-xl sticky top-24">
            <h2 className="font-black uppercase mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-cricket-gray truncate pr-2">{item.product.name} × {item.quantity}</span>
                  <span className="font-semibold shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-3">
              <div className="flex justify-between"><span className="text-cricket-gray">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-cricket-gray">Shipping</span><span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-cricket-gray">Tax (8%)</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
              <div className="border-t pt-2 flex justify-between text-base font-black"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button type="submit" className="btn-primary w-full mt-4">Place Order</button>
            <Link to="/cart" className="block text-center text-sm text-cricket-gray hover:text-cricket-red mt-3">← Back to Cart</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
