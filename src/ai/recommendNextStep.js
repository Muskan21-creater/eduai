// Adaptive engine. Statuses: 'completed' | 'progress' | 'practice' | undefined
export function recommendNextStep(plan, progress) {
  const mods = plan.modules
  const done = mods.filter((m) => progress[m.id] === 'completed').length
  const weak = mods.filter((m) => progress[m.id] === 'practice')
  const current = mods.find((m) => progress[m.id] === 'progress')
  const upcoming = mods.find((m) => !progress[m.id])
  let next = null, message = '', tone = 'info'
  if (done === mods.length) { message = 'Plan complete! Showcase your project and choose your next learning path.'; tone = 'success' }
  else if (weak.length) {
    next = weak[0]; tone = 'warn'
    const after = mods.find((m) => m.week > weak[0].week && progress[m.id] !== 'completed')
    message = `Before moving to ${after ? after.title : 'the next module'}, spend additional time practicing ${weak[0].title}.`
  } else if (current) { next = current; message = `Keep going: finish ${current.title} this week.` }
  else if (upcoming) { next = upcoming; message = done ? `Great progress. Start ${upcoming.title} next.` : `Start with ${upcoming.title}: ${plan.minutes} minutes today.` }
  const practice = weak.map((m) => `Redo 3 exercises from "${m.title}" before starting new material.`)
  if (weak.length > 1) practice.push('Several weak areas: consider extending your plan by 1–2 weeks.')
  return { percent: Math.round((done / mods.length) * 100), done, total: mods.length, next, message, tone, weak, practice }
}
