import { site } from '../data'
import { hrefFor } from '../lib/hash'
import { Social } from './Social'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-col">
        <h2>Contact us</h2>
        {site.address.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
        </p>
      </div>

      <div className="footer-col footer-brand">
        <Social />
        <p className="footer-name">{site.short}</p>
        <p className="footer-credit">
          A portfolio piece
          <br />
          by unsleptov
        </p>
      </div>

      <div className="footer-col footer-hours">
        <h2>Opening hours</h2>
        {site.hours.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <a className="footer-reserve" href={hrefFor({ name: 'home' })}>
          Make a Reservation
        </a>
      </div>
    </footer>
  )
}
