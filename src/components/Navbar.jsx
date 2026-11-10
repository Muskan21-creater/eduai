import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { scrollToId } from "../lib/utils";

const links = [
  ["How It Works", "how"],
  ["Learning Paths", "paths"],
  ["Features", "features"],
  ["AI Planner", "planner"],
];

export default function Navbar({ onSignIn }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        {/* Logo */}
        <button
          onClick={() => go("top")}
          className="flex items-center gap-2"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
            <Sparkles size={19} />
          </span>

          <span className="text-lg font-extrabold text-slate-900">
            EDUAI
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="font-medium text-slate-600 transition hover:text-indigo-600"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={onSignIn}
            className="font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Sign In
          </button>

          <button
            onClick={() => go("planner")}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Build My Learning Plan
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(([label, id]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="py-2 text-left font-medium text-slate-700"
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                onSignIn();
              }}
              className="py-2 text-left font-medium text-slate-700"
            >
              Sign In
            </button>

            <button
              onClick={() => go("planner")}
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white"
            >
              Build My Learning Plan
            </button>
          </div>
        </div>
      )}
    </header>
  );
}