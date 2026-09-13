import { BookingCard } from '../components/BookingCard'
import { Gallery } from '../components/Gallery'
import { images, site } from '../data'

export function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-photo" src={images.hero} alt="The unsleptov dining room" />
        <div className="hero-copy">
          {site.notices.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <BookingCard />
      </section>
      <Gallery />
    </>
  )
}
