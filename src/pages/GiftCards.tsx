import { useState } from 'react'
import { giftAmounts, images, site } from '../data'

export function GiftCards() {
  const [amount, setAmount] = useState(50)
  const [bought, setBought] = useState(false)

  return (
    <article className="page">
      <header className="page-head">
        <p className="eyebrow">Gift cards</p>
        <h1>A table, given</h1>
        <p className="lede">
          Treat someone — or yourself — to dinner in the room. Digital from £25; physical cards
          wait at the bar.
        </p>
      </header>

      <div className="split gift">
        <div className="gift-card" style={{ backgroundImage: `url(${images.gift})` }}>
          <p>{site.short}</p>
          <strong>£{amount}</strong>
        </div>
        <div>
          <p className="gift-from">from £25.00</p>
          <div className="amounts">
            {giftAmounts.map((n) => (
              <button
                key={n}
                type="button"
                className={n === amount ? 'is-on' : ''}
                onClick={() => {
                  setAmount(n)
                  setBought(false)
                }}
              >
                £{n}
              </button>
            ))}
          </div>
          <button type="button" className="buy" onClick={() => setBought(true)}>
            Add a £{amount} card
          </button>
          {bought ? (
            <p className="ok">
              This is a portfolio demo — no payment is taken. For a real table, call {site.phone}.
            </p>
          ) : null}
          <p className="gift-note">Physical gift cards are available in store.</p>
        </div>
      </div>
    </article>
  )
}
