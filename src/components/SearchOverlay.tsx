import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { products } from '../data/products'

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(products.slice(0, 5))
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults(products.slice(0, 5))
      return
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered.slice(0, 8))
  }, [query])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query)}`)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 left-0 right-0 bg-white shadow-xl animate-fade-in">
        <div className="container-x py-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-cricket-gray" />
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for cricket equipment..."
                className="w-full text-lg outline-none bg-transparent"
              />
            </form>
            <button onClick={onClose} aria-label="Close search"><X className="w-6 h-6" /></button>
          </div>
          {results.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-cricket-gray mb-3">
                {query ? `Results (${results.length})` : 'Popular Products'}
              </p>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { navigate(`/product/${p.slug}`); onClose() }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center text-lg shrink-0`}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{p.name}</p>
                      <p className="text-xs text-cricket-gray">{p.category}</p>
                    </div>
                    <span className="font-bold text-sm">${p.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {query && results.length === 0 && (
            <div className="mt-4 border-t pt-8 pb-4 text-center">
              <p className="text-cricket-gray">No products found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
