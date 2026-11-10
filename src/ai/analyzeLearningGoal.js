import { PATHS } from '../data/learningPaths'
// Local intent analysis: keyword scoring + phrase weighting. Not an LLM.
export function analyzeLearningGoal(goal = '') {
  const text = goal.toLowerCase()
  const words = new Set(text.split(/[^a-z0-9+#-]+/))
  const hit = (k) => (k.includes(' ') ? text.includes(k) : words.has(k))
  const scores = PATHS.map((p) => ({ id: p.id, score: p.keywords.reduce((s, k) => (hit(k) ? s + (k.includes(' ') ? 2 : 1) : s), 0) }))
    .sort((a, b) => b.score - a.score)
  const top = scores[0], total = scores.reduce((s, x) => s + x.score, 0)
  const matched = top.score > 0
  const intent = /career|job|engineer|become|hired|interview/.test(text) ? 'career-change'
    : /project|build|portfolio/.test(text) ? 'project-based' : /exam|test|prepare/.test(text) ? 'exam-prep' : 'skill-building'
  return { category: matched ? top.id : 'python', matched, confidence: matched ? Math.min(0.95, 0.5 + top.score / (total + 2)) : 0.3, intent }
}
