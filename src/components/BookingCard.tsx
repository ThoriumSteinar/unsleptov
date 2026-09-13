import { useMemo, useState, type FormEvent } from 'react'
import { site } from '../data'
import {
  addMinutes,
  defaultSlot,
  isClosed,
  nextOpenDay,
  sameDay,
  slotsFor,
  startOfDay,
} from '../lib/hours'
import { IconArrow, IconCal, IconClock, IconGuest } from './Icons'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function monthMatrix(year: number, month: number): (Date | null)[][] {
  const first = new Date(year, month, 1)
  const startPad = (first.getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = Array.from({ length: startPad }, () => null)
  for (let d = 1; d <= days; d += 1) cells.push(new Date(year, month, d))
  while (cells.length % 7) cells.push(null)
  const rows: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return rows
}

function fmtLong(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BookingCard() {
  const today = startOfDay(new Date())
  const [step, setStep] = useState<'book' | 'details' | 'done'>('book')
  const [date, setDate] = useState(() => nextOpenDay())
  const [cursor, setCursor] = useState(() => {
    const d = nextOpenDay()
    return { y: d.getFullYear(), m: d.getMonth() }
  })
  const [party, setParty] = useState(2)
  const [time, setTime] = useState(() => defaultSlot(nextOpenDay()))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')

  const slots = useMemo(() => slotsFor(date), [date])
  const closed = isClosed(date)
  const returnBy = slots.length ? addMinutes(time, 105) : '—'
  const grid = useMemo(() => monthMatrix(cursor.y, cursor.m), [cursor])
  const monthLabel = new Date(cursor.y, cursor.m, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  function pickDate(d: Date) {
    if (d < today || isClosed(d)) return
    setDate(d)
    setTime(defaultSlot(d))
  }

  function onNext() {
    if (closed || !slots.includes(time)) return
    setStep('details')
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStep('done')
  }

  if (step === 'done') {
    return (
      <div className="book">
        <p className="book-kicker">Reservation held</p>
        <h2 className="book-done-title">See you at the table</h2>
        <p className="book-done-copy">
          {name || 'Guest'}, {party} {party === 1 ? 'guest' : 'guests'} on {fmtLong(date)} at {time}.
          We’ll confirm at {email || site.email}. If you need a different slot, call {site.phone}.
        </p>
        <button
          type="button"
          className="book-next"
          onClick={() => {
            setStep('book')
            setName('')
            setEmail('')
            setPhone('')
            setNote('')
          }}
        >
          Book another
        </button>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <form className="book" onSubmit={onSubmit}>
        <button type="button" className="book-back" onClick={() => setStep('book')}>
          ← Back
        </button>
        <p className="book-summary">
          <span>
            <IconCal /> {fmtLong(date)}
          </span>
          <span>
            <IconGuest /> {party}
          </span>
          <span>
            <IconClock /> {time}
          </span>
        </p>
        <label className="book-field">
          <span>Full name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} name="name" />
        </label>
        <label className="book-field">
          <span>Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </label>
        <label className="book-field">
          <span>Phone</span>
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} name="tel" />
        </label>
        <label className="book-field">
          <span>Notes</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} name="note" />
        </label>
        <button className="book-next" type="submit">
          Confirm <IconArrow />
        </button>
      </form>
    )
  }

  return (
    <div className="book">
      <p className="book-summary">
        <span>
          <IconCal /> {fmtLong(date)}
        </span>
        <span>
          <IconGuest /> {party}
        </span>
        <span>
          <IconClock /> {time}
        </span>
      </p>

      <label className="book-field">
        <span>Party size</span>
        <span className="book-select">
          <select value={party} onChange={(e) => setParty(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <IconGuest />
        </span>
      </label>
      {party >= 9 ? (
        <p className="book-hint">
          Parties of 9+ — call {site.phone} or enquire for{' '}
          <a href="#/private-hire">private hire</a>.
        </p>
      ) : null}

      <div className="cal">
        <div className="cal-head">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setCursor((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 }))
            }
          >
            ‹
          </button>
          <p>{monthLabel}</p>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setCursor((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 }))
            }
          >
            ›
          </button>
        </div>
        <div className="cal-week">
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="cal-grid">
          {grid.flat().map((cell, i) => {
            if (!cell) return <span key={`e-${i}`} />
            const past = cell < today
            const shut = isClosed(cell)
            const selected = sameDay(cell, date)
            return (
              <button
                key={cell.toISOString()}
                type="button"
                disabled={past || shut}
                className={selected ? 'is-selected' : shut ? 'is-shut' : ''}
                onClick={() => pickDate(cell)}
              >
                {cell.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      <label className="book-field">
        <span>Time</span>
        <span className="book-select">
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!slots.length}
          >
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <IconClock />
        </span>
      </label>

      {closed ? (
        <p className="book-hint">We’re closed on Tuesdays — pick another evening.</p>
      ) : (
        <p className="book-return">
          Your table is required to be returned by {returnBy}
        </p>
      )}

      <button className="book-next" type="button" onClick={onNext} disabled={closed || !slots.length}>
        Next <IconArrow />
      </button>
    </div>
  )
}
