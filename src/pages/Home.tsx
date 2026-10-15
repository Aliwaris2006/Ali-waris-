import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Feather, ShieldCheck, ShoppingBag, Award, Users, Truck, Headphones, Star } from 'lucide-react'
import { categories } from '../data/categories'
import { getFeaturedProducts } from '../data/products'
import { articles } from '../data/articles'
import { reviews } from '../data/reviews'
import { players } from '../data/players'
import { matches } from '../data/matches'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import StarRating from '../components/StarRating'
import NewsletterForm from '../components/NewsletterForm'

export default function Home() {
  const featured = getFeaturedProducts()

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-cricket-light overflow-hidden">
        <div className="container-x py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block bg-cricket-red/10 text-cricket-red text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4">
                Built for Every Inning
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] text-cricket-black mb-4">
                Gear Up.<br />Play Like a<br /><span className="text-cricket-red">Champion.</span>
              </h1>
              <p className="text-base md:text-lg text-cricket-gray max-w-md mb-6">
                Discover premium cricket equipment engineered for performance, protection, and confidence on the pitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/shop" className="btn-primary">Shop Cricket Gear <ArrowRight className="w-5 h-5" /></Link>
                <Link to="/shop" className="btn-outline">Explore Collections</Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src="/mrf-cricket-kit.jpg" alt="MRF World Cup Edition Cricket Kit" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-cricket-red" />
                  <div>
                    <p className="text-xs font-bold uppercase">Trusted by Champions</p>
                    <p className="text-xs text-cricket-gray">Premium Quality Gear</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Explore the Game</p>
            <h2 className="section-heading">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-20 bg-cricket-light">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="section-label mb-2">Professional Cricket Equipment</p>
              <h2 className="section-heading">Featured Products</h2>
            </div>
            <Link to="/shop" className="text-sm font-bold uppercase tracking-wide text-cricket-red hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE CRICKET KIT PROMOTION */}
      <section className="py-16 md:py-20 bg-cricket-black text-white overflow-hidden">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src="/mrf-cricket-kit.jpg" alt="Complete Cricket Kit" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 right-4 bg-cricket-red text-white px-4 py-2 rounded-lg font-black text-lg">
                59% OFF
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cricket-red mb-3">Complete Kit</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">The Complete Cricket Kit</h2>
              <p className="text-gray-400 mb-6">Everything you need to step onto the pitch with confidence.</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Shield, title: 'Premium Quality', desc: 'Durable equipment for demanding play.' },
                  { icon: Feather, title: 'Lightweight Comfort', desc: 'Move freely and play with confidence.' },
                  { icon: ShieldCheck, title: 'Protective Design', desc: 'Essential gear for practice and matches.' },
                  { icon: ShoppingBag, title: 'Complete Kit', desc: 'Convenient selection for all players.' },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5 text-cricket-red" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase">{f.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">Kit Includes</p>
                <div className="flex flex-wrap gap-2">
                  {['English Willow Bat', 'Batting Gloves', 'Batting Pads', 'Thigh Guard', 'Arm Guard', 'Abdominal Guard', 'Helmet', 'Kit Bag', 'Cricket Ball'].map((item) => (
                    <span key={item} className="text-xs bg-white/10 px-2.5 py-1 rounded-full">{item}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black">$89.99</span>
                <span className="text-lg text-gray-500 line-through">$219.99</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/product/mrf-world-cup-edition-cricket-kit" className="btn-primary">View Details</Link>
                <Link to="/product/mrf-world-cup-edition-cricket-kit" className="btn-outline bg-white text-cricket-black border-white hover:bg-white hover:text-cricket-red">Add to Cart</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE BAR */}
      <section className="bg-cricket-charcoal text-white py-6">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Ideal For', value: 'All Players' },
              { label: 'Best For', value: 'Matches & Practice' },
              { label: 'Durable', value: 'Long Lasting' },
              { label: 'Perfect Fit', value: 'Ergonomic Design' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-wide text-gray-400">{item.label}</p>
                <p className="font-bold text-sm mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CRICKET PRO */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="text-center mb-10">
            <h2 className="section-heading">Made for the Love of Cricket</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Quality Equipment', desc: 'Carefully selected cricket gear for different skill levels.' },
              { icon: Users, title: 'Player-Focused Design', desc: 'Equipment organized around comfort, performance, and fit.' },
              { icon: Truck, title: 'Easy Shopping', desc: 'Simple product discovery and a smooth shopping experience.' },
              { icon: Headphones, title: 'Customer Support', desc: 'Helpful assistance with product selection and order inquiries.' },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-xl border border-gray-200 hover:border-cricket-red hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-cricket-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-cricket-red" />
                </div>
                <h3 className="font-bold text-sm uppercase mb-2">{f.title}</h3>
                <p className="text-sm text-cricket-gray">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRICKET NEWS & MATCH CENTER */}
      <section className="py-16 md:py-20 bg-cricket-light">
        <div className="container-x">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Inside the Game</p>
            <h2 className="section-heading">Cricket News & Match Center</h2>
          </div>

          {/* Match Center */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {matches.map((m) => (
              <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase text-cricket-gray">{m.tournament}</span>
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                    m.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                    m.status === 'live' ? 'bg-cricket-red text-white' : 'bg-cricket-green/10 text-cricket-green'
                  }`}>
                    {m.status === 'completed' ? 'Completed' : m.status === 'live' ? 'Live' : 'Upcoming'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="font-bold text-sm">{m.team1}</p>
                    {m.score1 && <p className="text-xs text-cricket-gray mt-1">{m.score1}</p>}
                  </div>
                  <span className="text-cricket-gray text-xs px-2">VS</span>
                  <div className="text-center flex-1">
                    <p className="font-bold text-sm">{m.team2}</p>
                    {m.score2 && <p className="text-xs text-cricket-gray mt-1">{m.score2}</p>}
                  </div>
                </div>
                {m.result && <p className="text-xs text-cricket-green font-semibold text-center mt-3">{m.result}</p>}
                <p className="text-xs text-cricket-gray text-center mt-2">{m.date} • {m.time}</p>
                <p className="text-[10px] text-gray-400 text-center mt-1">Sample match data — connect a live cricket API for real-time scores</p>
              </div>
            ))}
          </div>

          {/* News Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a) => (
              <Link key={a.id} to={`/article/${a.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <div className={`aspect-[16/10] bg-gradient-to-br ${a.gradient} flex items-center justify-center text-5xl`}>
                  {a.icon}
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-cricket-red">{a.category}</span>
                  <h3 className="font-bold text-base mt-1 mb-2 group-hover:text-cricket-red transition-colors">{a.title}</h3>
                  <p className="text-sm text-cricket-gray line-clamp-2 mb-3">{a.summary}</p>
                  <div className="flex items-center justify-between text-xs text-cricket-gray">
                    <span>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>{a.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news" className="btn-outline">All News & Updates</Link>
          </div>
        </div>
      </section>

      {/* PLAYER SPOTLIGHT */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Player Spotlight</p>
            <h2 className="section-heading">Master the Game</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {players.map((p) => (
              <div key={p.id} className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${p.gradient} aspect-[3/4] group`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">
                  {p.icon}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-base uppercase">{p.name}</h3>
                  <p className="text-xs text-white/70 mb-2">{p.role}</p>
                  <p className="text-xs text-white/80 line-clamp-2">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-cricket-gray text-center mt-4">Editorial profiles for educational purposes. Not affiliated with or endorsed by professional players.</p>
        </div>
      </section>

      {/* CRICKET GUIDES & TIPS */}
      <section className="py-16 md:py-20 bg-cricket-light">
        <div className="container-x">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Learn & Improve</p>
            <h2 className="section-heading">Cricket Guides & Tips</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(3, 6).map((a) => (
              <Link key={a.id} to={`/guide/${a.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <div className={`aspect-[16/10] bg-gradient-to-br ${a.gradient} flex items-center justify-center text-5xl`}>
                  {a.icon}
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-cricket-red">{a.category}</span>
                  <h3 className="font-bold text-base mt-1 mb-2 group-hover:text-cricket-red transition-colors">{a.title}</h3>
                  <p className="text-sm text-cricket-gray line-clamp-2 mb-3">{a.summary}</p>
                  <span className="text-xs text-cricket-gray">{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/guides" className="btn-outline">All Guides</Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="text-center mb-10">
            <p className="section-label mb-2">What Players Say</p>
            <h2 className="section-heading">Customer Reviews</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((r) => (
              <div key={r.id} className="p-6 rounded-xl border border-gray-200">
                <StarRating rating={r.rating} size="text-base" />
                <p className="text-sm text-cricket-black mt-3 mb-4 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-xs text-cricket-gray">{r.product}</p>
                  </div>
                  {r.verified && (
                    <span className="text-xs font-semibold text-cricket-green flex items-center gap-1">
                      <Star className="w-3 h-3 fill-cricket-green" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 mt-2">Demonstration review — not actual customer feedback</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONAL CTA */}
      <section className="py-16 md:py-20 bg-cricket-light">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="section-heading mb-4">Ready for Your Next Innings?</h2>
            <p className="text-base text-cricket-gray mb-8">
              Find the cricket equipment that matches your ambition. Explore the collection and get ready to play.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="btn-primary">Shop All Equipment <ArrowRight className="w-5 h-5" /></Link>
              <Link to="/guides" className="btn-outline">Explore Cricket Guides</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-20 bg-cricket-black text-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Stay in the Game</h2>
            <p className="text-gray-400 mb-8">
              Get cricket tips, product updates, new arrivals, and special offers delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  )
}
