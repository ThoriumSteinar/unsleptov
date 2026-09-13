import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { parseHash, type Route } from './lib/hash'
import { Events } from './pages/Events'
import { GiftCards } from './pages/GiftCards'
import { Home } from './pages/Home'
import { Menus } from './pages/Menus'
import { PrivateHire } from './pages/PrivateHire'

function titleFor(route: Route) {
  if (route.name === 'home') return 'UNSLEPTOV RESTAURANT & BAR'
  if (route.name === 'menus') {
    const labels = { alacarte: 'Menus', drinks: 'Drinks', lunch: 'Lunch' }
    return `${labels[route.menu]} — unsleptov`
  }
  if (route.name === 'private-hire') return 'Private Hire — unsleptov'
  if (route.name === 'events') return 'Events — unsleptov'
  return 'Gift Cards — unsleptov'
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash())

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = '/'
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = titleFor(route)
    window.scrollTo(0, 0)
  }, [route])

  return (
    <div className={route.name === 'home' ? 'shell is-home' : 'shell'}>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Header route={route} />
      <main id="content">
        {route.name === 'home' ? <Home /> : null}
        {route.name === 'menus' ? <Menus menu={route.menu} /> : null}
        {route.name === 'private-hire' ? <PrivateHire /> : null}
        {route.name === 'events' ? <Events /> : null}
        {route.name === 'gift-cards' ? <GiftCards /> : null}
      </main>
      <Footer />
    </div>
  )
}
