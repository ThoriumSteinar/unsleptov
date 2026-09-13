import { useEffect, useState, type FormEvent } from 'react'
import { Header } from './components/Header'
import { FxLayer } from './components/FxLayer'
import { StatusBar } from './components/StatusBar'
import { I18nProvider, useI18n } from './i18n'

const DISCORD = 'unsleptov'

function Site() {
  const { t } = useI18n()
  const [bootLine, setBootLine] = useState(0)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [alias, setAlias] = useState('')
  const [channel, setChannel] = useState('')
  const [payload, setPayload] = useState('')

  useEffect(() => {
    if (bootLine >= t.hero.boot.length) return
    const id = window.setTimeout(() => setBootLine((n) => n + 1), 380)
    return () => window.clearTimeout(id)
  }, [bootLine, t.hero.boot.length])

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(DISCORD)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const brief = [
      `alias: ${alias || '—'}`,
      `channel: ${channel || '—'}`,
      `payload: ${payload || '—'}`,
      `discord: ${DISCORD}`,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(brief)
    } catch {
      /* local-only: clipboard may be blocked */
    }
    setSent(true)
  }

  return (
    <>
      <FxLayer />
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero-sun" />
          <div className="hero-floor" />
          <div className="hero-copy">
            <pre className="boot">
              {t.hero.boot.slice(0, bootLine).map((line, i) => (
                <span key={line}>
                  {i > 0 ? '\n' : ''}
                  <span className="boot-ts">[{String(i).padStart(2, '0')}]</span> {line}
                </span>
              ))}
              <span className="caret">█</span>
            </pre>
            <p className="kicker">{t.hero.kicker}</p>
            <h1 className="glitch" data-text="unsleptov">
              unsleptov
            </h1>
            <p className="tag">{t.hero.tag}</p>
            <p className="sub">{t.hero.sub}</p>
            <div className="cta">
              <a className="btn btn-acid" href="#work">
                {t.hero.ctaWork}
              </a>
              <a className="btn btn-ghost" href="#ping">
                {t.hero.ctaPing}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="block">
          <header className="block-head">
            <span>{t.about.index}</span>
            <h2>{t.about.title}</h2>
          </header>
          <p className="lead">{t.about.lead}</p>
          <p className="body">{t.about.body}</p>
          <ul className="stats">
            {t.about.stats.map((s) => (
              <li key={s.l}>
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="services" className="block">
          <header className="block-head">
            <span>{t.services.index}</span>
            <h2>{t.services.title}</h2>
          </header>
          <p className="lead">{t.services.lead}</p>
          <div className="modules">
            {t.services.items.map((item) => (
              <article key={item.code} className="module">
                <p className="module-code">{item.code}</p>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="block">
          <header className="block-head">
            <span>{t.work.index}</span>
            <h2>{t.work.title}</h2>
          </header>
          <p className="lead">{t.work.lead}</p>
          <div className="releases">
            {t.work.items.map((item) => (
              <article key={item.id} className={item.live ? 'release is-live' : 'release'}>
                {item.live ? (
                  <div className="release-preview">
                    <iframe
                      src={item.live}
                      title={item.name}
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <a
                      className="release-preview-hit"
                      href={item.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="sr-only">{t.work.openLive}</span>
                    </a>
                  </div>
                ) : null}
                <div className="release-body">
                  <div className="release-meta">
                    <span>#{item.id}</span>
                    <span>{item.tag}</span>
                    <span className={item.live ? 'live' : 'pending'}>
                      {item.live ? t.work.live : t.work.pending}
                    </span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                  <p className="stack">{item.stack}</p>
                  {item.live || item.repo ? (
                    <div className="release-links">
                      {item.live ? (
                        <a className="btn btn-acid" href={item.live} target="_blank" rel="noreferrer">
                          {t.work.openLive}
                        </a>
                      ) : null}
                      {item.repo ? (
                        <a className="btn btn-ghost" href={item.repo} target="_blank" rel="noreferrer">
                          {t.work.openCode}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="ping" className="block ping">
          <header className="block-head">
            <span>{t.contact.index}</span>
            <h2>{t.contact.title}</h2>
          </header>
          <p className="lead">{t.contact.lead}</p>
          <div className="ping-grid">
            <div className="discord-card">
              <p className="module-code">{t.contact.discord}</p>
              <p className="nick">{DISCORD}</p>
              <button type="button" className="btn btn-acid" onClick={copyDiscord}>
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>
            <form className="term" onSubmit={onSubmit}>
              <label>
                {t.contact.alias}
                <input value={alias} onChange={(e) => setAlias(e.target.value)} name="alias" autoComplete="name" />
              </label>
              <label>
                {t.contact.channel}
                <input
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  name="channel"
                  autoComplete="email"
                />
              </label>
              <label>
                {t.contact.payload}
                <textarea value={payload} onChange={(e) => setPayload(e.target.value)} name="payload" rows={4} />
              </label>
              <button className="btn btn-acid" type="submit">
                {t.contact.send}
              </button>
              {sent ? <p className="sent">{t.contact.sent}</p> : null}
            </form>
          </div>
        </section>
      </main>
      <footer className="foot">{t.footer}</footer>
      <StatusBar />
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  )
}
