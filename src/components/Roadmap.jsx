import { CheckCircle2, Circle, PlayCircle, RefreshCw, Target, AlertTriangle, Lightbulb, Clock, CalendarCheck } from 'lucide-react'
import { recommendNextStep } from '../ai/recommendNextStep'
import { cn } from '../lib/utils'
const ACTIONS = [['completed', 'Completed', CheckCircle2], ['progress', 'In Progress', PlayCircle], ['practice', 'Need More Practice', RefreshCw]]
const tones = { info: 'border-brand-200 bg-brand-50 text-brand-900', warn: 'border-amber-300 bg-amber-50 text-amber-900', success: 'border-emerald-300 bg-emerald-50 text-emerald-900' }
export default function Roadmap({ plan, progress, setProgress, onReset }) {
  const rec = recommendNextStep(plan, progress)
  const set = (id, s) => setProgress((p) => { const n = { ...p }; if (n[id] === s) delete n[id]; else n[id] = s; return n })
  return (
    <div className="fade-up">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Your {plan.weeks}-week roadmap</p><h3 className="mt-1 text-2xl font-extrabold text-slate-900">{plan.goal}</h3></div>
        <button onClick={onReset} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-500">Start over</button>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['Category', plan.path.name, Target], ['Weekly time', `${plan.weeklyHours} hrs/week`, Clock], ['Duration', `${plan.weeks} weeks`, CalendarCheck], ['Est. completion', plan.estimatedCompletion, CalendarCheck]].map(([k, v, I]) => (
          <div key={k} className="rounded-2xl border border-slate-200 bg-white p-4"><dt className="flex items-center gap-1 text-xs text-slate-500"><I size={13} />{k}</dt><dd className="mt-1 font-bold text-slate-900">{v}</dd></div>))}
      </dl>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex justify-between text-sm font-semibold"><span>Progress</span><span>{rec.percent}% · {rec.done}/{rec.total} modules</span></div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={rec.percent} aria-valuemin={0} aria-valuemax={100} aria-label="Learning progress"><div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${rec.percent}%` }} /></div>
      </div>
      <div className={cn('mt-4 rounded-2xl border p-5', tones[rec.tone])} aria-live="polite">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">{rec.tone === 'warn' ? <AlertTriangle size={14} /> : <Lightbulb size={14} />}Recommended next action</p>
        <p className="mt-1 font-semibold">{rec.message}</p>
        {rec.practice.length > 0 && <ul className="mt-2 list-inside list-disc text-sm">{rec.practice.map((x) => <li key={x}>{x}</li>)}</ul>}
        {rec.weak.length > 0 && <p className="mt-2 text-sm"><strong>Weak areas:</strong> {rec.weak.map((w) => w.title).join(', ')}</p>}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ol className="space-y-3 lg:col-span-2">
          {plan.modules.map((m) => { const s = progress[m.id]; const isNext = rec.next?.id === m.id; return (
            <li key={m.id} className={cn('rounded-2xl border bg-white p-4', isNext ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200')}>
              <div className="flex items-start gap-3">
                {s === 'completed' ? <CheckCircle2 className="mt-0.5 text-emerald-500" /> : <Circle className="mt-0.5 text-slate-300" />}
                <div className="flex-1"><p className="text-xs text-slate-500">Week {m.week}{isNext && <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-white">Next</span>}</p>
                  <p className="font-bold text-slate-900">{m.title}</p><p className="text-sm text-slate-600">{m.desc}</p></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Status for ${m.title}`}>
                {ACTIONS.map(([k, l, I]) => <button key={k} aria-pressed={s === k} onClick={() => set(m.id, k)} className={cn('inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition', s === k ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 text-slate-600 hover:border-brand-500')}><I size={13} />{l}</button>)}
              </div>
            </li>) })}
        </ol>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold">Weekly schedule</h4>
            <ul className="mt-3 space-y-2 text-sm">{plan.schedule.map((d) => <li key={d.day} className="flex justify-between gap-2"><span><strong>{d.day}</strong> · {d.task}</span><span className="text-slate-500">{d.minutes}m</span></li>)}</ul></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-bold">How we built this plan</h4>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">{plan.insights.map((i) => <li key={i}>{i}</li>)}</ul></div>
        </aside>
      </div>
    </div>
  )
}
