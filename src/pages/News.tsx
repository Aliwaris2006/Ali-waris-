import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { matches } from '../data/matches'

export default function News() {
  return (
    <div className="container-x py-8">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Inside the Game</p>
        <h1 className="section-heading">Cricket News & Match Center</h1>
      </div>

      {/* Match Center */}
      <h2 className="font-black text-xl uppercase mb-4">Match Center</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {matches.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-5">
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
                <p className="font-bold">{m.team1}</p>
                {m.score1 && <p className="text-sm text-cricket-gray mt-1">{m.score1}</p>}
              </div>
              <span className="text-cricket-gray text-sm px-3">VS</span>
              <div className="text-center flex-1">
                <p className="font-bold">{m.team2}</p>
                {m.score2 && <p className="text-sm text-cricket-gray mt-1">{m.score2}</p>}
              </div>
            </div>
            {m.result && <p className="text-sm text-cricket-green font-semibold text-center mt-3">{m.result}</p>}
            <p className="text-xs text-cricket-gray text-center mt-2">{m.date} • {m.time}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center mb-12">Sample match data — connect a live cricket API for real-time scores</p>

      {/* News Articles */}
      <h2 className="font-black text-xl uppercase mb-4">Latest News</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
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
    </div>
  )
}
