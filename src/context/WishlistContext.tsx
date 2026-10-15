import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../data/types'

interface WishlistContextType {
  items: Product[]
  toggle: (product: Product) => void
  isWishlisted: (productId: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('cricket-pro-wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cricket-pro-wishlist', JSON.stringify(items))
    } catch {}
  }, [items])

  const toggle = (product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isWishlisted = (productId: string) => items.some((p) => p.id === productId)
  const count = items.length

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
