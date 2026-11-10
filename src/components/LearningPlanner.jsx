import { useEffect, useState } from 'react'
import { Loader2, ArrowLeft, ArrowRight, Sparkles, AlertCircle, Map } from 'lucide-react'
import { generateLearningPlan } from '../ai/generateLearningPlan'
import Roadmap from './Roadmap'
import { cn } from '../lib/utils'
const LEVELS = [['beginner', 'Beginner', 'New to this topic'], ['intermediate', 'Intermediate', 'Know the basics'], ['advanced', 'Advanced', 'Comfortable, want depth']]
const TIMES = [[30, '30 minutes/day'], [60, '1 hour/day'], [120, '2 hours/day'], ['custom', 'Custom']]
const DURS = [4, 8, 12]
const STAGES = ['Analyzing your learning goal...', 'Building your personalized roadmap...', 'Optimizing your weekly schedule...']
const Opt = ({ on, children, ...p }) => <button type="button" aria-pressed={on} {...p} className={cn('rounded-xl border px-4 py-3 text-left text-sm font-semibold transition', on ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-500')}>{children}</button>
export default function LearningPlanner({ prefill }) {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('beginner')
  const [time, setTime] = useState(60)
  const [custom, setCustom] = useState(45)
  const [weeks, setWeeks] = useState(8)
  const [stage, setStage] = useState(-1)
  const [plan, setPlan] = useState(null)
  const [progress, setProgress] = useState({})
  const [error, setError] = useState('')
  useEffect(() => { if (prefill) { setGoal(prefill.goal); setStep(0); setPlan(null); setError('') } }, [prefill])
  const minutes = time === 'custom' ? Number(custom) : time
  const next = () => {
    if (step === 0 && goal.trim().length < 5) return setError('Please describe your goal in a few words (e.g. "learn Python for data science").')
    if (step === 2 && (!minutes || minutes < 10 || minutes > 480)) return setError('Enter a daily time between 10 and 480 minutes.')
    setError(''); setStep(step + 1)
  }
  const generate = async () => {
    setError(''); setStage(0)
    try {
      for (let i = 0; i < STAGES.length; i++) { setStage(i); await new Promise((r) => setTimeout(r, 800)) }
      setPlan(await generateLearningPlan({ goal: goal.trim(), level, minutes, weeks })); setProgress({})
    } catch (e) { setError(e.message || 'Something went wrong. Please try again.') }
    setStage(-1)
  }
  const reset = () => { setPlan(null); setStep(0); setProgress({}) }
  const titles = ['What do you want to learn?', 'What is your current level?', 'How much time can you spend learning?', 'How long should your plan be?']
  return (
    <section id="planner" className="scroll-mt-16 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center"><h2 className="text-3xl font-extrabold text-slate-900">EDUAI Smart Learning Planner</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">Answer four quick questions. A local rules-based engine builds your roadmap in your browser. No account or API key needed.</p></div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
          {plan ? <Roadmap plan={plan} progress={progress} setProgress={setProgress} onReset={reset} />
          : stage >= 0 ? (
            <div className="py-16 text-center" role="status" aria-live="polite"><Loader2 className="mx-auto animate-spin text-brand-600" size={40} />
              <p className="mt-5 text-lg font-semibold text-slate-800">{STAGES[stage]}</p>
              <div className="mx-auto mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-brand-600 transition-all duration-700" style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }} /></div></div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); step === 3 ? generate() : next() }}>
              <div className="mb-6 flex gap-2" aria-hidden>{[0, 1, 2, 3].map((i) => <span key={i} className={cn('h-1.5 flex-1 rounded-full', i <= step ? 'bg-brand-600' : 'bg-slate-200')} />)}</div>
              <fieldset className="fade-up" key={step}>
                <legend className="text-xl font-bold text-slate-900"><span className="text-sm font-semibold text-brand-600">Step {step + 1} of 4 · </span>{titles[step]}</legend>
                <div className="mt-5">
                  {step === 0 && <div><label htmlFor="goal" className="sr-only">Learning goal</label>
                    <textarea id="goal" rows={3} value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. I want to learn Python for data science" className="w-full rounded-xl border border-slate-300 p-4 focus:border-brand-500" />
                    <div className="mt-3 flex flex-wrap gap-2">{['I want to become a machine learning engineer', 'I want to learn React and build projects', 'I have 2 hours per day and want to learn AI'].map((s) => <button key={s} type="button" onClick={() => setGoal(s)} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 hover:border-brand-500">{s}</button>)}</div></div>}
                  {step === 1 && <div className="grid gap-3 sm:grid-cols-3">{LEVELS.map(([v, l, d]) => <Opt key={v} on={level === v} onClick={() => setLevel(v)}>{l}<span className="block text-xs font-normal text-slate-500">{d}</span></Opt>)}</div>}
                  {step === 2 && <div><div className="grid gap-3 sm:grid-cols-4">{TIMES.map(([v, l]) => <Opt key={v} on={time === v} onClick={() => setTime(v)}>{l}</Opt>)}</div>
                    {time === 'custom' && <div className="mt-4"><label htmlFor="cm" className="text-sm font-medium">Minutes per day</label><input id="cm" type="number" min="10" max="480" value={custom} onChange={(e) => setCustom(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 p-3 sm:w-48" /></div>}</div>}
                  {step === 3 && <div className="grid gap-3 sm:grid-cols-3">{DURS.map((w) => <Opt key={w} on={weeks === w} onClick={() => setWeeks(w)}>{w} weeks</Opt>)}</div>}
                </div>
              </fieldset>
              {error && <p role="alert" className="mt-4 flex items-center gap-2 text-sm font-medium text-red-600"><AlertCircle size={16} />{error}</p>}
              <div className="mt-8 flex items-center justify-between">
                <button type="button" disabled={step === 0} onClick={() => { setError(''); setStep(step - 1) }} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 disabled:opacity-30"><ArrowLeft size={16} />Back</button>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">{step === 3 ? <><Sparkles size={16} />Generate My Roadmap</> : <>Continue<ArrowRight size={16} /></>}</button>
              </div>
              {step === 0 && !goal && <p className="mt-6 flex items-center gap-2 text-sm text-slate-500"><Map size={16} />Your roadmap will appear here once generated.</p>}
            </form>)}
        </div>
      </div>
    </section>
  )
}
