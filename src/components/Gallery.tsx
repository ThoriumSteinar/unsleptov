import { useRef } from 'react'
import { images } from '../data'

export function Gallery() {
  const scroller = useRef<HTMLDivElement>(null)

  function move(dir: -1 | 1) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.55), behavior: 'smooth' })
  }

  return (
    <section className="gallery" aria-label="Plates from the kitchen">
      <button type="button" className="gallery-arrow is-prev" onClick={() => move(-1)} aria-label="Previous">
        ‹
      </button>
      <div className="gallery-track" ref={scroller}>
        {images.gallery.map((shot) => (
          <figure key={shot.src}>
            <img src={shot.src} alt={shot.alt} />
          </figure>
        ))}
      </div>
      <button type="button" className="gallery-arrow is-next" onClick={() => move(1)} aria-label="Next">
        ›
      </button>
    </section>
  )
}
