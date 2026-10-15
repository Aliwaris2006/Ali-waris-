import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingCart, Minus, Plus, Truck, RotateCcw, ShieldCheck, Check } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { reviews } from '../data/reviews'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductVisual from '../components/ProductVisual'
import StarRating from '../components/StarRating'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '')
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')

  if (!product) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-black mb-4">Product not found</h1>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const related = getRelatedProducts(product)
  const productReviews = reviews.filter((r) => r.product === product.name)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const wished = isWishlisted(product.id)

  // Gallery: use the product visual repeated with different "angles" (since we only have gradient-based visuals)
  const galleryImages = [product, product, product]

  return (
    <div className="container-x py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-cricket-gray mb-6">
        <Link to="/" className="hover:text-cricket-red">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-cricket-red">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-cricket-red">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-cricket-black font-semibold">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 mb-4">
            <ProductVisual product={product} size="text-9xl" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((_, i) => (
              <button key={i} className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-cricket-red transition-colors">
                <ProductVisual product={product} size="text-3xl" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-cricket-red mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-black mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} size="text-base" />
            <span className="text-sm text-cricket-gray">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black text-cricket-black">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-cricket-gray line-through">${product.originalPrice}</span>
                <span className="bg-cricket-red text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>
              </>
            )}
          </div>

          <p className="text-sm text-cricket-gray mb-6 leading-relaxed">{product.description}</p>

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-4">
              <p className="text-sm font-bold mb-2">Size: <span className="text-cricket-gray font-normal">{selectedSize}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 border-2 rounded-lg text-sm font-semibold transition-colors ${selectedSize === s ? 'border-cricket-red bg-cricket-red text-white' : 'border-gray-300 hover:border-cricket-black'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && (
            <div className="mb-4">
              <p className="text-sm font-bold mb-2">Color: <span className="text-cricket-gray font-normal">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? 'border-cricket-red ring-2 ring-cricket-red/30' : 'border-gray-300'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <span className="text-sm font-semibold text-cricket-green flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-sm font-semibold text-cricket-red">Out of Stock</span>
            )}
          </div>

          {/* Quantity + Actions */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100" aria-label="Decrease quantity">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100" aria-label="Increase quantity">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
              className="btn-primary flex-1"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              onClick={() => toggle(product)}
              aria-label="Toggle wishlist"
              className="p-3 border-2 border-gray-300 rounded-lg hover:border-cricket-red transition-colors"
            >
              <Heart className={`w-5 h-5 ${wished ? 'fill-cricket-red text-cricket-red' : 'text-cricket-black'}`} />
            </button>
          </div>

          <button onClick={() => { addToCart(product, quantity, selectedSize, selectedColor); window.location.href = '/checkout' }} className="btn-secondary w-full mb-6">
            Buy Now
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-1 text-cricket-gray" />
              <p className="text-xs font-semibold">Free Shipping</p>
              <p className="text-[10px] text-cricket-gray">On orders over $50</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-1 text-cricket-gray" />
              <p className="text-xs font-semibold">Easy Returns</p>
              <p className="text-[10px] text-cricket-gray">30-day return policy</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-6 h-6 mx-auto mb-1 text-cricket-gray" />
              <p className="text-xs font-semibold">Secure Payment</p>
              <p className="text-[10px] text-cricket-gray">100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b mb-6 overflow-x-auto">
          {(['description', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-cricket-red text-cricket-red' : 'border-transparent text-cricket-gray hover:text-cricket-black'}`}
            >
              {tab === 'specs' ? 'Specifications' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="max-w-3xl">
            <p className="text-sm text-cricket-black leading-relaxed mb-4">{product.description}</p>
            <h3 className="font-bold text-sm uppercase mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-cricket-green mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-2xl">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key} className="border-b">
                    <td className="py-3 font-semibold text-sm w-1/3">{key}</td>
                    <td className="py-3 text-sm text-cricket-gray">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((r) => (
                  <div key={r.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <StarRating rating={r.rating} />
                        <span className="font-bold text-sm">{r.name}</span>
                      </div>
                      {r.verified && <span className="text-xs font-semibold text-cricket-green">✓ Verified Purchase</span>}
                    </div>
                    <p className="text-sm text-cricket-black mb-2">{r.text}</p>
                    <p className="text-xs text-cricket-gray">{new Date(r.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-sm text-cricket-gray mb-6">No reviews yet for this specific product. Here are some recent reviews from our store:</p>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((r) => (
                    <div key={r.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <StarRating rating={r.rating} />
                          <span className="font-bold text-sm">{r.name}</span>
                        </div>
                        {r.verified && <span className="text-xs font-semibold text-cricket-green">✓ Verified Purchase</span>}
                      </div>
                      <p className="text-sm text-cricket-black mb-2">{r.text}</p>
                      <p className="text-xs text-cricket-gray">{r.product}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">Demonstration reviews — not actual customer feedback</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="section-heading text-2xl mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
