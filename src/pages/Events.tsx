import { events, images, site } from '../data'

export function Events() {
  return (
    <article className="page">
      <header className="page-head">
        <p className="eyebrow">Events</p>
        <h1>Upcoming evenings</h1>
        <p className="lede">
          Candlelight, live strings, long garden lunches. Book a table if you want one — we fill the
          room when the lights go down.
        </p>
      </header>

      <img className="page-banner" src={images.events} alt="A late table with wine and candlelight" />

      <ol className="event-list">
        {events.map((event) => (
          <li key={event.title}>
            <p className="event-date">
              <strong>{event.date}</strong>
              <span>{event.year}</span>
            </p>
            <div>
              <h2>{event.title}</h2>
              <p className="event-when">{event.when}</p>
              <p>{event.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="collab">
        <h2>Want to collaborate with us?</h2>
        <p>
          One-off nights or a longer residency — write to{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we’ll find a date.
        </p>
      </section>
    </article>
  )
}
