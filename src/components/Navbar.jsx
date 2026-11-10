import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { scrollToId } from '../lib/utils'
const links = [['How It Works', 'how'], ['Learning Paths', 'paths'], ['Features', 'features'], ['AI Planner', 'planner']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const go = (id) => { setOpen(false); scrollToId(id) }
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-brand-900">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-600 text-white"><Sparkles size={16} aria-hidden /></span>EDUAI
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map(([l, id]) => <li key={id}><button onClick={() => go(id)} className="text-sm font-medium text-slate-600 hover:text-brand-600">{l}</button></li>)}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <button className="text-sm font-medium text-slate-600 hover:text-brand-600">Sign In</button>
          <button onClick={() => go('planner')} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">Build My Learning Plan</button>
        </div>
        <button className="rounded-lg p-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="fade-up border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          {links.map(([l, id]) => <button key={id} onClick={() => go(id)} className="block w-full py-3 text-left font-medium text-slate-700">{l}</button>)}
          <button className="block w-full py-3 text-left font-medium text-slate-700">Sign In</button>
          <button onClick={() => go('planner')} className="mt-2 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white">Build My Learning Plan</button>
        </div>
      )}
    </header>
  )
}
