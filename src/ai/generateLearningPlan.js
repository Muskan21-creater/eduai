import { PATHS, EXTRAS } from '../data/learningPaths'
import { analyzeLearningGoal } from './analyzeLearningGoal'
import { recommendNextStep } from './recommendNextStep'

const pickTop = (mods, n) => mods.map((m, i) => ({ m, i })).sort((a, b) => b.m.priority - a.m.priority || a.i - b.i).slice(0, n).sort((a, b) => a.i - b.i).map((x) => x.m)

export function generateSchedule(minutes) {
  return [['Mon', 'Learn: new concepts'], ['Tue', 'Learn: guided examples'], ['Wed', 'Practice: exercises'], ['Thu', 'Build: apply in a mini-task'], ['Fri', 'Review & self-quiz']]
    .map(([day, task]) => ({ day, task, minutes }))
}

const localProvider = async (input) => {
  const analysis = analyzeLearningGoal(input.goal)
  const path = PATHS.find((p) => p.id === analysis.category)
  let mods = [...path.modules]
  if (input.level === 'advanced') mods = mods.slice(1) // advanced learners skip the foundations module
  const chosen = mods.length > input.weeks ? pickTop(mods, input.weeks) : [...mods]
  for (let k = 0; chosen.length < input.weeks; k++) { const x = EXTRAS[k % EXTRAS.length]; chosen.push({ ...x, id: `${x.id}-${k}` }) }
  const weeklyHours = Math.round(((input.minutes * 5) / 60) * 10) / 10
  const done = new Date(); done.setDate(done.getDate() + input.weeks * 7)
  return {
    provider: 'local', goal: input.goal, level: input.level, weeks: input.weeks, minutes: input.minutes, weeklyHours,
    analysis, path: { id: path.id, name: path.name },
    estimatedCompletion: done.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    schedule: generateSchedule(input.minutes),
    modules: chosen.map((m, i) => ({ ...m, week: i + 1 })),
    insights: [
      analysis.matched ? `Detected category: ${path.name} (${Math.round(analysis.confidence * 100)}% match).` : 'Your goal was broad, so we started with Python foundations. Add detail for a sharper plan.',
      `Goal intent: ${analysis.intent.replace('-', ' ')}.`,
      input.minutes < 45 ? 'Short daily sessions: focus on one concept per day.' : 'Longer sessions: split time between learning and building.',
      input.weeks < path.modules.length ? 'Short timeline: we kept only the highest-priority modules.' : 'Timeline fits the full path.'
    ]
  }
}
// Provider registry: add OpenAI / Claude / Gemini as async (input) => plan functions,
// called through a server route so API keys never reach the browser.
const providers = { local: localProvider }
export async function generateLearningPlan(input, provider = 'local') {
  const fn = providers[provider]
  if (!fn) throw new Error(`Provider "${provider}" is not integrated yet.`)
  const plan = await fn(input)
  return { ...plan, firstStep: recommendNextStep(plan, {}) }
}
