import { Product } from '../data/types'

export default function ProductVisual({ product, className = '', size = 'text-6xl' }: { product: Product; className?: string; size?: string }) {
  if (product.id === 'p1') {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img
          src="/mrf-cricket-kit.jpg"
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }
  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br ${product.gradient} ${className}`}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2) 0%, transparent 50%)',
      }} />
      <span className={`${size} drop-shadow-lg relative z-10`}>{product.icon}</span>
    </div>
  )
}
