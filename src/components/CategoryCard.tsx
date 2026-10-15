import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Category } from '../data/types'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br ${category.gradient} aspect-[4/3] block"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 group-hover:scale-110 transition-transform duration-300">
        {category.icon}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-base mb-0.5">{category.name}</h3>
        <p className="text-xs text-white/80 mb-2">{category.description}</p>
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide group-hover:gap-2 transition-all">
          Shop Now <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
