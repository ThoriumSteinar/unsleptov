export type DayHours = { open: string; close: string } | null

const WEEK: DayHours[] = [
  { open: '13:30', close: '22:00' },
  { open: '17:00', close: '22:00' },
  null,
  { open: '17:00', close: '22:00' },
  { open: '12:00', close: '22:00' },
  { open: '12:00', close: '22:00' },
  { open: '12:00', close: '22:00' },
]

export function hoursFor(date: Date): DayHours {
  return WEEK[date.getDay()]
}

export function isClosed(date: Date): boolean {
  return hoursFor(date) === null
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function fromMinutes(total: number): string {
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function slotsFor(date: Date): string[] {
  const hours = hoursFor(date)
  if (!hours) return []
  const start = toMinutes(hours.open)
  const last = toMinutes(hours.close) - 90
  const out: string[] = []
  for (let t = start; t <= last; t += 15) out.push(fromMinutes(t))
  return out
}

export function addMinutes(hhmm: string, extra: number): string {
  return fromMinutes(toMinutes(hhmm) + extra)
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function nextOpenDay(from = new Date()): Date {
  const d = startOfDay(from)
  for (let i = 0; i < 14; i += 1) {
    const slots = slotsFor(d)
    if (slots.length) {
      if (sameDay(d, from)) {
        const now = from.getHours() * 60 + from.getMinutes()
        if (slots.some((s) => toMinutes(s) > now + 30)) return d
      } else {
        return d
      }
    }
    d.setDate(d.getDate() + 1)
  }
  return startOfDay(from)
}

export function defaultSlot(date: Date): string {
  const slots = slotsFor(date)
  if (!slots.length) return '18:00'
  const prefer = slots.find((s) => s === '18:00') ?? slots.find((s) => toMinutes(s) >= 17 * 60)
  if (sameDay(date, new Date())) {
    const now = new Date().getHours() * 60 + new Date().getMinutes() + 30
    return slots.find((s) => toMinutes(s) >= now) ?? slots[slots.length - 1]
  }
  return prefer ?? slots[0]
}
