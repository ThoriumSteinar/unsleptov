export type Route =
  | { name: 'home' }
  | { name: 'menus'; menu: 'alacarte' | 'drinks' | 'lunch' }
  | { name: 'private-hire' }
  | { name: 'events' }
  | { name: 'gift-cards' }

export function parseHash(hash = window.location.hash): Route {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '')
  if (path === 'menus/drinks') return { name: 'menus', menu: 'drinks' }
  if (path === 'menus/lunch') return { name: 'menus', menu: 'lunch' }
  if (path === 'menus' || path === 'menus/alacarte') return { name: 'menus', menu: 'alacarte' }
  if (path === 'private-hire') return { name: 'private-hire' }
  if (path === 'events') return { name: 'events' }
  if (path === 'gift-cards') return { name: 'gift-cards' }
  return { name: 'home' }
}

export function hrefFor(route: Route): string {
  if (route.name === 'home') return '#/'
  if (route.name === 'menus') {
    return route.menu === 'alacarte' ? '#/menus' : `#/menus/${route.menu}`
  }
  return `#/${route.name}`
}
