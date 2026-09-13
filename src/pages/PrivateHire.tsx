import { useState, type FormEvent } from 'react'
import { images, site } from '../data'

export function PrivateHire() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <article className="page">
      <header className="page-head">
        <p className="eyebrow">Private hire</p>
        <h1>Celebrate in the dining room</h1>
        <p className="lede">
          Birthdays, engagements, family tables — we can host parties of up to 80 guests. The
          Mediterranean room stays ours for the night: grill, wine, and a team that actually looks
          after you.
        </p>
      </header>

      <div className="split">
        <img src={images.private} alt="A long table set for a private dinner" />
        <div>
          <h2>The Mediterranean dining room</h2>
          <p>
            Warm light, olive wood, and enough space to take over the floor. We build a menu around
            the table — sharing boards, steaks, or a set feast — and keep the bar open for the
            room.
          </p>
          <ul className="plain">
            <li>Up to 80 seated guests</li>
            <li>Private lounge for up to 24</li>
            <li>Set menus or à la carte</li>
            <li>Dedicated host on the night</li>
          </ul>
          <p>
            Write to <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phone}.
          </p>
        </div>
      </div>

      <form className="enquiry" onSubmit={onSubmit}>
        <h2>Enquire below</h2>
        <label>
          Name
          <input required name="name" />
        </label>
        <label>
          Email
          <input required type="email" name="email" />
        </label>
        <label>
          Date &amp; guests
          <input required name="when" placeholder="e.g. 12 October · 30 guests" />
        </label>
        <label>
          Tell us about the evening
          <textarea required name="message" rows={4} />
        </label>
        <button type="submit">Send enquiry</button>
        {sent ? <p className="ok">Received — we’ll write back within a day.</p> : null}
      </form>
    </article>
  )
}
