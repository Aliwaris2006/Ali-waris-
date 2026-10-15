export interface Product {
  id: string
  name: string
  slug: string
  category: string
  categorySlug: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  description: string
  features: string[]
  specs: Record<string, string>
  sizes?: string[]
  colors?: { name: string; hex: string }[]
  stock: number
  badge?: string
  gradient: string
  icon: string
  isNew?: boolean
  isFeatured?: boolean
  popularity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  gradient: string
  icon: string
}

export interface Article {
  id: string
  slug: string
  title: string
  category: string
  date: string
  summary: string
  content: string[]
  readTime: string
  gradient: string
  icon: string
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
  product: string
  verified: boolean
  date: string
}

export interface Player {
  id: string
  name: string
  role: string
  description: string
  gradient: string
  icon: string
}

export interface Match {
  id: string
  team1: string
  team2: string
  status: 'upcoming' | 'live' | 'completed'
  date: string
  time: string
  tournament: string
  score1?: string
  score2?: string
  result?: string
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}
