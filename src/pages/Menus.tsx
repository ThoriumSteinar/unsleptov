import { menus, type MenuKey } from '../data'
import { hrefFor } from '../lib/hash'

const tabs: { key: MenuKey; label: string }[] = [
  { key: 'alacarte', label: 'À la carte' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'lunch', label: 'Lunch' },
]

export function Menus({ menu }: { menu: MenuKey }) {
  const data = menus[menu]

  return (
    <article className="page page-menu">
      <header className="page-head">
        <p className="eyebrow">Menus</p>
        <h1>{data.title}</h1>
        <p className="lede">{data.intro}</p>
        <nav className="menu-tabs" aria-label="Menu sections">
          {tabs.map((tab) => (
            <a
              key={tab.key}
              className={tab.key === menu ? 'is-on' : ''}
              href={hrefFor({ name: 'menus', menu: tab.key })}
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </header>

      {data.sections.map((section) => (
        <section key={section.title} className="menu-block">
          <h2>{section.title}</h2>
          {section.note ? <p className="menu-note">{section.note}</p> : null}
          <ul>
            {section.items.map((item) => (
              <li key={item.name}>
                <div>
                  <h3>
                    {item.name}
                    {item.tags ? <small>{item.tags}</small> : null}
                  </h3>
                  {item.desc ? <p>{item.desc}</p> : null}
                </div>
                <span className="price">{item.price}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}
