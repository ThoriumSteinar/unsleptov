import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'ru' | 'en'

type Copy = {
  nav: { about: string; services: string; work: string; ping: string }
  hero: {
    boot: string[]
    kicker: string
    tag: string
    sub: string
    ctaWork: string
    ctaPing: string
  }
  about: { index: string; title: string; lead: string; body: string; stats: { n: string; l: string }[] }
  services: {
    index: string
    title: string
    lead: string
    items: { code: string; name: string; text: string }[]
  }
  work: {
    index: string
    title: string
    lead: string
    pending: string
    live: string
    openLive: string
    openCode: string
    items: {
      id: string
      tag: string
      name: string
      text: string
      stack: string
      live?: string
      repo?: string
    }[]
  }
  contact: {
    index: string
    title: string
    lead: string
    discord: string
    copy: string
    copied: string
    alias: string
    channel: string
    payload: string
    send: string
    sending: string
    sent: string
    error: string
  }
  footer: string
}

const dict: Record<Lang, Copy> = {
  ru: {
    nav: { about: 'обо мне', services: 'услуги', work: 'работы', ping: 'связь' },
    hero: {
      boot: [
        'boot → unsleep.os',
        'audio.engine .......... OK',
        'net.link .............. ONLINE',
        'identity .............. unsleptov',
      ],
      kicker: 'FULLSTACK · CYBER / TECHNO',
      tag: 'сайты, которые не спят',
      sub: 'Собираю лендинги и веб-приложения под ключ. Ночная смена, чистый сигнал, продакшен без шума.',
      ctaWork: 'смотреть работы',
      ctaPing: 'послать сигнал',
    },
    about: {
      index: '01',
      title: 'протокол',
      lead: 'unsleptov — это я.',
      body: 'Fullstack-разработчик. Делаю сайты и веб-приложения, когда город уже спит: от первого кадра и анимации до бэкенда и выкладки. Эстетика — кибер, техно, сетка, неон. Если нужен не шаблон, а система с характером — это ко мне.',
      stats: [
        { n: '24/7', l: 'онлайн-режим' },
        { n: 'RU/EN', l: 'два канала' },
        { n: '0→1', l: 'от идеи до релиза' },
      ],
    },
    services: {
      index: '02',
      title: 'модули',
      lead: 'что можно заказать',
      items: [
        {
          code: 'A1',
          name: 'сайт под ключ',
          text: 'Лендинг или многостраничник: структура, тексты-скелет, анимации, адаптив, форма заявок.',
        },
        {
          code: 'B3',
          name: 'веб-приложение',
          text: 'Кабинеты, каталоги, админки, боты и автоматизация. React / Node — собираю целиком.',
        },
        {
          code: 'C7',
          name: 'релиз и поддержка',
          text: 'Выкладка, домены, правки после запуска. Держу проект живым, не бросаю после демо.',
        },
      ],
    },
    work: {
      index: '03',
      title: 'релизы',
      lead: 'два живых кейса: AU-редизайн и ресторанный сайт. один слот ещё пустой.',
      pending: 'ожидает сигнал',
      live: 'online',
      openLive: 'открыть демо',
      openCode: 'код',
      items: [
        {
          id: '01',
          tag: 'REDESIGN',
          name: 'SYDNEY.WIDE',
          text: 'Полный редизайн Sydney Wide Roofing Co: сланец и медь, editorial-сетка, форма заявки на первом плане, услуги и район. Портфолио-демо, не прод.',
          stack: 'TypeScript · React · GH Pages',
          live: 'https://thoriumsteinar.github.io/upgrade-sydney-wide-roofing-demo/',
          repo: 'https://github.com/ThoriumSteinar/upgrade-sydney-wide-roofing-demo',
        },
        {
          id: '02',
          tag: 'HOSPITALITY',
          name: 'UNSLEPTOV.BAR',
          text: 'Ресторан и бар в тонах Manchester grill: бронь стола, меню, private hire, ивенты, gift cards. Отдельное демо, не прод.',
          stack: 'TypeScript · React · GH Pages',
          live: 'https://thoriumsteinar.github.io/unsleptov-restaurant/',
          repo: 'https://github.com/ThoriumSteinar/unsleptov-restaurant',
        },
        {
          id: '03',
          tag: 'SLOT',
          name: 'NEXT.SIGNAL',
          text: 'Ещё один слот под демо.',
          stack: 'awaiting payload',
        },
      ],
    },
    contact: {
      index: '04',
      title: 'канал',
      lead: 'быстрее всего — Discord или Telegram. Форма доходит до почты: заполни бриф, и я отвечу.',
      discord: 'discord/telegram',
      copy: 'копировать ник',
      copied: 'скопировано',
      alias: 'алиас',
      channel: 'телеграм / почта',
      payload: 'что нужно собрать',
      send: 'transmit',
      sending: 'отправка…',
      sent: 'сигнал отправлен на unsleptov@gmail.com',
      error: 'ошибка отправки. попробуй ещё раз.',
    },
    footer: 'unsleep protocol · local runtime',
  },
  en: {
    nav: { about: 'about', services: 'services', work: 'work', ping: 'ping' },
    hero: {
      boot: [
        'boot → unsleep.os',
        'audio.engine .......... OK',
        'net.link .............. ONLINE',
        'identity .............. unsleptov',
      ],
      kicker: 'FULLSTACK · CYBER / TECHNO',
      tag: 'sites that never sleep',
      sub: 'I ship landing pages and web apps end to end. Night shift, clean signal, production without the noise.',
      ctaWork: 'view work',
      ctaPing: 'send signal',
    },
    about: {
      index: '01',
      title: 'protocol',
      lead: 'unsleptov — that’s me.',
      body: 'Fullstack developer. I build websites and web apps while the city sleeps: first frame and motion to backend and deploy. Aesthetic: cyber, techno, grid, neon. If you need a system with character, not a template — ping me.',
      stats: [
        { n: '24/7', l: 'online mode' },
        { n: 'RU/EN', l: 'two channels' },
        { n: '0→1', l: 'idea to release' },
      ],
    },
    services: {
      index: '02',
      title: 'modules',
      lead: 'what you can book',
      items: [
        {
          code: 'A1',
          name: 'site, turnkey',
          text: 'Landing or multi-page: structure, skeleton copy, motion, responsive, lead form.',
        },
        {
          code: 'B3',
          name: 'web application',
          text: 'Dashboards, catalogs, admin, bots, automation. React / Node — I build the stack.',
        },
        {
          code: 'C7',
          name: 'release & keep-alive',
          text: 'Deploy, domains, post-launch fixes. I don’t ghost the project after the demo.',
        },
      ],
    },
    work: {
      index: '03',
      title: 'releases',
      lead: 'two live cases: an AU trade redesign and a restaurant site. one slot still open.',
      pending: 'awaiting signal',
      live: 'online',
      openLive: 'open demo',
      openCode: 'code',
      items: [
        {
          id: '01',
          tag: 'REDESIGN',
          name: 'SYDNEY.WIDE',
          text: 'Full redesign of Sydney Wide Roofing Co: slate and copper, editorial grid, quote form up front, services and a sample region. Portfolio demo, not production.',
          stack: 'TypeScript · React · GH Pages',
          live: 'https://thoriumsteinar.github.io/upgrade-sydney-wide-roofing-demo/',
          repo: 'https://github.com/ThoriumSteinar/upgrade-sydney-wide-roofing-demo',
        },
        {
          id: '02',
          tag: 'HOSPITALITY',
          name: 'UNSLEPTOV.BAR',
          text: 'Restaurant and bar in Manchester grill tones: table booking, menus, private hire, events, gift cards. Separate demo, not production.',
          stack: 'TypeScript · React · GH Pages',
          live: 'https://thoriumsteinar.github.io/unsleptov-restaurant/',
          repo: 'https://github.com/ThoriumSteinar/unsleptov-restaurant',
        },
        {
          id: '03',
          tag: 'SLOT',
          name: 'NEXT.SIGNAL',
          text: 'Another slot for a demo.',
          stack: 'awaiting payload',
        },
      ],
    },
    contact: {
      index: '04',
      title: 'channel',
      lead: 'Fastest path is Discord or Telegram. The form reaches my inbox: fill the brief and I’ll reply.',
      discord: 'discord/telegram',
      copy: 'copy nick',
      copied: 'copied',
      alias: 'alias',
      channel: 'telegram / email',
      payload: 'what should we build',
      send: 'transmit',
      sending: 'sending…',
      sent: 'signal sent to unsleptov@gmail.com',
      error: 'failed to transmit. try again.',
    },
    footer: 'unsleep protocol · local runtime',
  },
}

type Ctx = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Copy
}

const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}
