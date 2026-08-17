import { useEffect, useRef, useState } from 'react'
import { contentTabs, faqs, roadmap, teamScenarios } from './data.js'

const asset = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`

function Logo({ className = '' }) {
  return <img className={`logo ${className}`} src={asset('582db07d8ccd60da.svg')} alt="Снэпбилд" />
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHeading({ title, text, align = 'left', split = false }) {
  return (
    <div className={`section-heading section-heading--${align}${split ? ' section-heading--split' : ''}`}>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    document.documentElement.classList.toggle('menu-open', open)
    return () => {
      document.body.classList.remove('menu-open')
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="header-bar">
        <a className="brand-link" href="#hero" aria-label="На главную" onClick={close}><Logo /></a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#process" onClick={close}>Продукт</a>
          <a href="#use-cases" onClick={close}>Возможности</a>
          <a href="#features" onClick={close}>Безопасность</a>
          <a href="#faq" onClick={close}>FAQ</a>
        </nav>
        <a className="button button--dark header-cta" href="#contact" onClick={close}>Начать сейчас</a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </div>
      <div className="mobile-menu" aria-hidden={!open}>
        <a href="#use-cases" onClick={close}>Возможности</a>
        <a href="#process" onClick={close}>Продукт</a>
        <a href="#features" onClick={close}>Безопасность</a>
        <a href="#faq" onClick={close}>FAQ</a>
        <a className="button button--dark" href="#contact" onClick={close}>Начать сейчас</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-surface">
        <div className="hero-copy">
          <h1>{'Платформа, где все создается в\u00a0рамках вашего бренда и\u00a0дизайн-системы'}</h1>
          <p>Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные материалы в фирменном стиле за минуты, а не дни.</p>
          <a className="button button--light button--shine" href="#contact"><span>Начать сейчас</span></a>
        </div>
        <div className="hero-preview">
          <img src={asset('hero-snapbuild-2026-08-07-v2.webp')} alt="Интерфейс платформы Снэпбилд" />
        </div>
      </div>
    </section>
  )
}

const clientLogos = [
  ['5cd01de0b6a5e001.svg', 'Ozon'],
  ['ee341193d7cf46d6.svg', 'T2'],
  ['logo-avito.svg', 'Avito'],
  ['logo-cian.svg', 'Циан'],
  ['logo-lenta.svg', 'Лента'],
]

function LogoCloud() {
  return (
    <section className="logo-cloud reveal" id="logos" aria-label="Клиенты платформы">
      <div className="logo-track">
        {[0, 1].map((copy) => (
          <div className="logo-group" aria-hidden={copy === 1} key={copy}>
            {clientLogos.map(([src, name], index) => <img key={`${copy}-${name}`} style={{ '--logo-index': index }} src={asset(src)} alt={copy ? '' : name} />)}
          </div>
        ))}
      </div>
      <p>С платформой работают команды, для которых бренд — закон</p>
    </section>
  )
}

function Process() {
  const items = [
    ['Дизайн-система — ядро платформы', 'Ваши компоненты, цвета и шрифты — единственный источник стиля', '84a4450b3827bc21.webp'],
    ['Гибкая конфигурация', 'Правила бренда задаются один раз — работают в каждой генерации', 'process-flexible-configuration.webp'],
    ['Соответствие по умолчанию', 'AI не может нарушить бренд: сайты, изображения, видео, баннеры и презентации — строго по вашим правилам', 'afe03eb4a67d5dfb.webp'],
  ]

  return (
    <section className="section process reveal" id="process">
      <SectionHeading split title="Одна платформа — весь маркетинг" text="Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле" />
      <div className="process-grid">
        {items.map(([title, text, image]) => (
          <article className="process-card" key={title}>
            <img src={asset(image)} alt="" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TeamWorkflows() {
  const [active, setActive] = useState(teamScenarios[0].id)
  const item = teamScenarios.find((scenario) => scenario.id === active)

  return (
    <section className="section teams reveal" id="teams">
      <SectionHeading split title="Один продукт — для всей команды" text="Каждый работает в знакомом сценарии, а дизайн-система остается общей для всех материалов" />
      <div className="pill-tabs" role="tablist" aria-label="Команды">
        {teamScenarios.map((scenario) => (
          <button key={scenario.id} role="tab" aria-selected={active === scenario.id} className={active === scenario.id ? 'is-active' : ''} onClick={() => setActive(scenario.id)}>{scenario.label}</button>
        ))}
      </div>
      <div className="team-panel" role="tabpanel" key={item.id}>
        <div className="team-copy">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <ul>{item.points.map((point) => <li key={point}><CheckIcon />{point}</li>)}</ul>
        </div>
        <div className="team-media"><img src={asset(item.image)} alt="" /></div>
      </div>
    </section>
  )
}

function UseCases() {
  const [tabIndex, setTabIndex] = useState(0)
  const [featureIndex, setFeatureIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState('next')
  const swipeStart = useRef(null)
  const item = contentTabs[tabIndex]
  const feature = item.features[featureIndex]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSwipeDirection('next')
      if (featureIndex < item.features.length - 1) {
        setFeatureIndex((value) => value + 1)
      } else {
        setFeatureIndex(0)
        setTabIndex((value) => (value + 1) % contentTabs.length)
      }
    }, 8000)

    return () => window.clearTimeout(timer)
  }, [featureIndex, item.features.length, tabIndex])

  const selectTab = (index) => {
    if (index === tabIndex) return
    setSwipeDirection(index > tabIndex ? 'next' : 'prev')
    setTabIndex(index)
    setFeatureIndex(0)
  }

  const selectFeature = (index) => {
    if (index === featureIndex) return
    setSwipeDirection(index > featureIndex ? 'next' : 'prev')
    setFeatureIndex(index)
  }

  const moveFeature = (direction) => {
    setSwipeDirection(direction > 0 ? 'next' : 'prev')

    if (direction > 0) {
      if (featureIndex < item.features.length - 1) {
        setFeatureIndex((value) => value + 1)
      } else {
        setTabIndex((value) => (value + 1) % contentTabs.length)
        setFeatureIndex(0)
      }
      return
    }

    if (featureIndex > 0) {
      setFeatureIndex((value) => value - 1)
    } else {
      const previousTab = (tabIndex - 1 + contentTabs.length) % contentTabs.length
      setTabIndex(previousTab)
      setFeatureIndex(contentTabs[previousTab].features.length - 1)
    }
  }

  const startSwipe = (event) => {
    swipeStart.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const finishSwipe = (event) => {
    if (!swipeStart.current) return
    const deltaX = event.clientX - swipeStart.current.x
    const deltaY = event.clientY - swipeStart.current.y
    swipeStart.current = null
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    moveFeature(deltaX < 0 ? 1 : -1)
  }

  return (
    <section className="section use-cases reveal" id="use-cases">
      <div className="use-cases-header">
        <h2>Любой контент в фирменном стиле за считанные минуты</h2>
        <div className="pill-tabs content-tabs" role="tablist" aria-label="Тип контента">
          {contentTabs.map((tab, index) => (
            <button key={tab.id} role="tab" aria-selected={tabIndex === index} className={tabIndex === index ? 'is-active' : ''} onClick={() => selectTab(index)}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div className="content-panel" role="tabpanel">
        <div className="feature-list">
          {item.features.map((candidate, index) => (
            <button className={featureIndex === index ? 'is-active' : ''} key={candidate.title} onClick={() => selectFeature(index)}>
              <span className="feature-copy"><strong>{candidate.title}</strong><small>{candidate.text}</small></span>
              <span className="feature-progress" />
            </button>
          ))}
        </div>
        <div
          className="content-visual"
          data-swipe={swipeDirection}
          onPointerDown={startSwipe}
          onPointerUp={finishSwipe}
          onPointerCancel={() => { swipeStart.current = null }}
        >
          <img draggable="false" key={`${item.id}-${featureIndex}`} src={asset(feature.image)} alt={`Пример раздела «${item.label}»: ${feature.title}`} />
        </div>
      </div>
    </section>
  )
}

function CampaignSystem() {
  return (
    <section className="section campaign reveal" id="campaign">
      <div className="campaign-surface">
        <div className="campaign-copy">
          <h2>Одна идея — материалы для каждого канала</h2>
          <p>Смысл, визуальный язык и компоненты остаются общими, пока формат меняется под задачу.</p>
          <div className="format-list"><span>Сайт</span><span>Изображение</span><span>Видео</span><span>Баннер</span><span>Презентация</span></div>
        </div>
        <div className="campaign-stack" aria-hidden="true">
          <img src={asset('use-cases-tab4-item2.webp')} alt="" />
          <img src={asset('use-cases-tab5-item3.webp')} alt="" />
          <img src={asset('use-cases-tab2-item4.webp')} alt="" />
        </div>
      </div>
    </section>
  )
}

function Comparison() {
  const headers = ['Особенности', 'снэпбилд', 'Claude + Figma MCP', 'No-code платформы', 'Cursor', 'Традиционный']
  const rows = [
    ['Time-to-market', '5 минут', '30–60 мин', '2–3 дня', '1–2 дня', '3–5 недель'],
    ['Дизайн-система', <>100%<br />точность</>, 'Частично, из Figma', 'Шаблоны', 'Вручную в коде', 'Вручную, через ревью'],
    ['Визуальный редактор', <><img className="compare-check" src={asset('a4ce0581ce7807b6.svg')} alt="" />+ ИИ</>, '—', <img className="compare-check" src={asset('a4ce0581ce7807b6.svg')} alt="" />, '—', '—'],
    ['Требуемые навыки', 'Нет', 'Промпты + код', 'Дизайн', 'Разработка', 'Полная команда'],
  ]

  return (
    <section className="section compare reveal" id="compare">
      <SectionHeading split title="Почему команды выбирают Снэпбилд" text="Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками" />
      <div className="table-scroll">
        <div className="compare-table" role="table" aria-label="Сравнение платформ">
          <span className="compare-brand-border" aria-hidden="true" />
          <div className="compare-row compare-row--header" role="row">
            {headers.map((label) => <div className="compare-cell" role="columnheader" key={label}>{label}</div>)}
          </div>
          {rows.map((row) => (
            <div className="compare-row" role="row" key={row[0]}>
              {row.map((cell, index) => <div className="compare-cell" role="cell" key={index}>{cell}</div>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Security() {
  const cards = [
    ['Только одобренные модели', 'Работаем только с\u00a0российскими и\u00a0локализованными моделями, без\u00a0экспортных ограничений', 'security-approved-models.webp'],
    ['Ваш контур, ваша юрисдикция', 'Развертывание в\u00a0частном облаке с\u00a0полным соответствием 152-ФЗ и\u00a0внутренними ИБ-требованиями', 'security-private-cloud.webp'],
    ['Собственный AI-стек', 'Вы\u00a0сами определяете модели, хранилища, доступы и\u00a0цепочки валидации', 'security-ai-stack.webp'],
  ]

  return (
    <section className="section security reveal" id="features">
      <SectionHeading title="Безопасность без компромиссов" />
      <div className="security-grid">
        {cards.map(([title, text, image]) => <article key={title}><img src={asset(image)} alt="" /><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  )
}

function Onboarding() {
  const cards = [
    ['Собираем язык бренда', 'Цвета, типографика, сетки и композиционные правила из ваших материалов.', 'use-cases-tab1-item2.webp'],
    ['Фиксируем компоненты', 'Настраиваем допустимые элементы, состояния и ограничения дизайн-системы.', 'use-cases-tab1-item3.webp'],
    ['Передаем команде', 'Пользователи создают материалы в готовой системе без ручной пересборки.', 'use-cases-tab5-item2.webp'],
  ]

  return (
    <section className="section onboarding reveal" id="onboarding">
      <SectionHeading split title="Дизайн-система становится рабочим инструментом" text="Подключение строится вокруг ваших существующих правил и процессов" />
      <div className="onboarding-grid">
        {cards.map(([title, text, image]) => <article key={title}><img src={asset(image)} alt="" /><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  )
}

function Integrations() {
  const items = ['Figma', 'GitHub', 'GitLab', 'REST API', 'Private Cloud', 'CI/CD']
  return (
    <section className="section integrations reveal" id="integrations">
      <div className="integration-surface">
        <SectionHeading align="center" title="Встраивается в существующую инфраструктуру" text="Дизайн, код и корпоративный контур остаются частью привычного процесса" />
        <div className="integration-map">
          <div className="integration-core"><Logo /><span>Дизайн-система и AI</span></div>
          <div className="integration-orbit">{items.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  )
}

function Roadmap() {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, x: 0, left: 0 })

  const pointerDown = (event) => {
    const track = trackRef.current
    drag.current = { active: true, x: event.clientX, left: track.scrollLeft }
    track.setPointerCapture(event.pointerId)
    track.classList.add('is-dragging')
  }
  const pointerMove = (event) => {
    if (!drag.current.active) return
    trackRef.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x)
  }
  const pointerUp = () => {
    drag.current.active = false
    trackRef.current?.classList.remove('is-dragging')
  }

  return (
    <section className="section roadmap reveal" id="roadmap">
      <SectionHeading title="Каждый день — новый релиз" text="Приоритизируем бэклог для ваших целей" />
      <div className="roadmap-scroller" ref={trackRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
        <div className="roadmap-track">
          {roadmap.map(([title, text, date]) => <article key={title}><i /><h3>{title}</h3><p>{text}</p><time>{date}</time></article>)}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const nextErrors = {}
    if (!String(form.get('name')).trim()) nextErrors.name = 'Укажите имя'
    const email = String(form.get('email')).trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Введите корректный email'
    if (!String(form.get('company')).trim()) nextErrors.company = 'Укажите компанию'
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) {
      event.currentTarget.reset()
      setStatus('success')
    }
  }

  return (
    <section className="section contact reveal" id="contact">
      <div className="contact-surface">
        <div className="contact-copy">
          <h2>Покажем Снэпбилд на ваших материалах</h2>
          <p>Расскажите, что создает ваша команда. Подготовим демонстрацию на сценарии, близком к вашим процессам.</p>
          <ul><li><CheckIcon />Ваш визуальный язык</li><li><CheckIcon />Подходящие форматы</li><li><CheckIcon />Вариант развертывания</li></ul>
        </div>
        {status === 'success' ? (
          <div className="form-success" role="status"><span>✓</span><h3>Форма проверена</h3><p>Данные прошли локальную валидацию. Для тестового задания отправка не уходит во внешний сервис.</p><button className="button button--outline" onClick={() => setStatus('idle')}>Отправить еще раз</button></div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label>Имя<input name="name" type="text" placeholder="Как к вам обращаться" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
            <label>Рабочий email<input name="email" type="email" placeholder="name@company.ru" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
            <label>Компания<input name="company" type="text" placeholder="Название компании" aria-invalid={Boolean(errors.company)} />{errors.company && <small>{errors.company}</small>}</label>
            <label>Задача<textarea name="message" rows="3" placeholder="Какие материалы хотите создавать?" /></label>
            <button className="button button--dark" type="submit">Запросить демо <ArrowIcon /></button>
          </form>
        )}
      </div>
    </section>
  )
}

function Faq() {
  const [openItems, setOpenItems] = useState(() => new Set())

  const toggle = (index) => {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const columns = [faqs.slice(0, 4), faqs.slice(4)]

  return (
    <section className="section faq reveal" id="faq">
      <SectionHeading title="Часто задаваемые вопросы" text="Ответы, которые помогут вам принять решение уверенно — без рисков для бренда и безопасности" />
      <div className="faq-grid">
        {columns.map((column, columnIndex) => (
          <div className="faq-column" key={columnIndex}>
            {column.map(([question, answer], rowIndex) => {
              const index = columnIndex * 4 + rowIndex
              const isOpen = openItems.has(index)
              return (
                <article className={isOpen ? 'is-open' : ''} key={question}>
                  <button aria-expanded={isOpen} onClick={() => toggle(index)}><span>{question}</span><i><img src={asset('c2663c497fb468e1.webp')} alt="" /></i></button>
                  <div className="faq-answer"><p>{answer}</p></div>
                </article>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta reveal" id="cta">
      <span className="final-cta-shine" aria-hidden="true" />
      <h2>
        <span className="final-cta-title-wide">{'Профессиональные материалы в\u00a0фирменном стиле'}<br />{'за\u00a0минуты, а\u00a0не\u00a0дни'}</span>
        <span className="final-cta-title-mobile">{'Профессиональные материалы в\u00a0фирменном стиле за\u00a0минуты, а\u00a0не\u00a0дни'}</span>
      </h2>
      <a className="button button--light button--shine" href="#contact"><span>Начать сейчас</span></a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer reveal" id="footer">
      <div className="footer-top">
        <div className="footer-brand"><a href="#hero" aria-label="На главную"><Logo /></a><p>Платформа, где все создается в рамках вашего бренда и дизайн-системы</p></div>
        <div><strong>Навигация</strong><a href="#process">Продукт</a><a href="#use-cases">Возможности</a><a href="#compare">Преимущества</a><a href="#features">Безопасность</a><a href="#roadmap">Роадмап</a><a href="#faq">Частые вопросы</a></div>
        <div><strong>Документация</strong><a href="#faq">Политика конфиденциальности</a><a href="#faq">FAQ</a></div>
        <div><strong>Контакты</strong><a href="#contact">Запросить демо</a><a href="https://t.me/snapbuild" target="_blank" rel="noreferrer">Telegram</a><a className="footer-email-mobile" href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a></div>
      </div>
      <div className="footer-bottom"><span>© Сгенерировано в Снэпбилде. Все права защищены.</span><a href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a></div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCloud />
        <Process />
        <TeamWorkflows />
        <UseCases />
        <CampaignSystem />
        <Comparison />
        <Security />
        <Onboarding />
        <Integrations />
        <Roadmap />
        <Contact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
