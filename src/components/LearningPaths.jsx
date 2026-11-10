import { Brain, BarChart3, Code2, Compass, Terminal, Clock, Layers, ArrowRight } from 'lucide-react'
import { PATHS } from '../data/learningPaths'
const icons = { Brain, BarChart3, Code2, Compass, Terminal }
export default function LearningPaths({ onPick }) {
  return (
    <section id="paths" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6">
      <h2 className="text-3xl font-extrabold text-slate-900">Popular learning paths</h2>
      <p className="mt-2 max-w-xl text-slate-600">Not sure where to start? Pick a path and we will pre-fill the planner for you.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PATHS.map((p) => { const I = icons[p.icon]; return (
          <article key={p.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><I size={22} aria-hidden /></span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{p.name}</h3>
            <p className="mt-1 flex-1 text-sm text-slate-600">{p.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <li className="rounded-full bg-slate-100 px-2.5 py-1">{p.level}</li>
              <li className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1"><Clock size={12} />{p.duration}</li>
              <li className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1"><Layers size={12} />{p.modules.length} modules</li>
            </ul>
            <button onClick={() => onPick(p)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">Explore Path <ArrowRight size={16} /></button>
          </article>) })}
      </div>
    </section>
  )
}
