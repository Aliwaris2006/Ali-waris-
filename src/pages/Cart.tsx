import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductVisual from '../components/ProductVisual'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-black uppercase mb-2">Your Cart is Empty</h1>
        <p className="text-cricket-gray mb-8">Add some cricket gear to get started</p>
        <Link to="/shop" className="btn-primary">Shop Now <ArrowRight className="w-5 h-5" /></Link>
      </div>
    )
  }

  const shipping = subtotal >= 50 ? 0 : 7.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="container-x py-8">
      <h1 className="text-2xl md:text-3xl font-black uppercase mb-6">Shopping Cart ({totalItems})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
              <Link to={`/product/${item.product.slug}`} className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <ProductVisual product={item.product} size="text-3xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`}>
                  <h3 className="font-bold text-sm hover:text-cricket-red transition-colors">{item.product.name}</h3>
                </Link>
                <p className="text-xs text-cricket-gray mt-0.5">{item.product.brand}</p>
                {(item.size || item.color) && (
                  <p className="text-xs text-cricket-gray mt-0.5">{[item.size, item.color].filter(Boolean).join(' • ')}</p>
                )}
                <p className="font-black text-sm mt-1">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100" aria-label="Decrease">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100" aria-label="Increase">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-cricket-gray hover:text-cricket-red flex items-center gap-1 text-xs font-semibold" aria-label="Remove">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <Link to="/shop" className="text-sm font-semibold text-cricket-red hover:underline">← Continue Shopping</Link>
            <button onClick={clearCart} className="text-sm font-semibold text-cricket-gray hover:text-cricket-red">Clear Cart</button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 border border-gray-200 rounded-xl sticky top-24">
            <h2 className="font-black uppercase mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-cricket-gray">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-cricket-gray">Shipping</span><span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-cricket-gray">Tax (8%)</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between text-base font-black"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-cricket-green mt-2">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
            )}
            <Link to="/checkout" className="btn-primary w-full mt-4">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
