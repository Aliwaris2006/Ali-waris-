import { Link } from 'react-router-dom'
import { Award, Users, Truck, Headphones, Target, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="container-x py-8">
      <div className="text-center mb-12">
        <p className="section-label mb-2">Our Story</p>
        <h1 className="section-heading">About Cricket Pro</h1>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-lg text-cricket-gray leading-relaxed mb-4">
          CRICKET PRO is born from a passion for the game. We believe every cricketer deserves access to premium quality equipment
          that enhances their performance and protects them on the pitch.
        </p>
        <p className="text-base text-cricket-gray leading-relaxed">
          From English willow bats to professional-grade protective gear, we carefully select every product in our catalog to ensure
          it meets the standards of serious cricketers. Whether you're a beginner stepping onto the pitch for the first time or a
          seasoned professional, we have the equipment to help you play like a champion.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To provide cricketers at every level with quality equipment that enhances performance and safety.' },
          { icon: Heart, title: 'Our Passion', desc: 'Cricket is more than a sport — it\'s a way of life. We share that passion in every product we offer.' },
          { icon: Award, title: 'Our Standard', desc: 'We only stock equipment that meets our strict quality standards. No compromises on performance.' },
        ].map((v) => (
          <div key={v.title} className="p-6 border border-gray-200 rounded-xl text-center">
            <div className="w-12 h-12 bg-cricket-red/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <v.icon className="w-6 h-6 text-cricket-red" />
            </div>
            <h3 className="font-bold text-sm uppercase mb-2">{v.title}</h3>
            <p className="text-sm text-cricket-gray">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-cricket-light rounded-2xl p-8 md:p-12 mb-16">
        <h2 className="font-black text-xl uppercase mb-6 text-center">Why Choose Cricket Pro</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Award, title: 'Quality Equipment', desc: 'Carefully selected gear for all skill levels.' },
            { icon: Users, title: 'Player-Focused', desc: 'Designed around comfort and performance.' },
            { icon: Truck, title: 'Easy Shopping', desc: 'Simple discovery and smooth experience.' },
            { icon: Headphones, title: 'Customer Support', desc: 'Helpful assistance when you need it.' },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                <f.icon className="w-6 h-6 text-cricket-red" />
              </div>
              <h3 className="font-bold text-sm uppercase mb-1">{f.title}</h3>
              <p className="text-xs text-cricket-gray">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="font-black text-xl uppercase mb-4">Ready to Gear Up?</h2>
        <Link to="/shop" className="btn-primary">Shop Cricket Equipment</Link>
      </div>
    </div>
  )
}
