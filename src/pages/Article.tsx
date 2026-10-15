import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { getArticleBySlug, articles } from '../data/articles'

export default function Article() {
  const { slug } = useParams()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-black mb-4">Article not found</h1>
        <Link to="/news" className="btn-primary">Back to News</Link>
      </div>
    )
  }

  const related = articles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <div>
      {/* Header */}
      <div className={`bg-gradient-to-br ${article.gradient} py-16`}>
        <div className="container-x">
          <Link to="/news" className="text-white/80 text-sm hover:text-white flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-white/80">{article.category}</span>
          <h1 className="text-2xl md:text-4xl font-black text-white mt-2 mb-3 max-w-3xl">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span>{new Date(article.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-x py-12">
        <div className="max-w-3xl">
          <p className="text-lg text-cricket-gray mb-6 font-semibold">{article.summary}</p>
          <div className="space-y-4">
            {article.content.map((para, i) => (
              <p key={i} className="text-base text-cricket-black leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-16 max-w-5xl">
          <h2 className="font-black text-xl uppercase mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link key={a.id} to={`/article/${a.slug}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <div className={`aspect-[16/10] bg-gradient-to-br ${a.gradient} flex items-center justify-center text-4xl`}>
                  {a.icon}
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-cricket-red">{a.category}</span>
                  <h3 className="font-bold text-sm mt-1 group-hover:text-cricket-red transition-colors">{a.title}</h3>
                  <span className="text-xs text-cricket-gray mt-2 block">{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
