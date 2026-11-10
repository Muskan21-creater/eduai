export const cn = (...c) => c.filter(Boolean).join(' ')
export const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
