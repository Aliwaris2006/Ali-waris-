import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

export default function Guides() {
  return (
    <div className="container-x py-8">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Learn & Improve</p>
        <h1 className="section-heading">Cricket Guides & Tips</h1>
        <p className="text-cricket-gray mt-3 max-w-xl mx-auto">
          Expert guides to help you choose the right equipment, improve your technique, and get the most out of your cricket gear.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Link key={a.id} to={`/guide/${a.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
            <div className={`aspect-[16/10] bg-gradient-to-br ${a.gradient} flex items-center justify-center text-5xl`}>
              {a.icon}
            </div>
            <div className="p-5">
              <span className="text-xs font-bold uppercase tracking-wide text-cricket-red">{a.category}</span>
              <h3 className="font-bold text-base mt-1 mb-2 group-hover:text-cricket-red transition-colors">{a.title}</h3>
              <p className="text-sm text-cricket-gray line-clamp-2 mb-3">{a.summary}</p>
              <div className="flex items-center justify-between text-xs text-cricket-gray">
                <span>{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span>{a.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
