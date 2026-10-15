import { Player } from './types'

export const players: Player[] = [
  {
    id: 'pl1',
    name: 'Top Batters',
    role: 'Batting Techniques',
    description: 'Master the art of batting with proper technique, footwork, and shot selection. Learn from the best to build a solid foundation.',
    gradient: 'from-blue-700 to-blue-950',
    icon: '🏏',
  },
  {
    id: 'pl2',
    name: 'Fast Bowlers',
    role: 'Bowling Techniques',
    description: 'Develop pace, accuracy, and consistency with proper bowling mechanics. Build a repeatable action that generates speed and control.',
    gradient: 'from-red-700 to-red-950',
    icon: '⚡',
  },
  {
    id: 'pl3',
    name: 'Spin Specialists',
    role: 'Spin Bowling',
    description: 'The art of spin bowling requires guile, variation, and control. Learn to turn the ball and deceive batsmen with flight and drift.',
    gradient: 'from-emerald-700 to-emerald-950',
    icon: '🌀',
  },
  {
    id: 'pl4',
    name: 'Wicket-Keepers',
    role: 'Wicket-Keeping',
    description: 'Sharp reflexes, positioning, and technique are essential for wicket-keeping. Master the skills needed behind the stumps.',
    gradient: 'from-amber-700 to-amber-950',
    icon: '🧤',
  },
]
