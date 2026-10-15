import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { items } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-black uppercase mb-2">Your Wishlist is Empty</h1>
        <p className="text-cricket-gray mb-8">Save your favorite cricket gear for later</p>
        <Link to="/shop" className="btn-primary">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="container-x py-8">
      <h1 className="text-2xl md:text-3xl font-black uppercase mb-6">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
