import { useEffect, useRef, useState } from 'react'
import { site } from '../data'
import { hrefFor, type Route } from '../lib/hash'
import { Social } from './Social'

const menuLinks: { label: string; route: Route }[] = [
  { label: 'À la carte', route: { name: 'menus', menu: 'alacarte' } },
  { label: 'Drinks', route: { name: 'menus', menu: 'drinks' } },
  { label: 'Lunch', route: { name: 'menus', menu: 'lunch' } },
]

export function Header({ route }: { route: Route }) {
  const [open, setOpen] = useState(false)
  const [menusOpen, setMenusOpen] = useState(false)
  const menusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(false)
    setMenusOpen(false)
  }, [route])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menusRef.current?.contains(e.target as Node)) setMenusOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const onMenus = route.name === 'menus'

  return (
    <header className={open ? 'site-header is-open' : 'site-header'}>
      <a className="brand" href={hrefFor({ name: 'home' })}>
        {site.name}
      </a>

      <nav className="nav" aria-label="Primary">
        <a className={route.name === 'home' ? 'is-on' : ''} href={hrefFor({ name: 'home' })}>
          Home
        </a>
        <div className={onMenus || menusOpen ? 'nav-drop is-on' : 'nav-drop'} ref={menusRef}>
          <button
            type="button"
            aria-expanded={menusOpen}
            aria-haspopup="true"
            onClick={() => setMenusOpen((v) => !v)}
          >
            Menus
          </button>
          <div className="nav-menu" hidden={!menusOpen}>
            {menuLinks.map((item) => (
              <a key={item.label} href={hrefFor(item.route)} onClick={() => setMenusOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <a
          className={route.name === 'private-hire' ? 'is-on' : ''}
          href={hrefFor({ name: 'private-hire' })}
        >
          Private Hire
        </a>
        <a className={route.name === 'events' ? 'is-on' : ''} href={hrefFor({ name: 'events' })}>
          Events
        </a>
        <a
          className={route.name === 'gift-cards' ? 'is-on' : ''}
          href={hrefFor({ name: 'gift-cards' })}
        >
          Giftcards
        </a>
        <Social className="social nav-social" />
      </nav>

      <button
        type="button"
        className="burger"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}
