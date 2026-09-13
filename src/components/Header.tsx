import { useState } from 'react'
import { useI18n, type Lang } from '../i18n'

const links = [
  { href: '#about', key: 'about' as const },
  { href: '#services', key: 'services' as const },
  { href: '#work', key: 'work' as const },
  { href: '#ping', key: 'ping' as const },
]

export function Header() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <header className={open ? 'top is-open' : 'top'}>
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <span className="brand-mark">U</span>
        <span className="brand-name">unsleptov</span>
      </a>
      <nav className="nav">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {t.nav[link.key]}
          </a>
        ))}
      </nav>
      <div className="top-end">
        <div className="lang">
          {(['ru', 'en'] as Lang[]).map((code) => (
            <button
              key={code}
              type="button"
              className={lang === code ? 'is-on' : ''}
              onClick={() => setLang(code)}
            >
              {code}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
