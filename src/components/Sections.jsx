import { MessageSquare, Cpu, Map, TrendingUp, Zap, Target, Route, Layers, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { scrollToId } from '../lib/utils'
const Wrap = ({ id, className = '', children }) => <section id={id} className={`scroll-mt-16 ${className}`}><div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">{children}</div></section>
export function HowItWorks() {
  const steps = [[MessageSquare, 'Tell us your goal', 'Describe what you want to learn.'], [Cpu, 'EDUAI analyzes your needs', 'Intent, category, level, and time are scored.'], [Map, 'Receive a personalized roadmap', 'Week-by-week modules and a daily schedule.'], [Target, 'Learn and track progress', 'Mark modules as you go.'], [TrendingUp, 'Get adaptive recommendations', 'Your next step updates automatically.']]
  return <Wrap id="how" className="bg-white"><h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
    <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{steps.map(([I, t, d], i) => <li key={t} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><I size={20} aria-hidden /></span><p className="mt-3 text-xs font-bold text-brand-600">STEP {i + 1}</p><h3 className="font-bold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></li>)}</ol></Wrap>
}
export function Features() {
  const f = [[Route, 'Personalized Roadmaps', 'Learning plans based on your goal, level and available time.'], [Zap, 'Smart Recommendations', 'Get the next best learning action automatically.'], [TrendingUp, 'Adaptive Progress', 'Your learning recommendations change based on your progress.'], [Layers, 'Focused Learning', 'Break complex goals into manageable steps.']]
  return <Wrap id="features"><h2 className="text-3xl font-extrabold text-slate-900">Built around how people actually learn</h2>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{f.map(([I, t, d]) => <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6"><I className="text-brand-600" /><h3 className="mt-3 font-bold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></div>)}</div></Wrap>
}
export function WhyEduai() {
  return <Wrap id="why" className="bg-white"><div className="grid gap-10 lg:grid-cols-2"><div><h2 className="text-3xl font-extrabold text-slate-900">Why EDUAI?</h2>
    <p className="mt-3 text-slate-600">Students often do not know what to learn first, which topics matter, how to structure their learning, or whether they are progressing correctly.</p></div>
    <ul className="space-y-3">{[['What to learn first', 'A prioritized module order, not a pile of links.'], ['Which topics matter', 'Short timelines keep only high-priority modules.'], ['How to structure learning', 'Weekly modules plus a daily learn/practice/build/review rhythm.'], ['Whether you are on track', 'Progress tracking with weak-area detection and next steps.']].map(([a, b]) => <li key={a} className="flex gap-3 rounded-2xl bg-slate-50 p-4"><CheckCircle2 className="shrink-0 text-emerald-500" /><span><strong className="block text-slate-900">{a}</strong><span className="text-sm text-slate-600">{b}</span></span></li>)}</ul></div></Wrap>
}
export function BuiltForFuture() {
  const now = ['Structured learning-path engine', 'Local intent analysis (keyword scoring)', 'Personalized roadmap generation', 'Adaptive recommendation logic'], later = ['Real LLM-powered planning', 'Course/content APIs', 'Calendar integration', 'Automated reminders', 'Real-time learning analytics', 'Personalized quizzes', 'AI tutor conversations']
  return <Wrap id="future"><h2 className="text-3xl font-extrabold text-slate-900">Built for the Future</h2><p className="mt-2 max-w-2xl text-slate-600">Honest status: EDUAI runs on a local rules-based engine today, with no LLM or external API. The planner sits behind a provider interface so a real LLM can be added later.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h3 className="flex items-center gap-2 font-bold text-emerald-900"><CheckCircle2 size={18} />Current MVP: works today</h3><ul className="mt-3 space-y-1 text-sm text-emerald-900">{now.map((x) => <li key={x}>• {x}</li>)}</ul></div>
    <div className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="flex items-center gap-2 font-bold text-slate-900"><Clock size={18} />Future integrations: not built yet</h3><ul className="mt-3 space-y-1 text-sm text-slate-600">{later.map((x) => <li key={x}>• {x}</li>)}</ul></div></div></Wrap>
}
export function CTASection() {
  return <section className="px-4 pb-20 sm:px-6"><div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 px-6 py-16 text-center text-white"><h2 className="text-3xl font-extrabold sm:text-4xl">Ready to know exactly what to learn next?</h2><p className="mx-auto mt-3 max-w-lg text-brand-100">It takes under a minute. No sign-up needed.</p>
    <button onClick={() => scrollToId('planner')} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">Start Learning Smarter <ArrowRight size={18} /></button></div></section>
}
export function Footer() {
  return <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500"><p className="font-bold text-slate-800">EDUAI</p><p className="mt-1">MVP demo · plans are generated locally in your browser, not by an external AI service.</p></footer>
}
