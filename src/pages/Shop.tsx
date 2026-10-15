import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/ProductCard'

const brands = [...new Set(products.map((p) => p.brand))]
const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [sort, setSort] = useState('popularity')

  const search = searchParams.get('q') || ''
  const selectedCategory = searchParams.get('category') || ''
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    if (searchParams.get('q') && !searchParams.get('category')) {
      // search query mode
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (selectedCategory) {
      result = result.filter((p) => p.categorySlug === selectedCategory)
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0)
    }
    if (priceRange.min) {
      result = result.filter((p) => p.price >= parseFloat(priceRange.min))
    }
    if (priceRange.max) {
      result = result.filter((p) => p.price <= parseFloat(priceRange.max))
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      default: result.sort((a, b) => b.popularity - a.popularity)
    }
    return result
  }, [search, selectedCategory, selectedBrands, minRating, inStockOnly, priceRange, sort])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setMinRating(0)
    setInStockOnly(false)
    setPriceRange({ min: '', max: '' })
    setSearchParams({})
  }

  const setCategory = (slug: string) => {
    const params: Record<string, string> = {}
    if (slug) params.category = slug
    if (search) params.q = search
    setSearchParams(params)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-sm uppercase mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => setCategory('')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-cricket-red text-white' : 'hover:bg-gray-100'}`}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.slug)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === c.slug ? 'bg-cricket-red text-white' : 'hover:bg-gray-100'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-bold text-sm uppercase mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="input-field text-sm" />
          <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="input-field text-sm" />
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-bold text-sm uppercase mb-3">Brands</h3>
        <div className="space-y-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="w-4 h-4 accent-cricket-red" />
              <span className="text-sm">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-bold text-sm uppercase mb-3">Minimum Rating</h3>
        <div className="space-y-1">
          {[0, 3, 4, 4.5].map((r) => (
            <label key={r} className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="w-4 h-4 accent-cricket-red" />
              <span className="text-sm">{r === 0 ? 'All Ratings' : `${r}+ Stars`}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-bold text-sm uppercase mb-3">Availability</h3>
        <label className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="w-4 h-4 accent-cricket-red" />
          <span className="text-sm">In Stock Only</span>
        </label>
      </div>

      <button onClick={clearFilters} className="w-full btn-outline text-sm">Clear All Filters</button>
    </div>
  )

  return (
    <div className="container-x py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black uppercase mb-1">
          {search ? `Search: "${search}"` : selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name || 'Shop' : 'Shop All Products'}
        </h1>
        <p className="text-sm text-cricket-gray">{filtered.length} {filtered.length === 1 ? 'product' : 'products'} found</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterContent />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-semibold border border-gray-300 px-4 py-2 rounded-lg">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-cricket-gray hidden sm:block">Sort by:</span>
              <div className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-cricket-red">
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🏏</p>
              <h3 className="font-bold text-lg mb-2">No products found</h3>
              <p className="text-sm text-cricket-gray mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white shadow-xl animate-slide-in-left overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="font-black uppercase">Filters</h2>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
