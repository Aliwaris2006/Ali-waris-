import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductVisual from './ProductVisual'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-black text-lg uppercase">Cart ({totalItems})</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart"><X className="w-6 h-6" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-cricket-gray font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm text-gray-400 mb-6">Add some cricket gear to get started</p>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="btn-primary">Shop Now</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 border-b pb-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <ProductVisual product={item.product} size="text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-snug truncate">{item.product.name}</h3>
                    {(item.size || item.color) && (
                      <p className="text-xs text-cricket-gray mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(' • ')}
                      </p>
                    )}
                    <p className="font-black text-sm mt-1">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100" aria-label="Decrease quantity">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100" aria-label="Increase quantity">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 text-cricket-gray hover:text-cricket-red" aria-label="Remove item">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between font-bold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-cricket-gray">Shipping and taxes calculated at checkout</p>
              <div className="flex gap-2">
                <Link to="/cart" onClick={() => setIsOpen(false)} className="btn-outline flex-1 text-sm">View Cart</Link>
                <Link to="/checkout" onClick={() => setIsOpen(false)} className="btn-primary flex-1 text-sm">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
