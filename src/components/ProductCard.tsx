import { Link } from 'react-router-dom'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { Product } from '../data/types'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductVisual from './ProductVisual'
import StarRating from './StarRating'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const wished = isWishlisted(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
            <ProductVisual product={product} />
          </div>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-cricket-red text-white text-xs font-bold uppercase px-2 py-1 rounded">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-cricket-green text-white text-xs font-bold uppercase px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-cricket-gray mb-1">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-bold text-cricket-black text-sm leading-snug mb-1 hover:text-cricket-red transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-cricket-gray">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-black text-cricket-black">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-cricket-gray line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-cricket-black text-white text-xs font-bold uppercase py-2.5 rounded-lg hover:bg-cricket-red transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          <button
            onClick={() => toggle(product)}
            aria-label="Toggle wishlist"
            className="p-2.5 border border-gray-300 rounded-lg hover:border-cricket-red transition-colors"
          >
            <Heart className={`w-4 h-4 ${wished ? 'fill-cricket-red text-cricket-red' : 'text-cricket-black'}`} />
          </button>
        </div>
      </div>

      <Link
        to={`/product/${product.slug}`}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-full shadow-md"
        aria-label="Quick view"
      >
        <Eye className="w-4 h-4 text-cricket-black" />
      </Link>
    </div>
  )
}
