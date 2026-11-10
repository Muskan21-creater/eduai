import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, Lock, Flag } from 'lucide-react'
import { scrollToId, cn } from '../lib/utils'
const demo = [
  { w: 'Week 1–2', t: 'Python Foundations', s: 'done', d: 'Syntax, data structures, functions. You finished this!' },
  { w: 'Week 3–4', t: 'Data Analysis', s: 'active', d: 'Pandas, cleaning, and visualization. 60% complete.' },
  { w: 'Week 5–6', t: 'Machine Learning', s: 'locked', d: 'Supervised learning and model evaluation. Unlocks next.' },
  { w: 'Week 7–8', t: 'Portfolio Project', s: 'locked', d: 'Ship an end-to-end ML project.' }
]
const icon = { done: <CheckCircle2 className="text-emerald-500" size={20} />, active: <Loader2 className="animate-spin text-brand-600" size={20} />, locked: <Lock className="text-slate-400" size={18} /> }
export default function Hero() {
  const [sel, setSel] = useState(1)
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-50">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-100 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="fade-up">
          <p className="mb-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">Personalized learning paths in seconds</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">Learn Smarter.<br /><span className="text-brand-600">Build Your Future.</span></h1>
          <p className="mt-5 max-w-lg text-lg text-slate-600">Tell EDUAI what you want to learn, how much time you have, and where you are today. Get a week-by-week roadmap that adapts as you progress.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollToId('planner')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700">Build My Learning Plan <ArrowRight size={18} /></button>
            <button onClick={() => scrollToId('paths')} className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600">Explore Learning Paths</button>
          </div>
        </div>
        <div className="fade-up rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6" aria-label="Sample AI learning plan preview">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><Flag size={18} /></span>
            <div><p className="text-xs font-medium uppercase tracking-wide text-slate-500">Goal (sample)</p><p className="font-bold text-slate-900">Become a Machine Learning Engineer</p></div>
          </div>
          <ul className="mt-4 space-y-2">
            {demo.map((d, i) => (
              <li key={d.t}><button onClick={() => setSel(i)} aria-pressed={sel === i} className={cn('flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition', sel === i ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300')}>
                {icon[d.s]}<span className="flex-1"><span className="block text-xs text-slate-500">{d.w}</span><span className="font-semibold text-slate-800">{d.t}</span></span>
                <span className="text-xs font-medium capitalize text-slate-500">{d.s === 'done' ? 'Complete' : d.s === 'active' ? 'In progress' : 'Upcoming'}</span></button></li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600" aria-live="polite">{demo[sel].d}</p>
        </div>
      </div>
    </section>
  )
}
