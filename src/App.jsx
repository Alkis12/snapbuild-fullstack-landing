import { useEffect, useState } from 'react'
import { contentTabs, faqs, roadmap, teamTabs, testimonials } from './data.js'

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

function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <a className="brand-link" href="#hero" aria-label="На главную" onClick={close}><Logo /></a>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Основная навигация">
        <a href="#process" onClick={close}>Продукт</a>
        <a href="#use-cases" onClick={close}>Возможности</a>
        <a href="#features" onClick={close}>Безопасность</a>
        <a href="#faq" onClick={close}>FAQ</a>
      </nav>
      <a className="button button--dark header-cta" href="#contact">Начать сейчас</a>
      <button
        className={`menu-button ${open ? 'is-open' : ''}`}
        type="button"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span />
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero reveal" id="hero">
      <div className="hero-surface">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Дизайн-система, доступная всей команде</p>
          <h1>Платформа, где всё создаётся в рамках вашего бренда и дизайн-системы</h1>
          <p>Подключите дизайн-систему к Снэпбилду, чтобы каждый участник команды мог создавать профессиональные материалы в фирменном стиле за минуты, а не дни.</p>
          <a className="button button--light" href="#contact">Начать сейчас <ArrowIcon /></a>
        </div>
        <div className="hero-preview">
          <img src={asset('hero-snapbuild-2026-08-07-v2.webp')} alt="Интерфейс платформы Снэпбилд" />
        </div>
      </div>
    </section>
  )
}

function LogoCloud() {
  const logos = [
    ['5cd01de0b6a5e001.svg', 'Ozon'],
    ['ee341193d7cf46d6.svg', 'T2'],
    ['logo-avito.svg', 'Avito'],
    ['logo-cian.svg', 'Циан'],
    ['logo-lenta.svg', 'Лента'],
  ]
  return (
    <section className="logo-cloud reveal" aria-label="Клиенты платформы">
      <p>С платформой работают команды, для которых бренд — закон</p>
      <div className="logo-row">
        {logos.map(([src, name]) => <img key={name} src={asset(src)} alt={name} />)}
      </div>
    </section>
  )
}

function Process() {
  const items = [
    {
      title: 'Дизайн-система — ядро платформы',
      text: 'Ваши компоненты, цвета и шрифты — единственный источник стиля',
      image: '84a4450b3827bc21.webp',
    },
    {
      title: 'Гибкая конфигурация',
      text: 'Правила бренда задаются один раз — работают в каждой генерации',
      image: 'process-flexible-configuration.webp',
    },
    {
      title: 'Соответствие по умолчанию',
      text: 'AI не может нарушить бренд: каждый формат следует вашим правилам',
      image: 'afe03eb4a67d5dfb.webp',
    },
  ]
  return (
    <section className="section process reveal" id="process">
      <div className="container">
        <SectionHeading title="Одна платформа — весь маркетинг" text="Сайты, изображения, видео, баннеры и презентации — из одной идеи, в вашем стиле" />
        <div className="process-grid">
          {items.map((item, index) => (
            <article className="process-card" key={item.title}>
              <div className="process-image"><img src={asset(item.image)} alt="" /></div>
              <span className="card-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamWorkflows() {
  const [active, setActive] = useState(teamTabs[0].id)
  const item = teamTabs.find((tab) => tab.id === active)
  return (
    <section className="section team-workflows reveal" id="teams">
      <div className="container">
        <SectionHeading eyebrow="Новый раздел" title="Один продукт — разные команды" text="Снэпбилд снимает рутину между идеей и готовым материалом, сохраняя понятные роли и контроль." />
        <div className="team-tabs" role="tablist" aria-label="Команды">
          {teamTabs.map((tab) => (
            <button key={tab.id} role="tab" aria-selected={active === tab.id} className={active === tab.id ? 'is-active' : ''} onClick={() => setActive(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div className="team-panel" role="tabpanel" key={item.id}>
          <div className="team-panel-copy">
            <p className="eyebrow">{item.eyebrow}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="chip-row">{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
          <div className={`team-visual team-visual--${item.id}`}>
            <div className="mini-window">
              <div className="mini-window-bar"><i /><i /><i /></div>
              <div className="mini-canvas">
                <div className="mini-sidebar"><span /><span /><span /><span /></div>
                <div className="mini-content"><span /><strong>{item.label}</strong><span /><span /></div>
              </div>
            </div>
            <div className="team-stat"><strong>{item.stat}</strong><span>{item.statLabel}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const [active, setActive] = useState(contentTabs[0].id)
  const item = contentTabs.find((tab) => tab.id === active)
  return (
    <section className="section use-cases reveal" id="use-cases">
      <div className="container">
        <SectionHeading title="Любой контент в фирменном стиле за считанные минуты" />
        <div className="content-tabs" role="tablist" aria-label="Тип контента">
          {contentTabs.map((tab) => (
            <button key={tab.id} role="tab" aria-selected={active === tab.id} className={active === tab.id ? 'is-active' : ''} onClick={() => setActive(tab.id)}>{tab.label}</button>
          ))}
        </div>
        <div className="content-panel" key={item.id} role="tabpanel">
          <div className="feature-list">
            {item.features.map(([title, text], index) => (
              <article className={index === 0 ? 'is-active' : ''} key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
          <div className="content-visual"><img src={asset(item.image)} alt={`Пример: ${item.label.toLowerCase()} в Снэпбилде`} /></div>
        </div>
      </div>
    </section>
  )
}

function Results() {
  const metrics = [
    ['5 минут', 'до первой готовой страницы'],
    ['100%', 'точность дизайн-системы'],
    ['−72%', 'ручных дизайн-итераций'],
    ['5 форматов', 'из одного исходного брифа'],
  ]
  return (
    <section className="section results reveal" id="results">
      <div className="container">
        <div className="results-surface">
          <SectionHeading eyebrow="Новый раздел" title="Бренд быстрее бизнеса больше не тормозит" text="Платформа превращает правила дизайн-системы в измеримую скорость для маркетинга." />
          <div className="metrics-grid">
            {metrics.map(([value, label], index) => (
              <article key={value}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></article>
            ))}
          </div>
          <div className="results-ticker" aria-label="Этапы выпуска кампании">
            {['Бриф', 'Структура', 'Дизайн-система', 'Контент', 'Публикация'].map((label, index) => <div key={label}><span>{index + 1}</span>{label}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Comparison() {
  const rows = [
    ['Time-to-market', '5 минут', '30–60 мин', '2–3 дня', '1–2 дня', '3–5 недель'],
    ['Дизайн-система', '100% точность', 'Частично, из Figma', 'Шаблоны', 'Вручную в коде', 'Вручную, через ревью'],
    ['Визуальный редактор', '+ AI', '—', <CheckIcon key="check" />, '—', '—'],
    ['Требуемые навыки', 'Нет', 'Промпты + код', 'Дизайн', 'Разработка', 'Полная команда'],
  ]
  return (
    <section className="section compare reveal" id="compare">
      <div className="container">
        <SectionHeading title="Почему команды выбирают Снэпбилд" text="Вы получаете не редактор, а результат: готовые маркетинговые материалы без проблем с настройками" />
        <div className="table-scroll">
          <table>
            <thead><tr>{['Особенности', 'снэпбилд', 'Claude + Figma MCP', 'No-code платформы', 'Cursor', 'Традиционный'].map((item) => <th key={item}>{item}</th>)}</tr></thead>
            <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Security() {
  const cards = [
    ['Только одобренные модели', 'Работаем с российскими и локализованными моделями без экспортных ограничений', 'security-approved-models.webp'],
    ['Ваш контур, ваша юрисдикция', 'Развёртывание в частном облаке с полным соответствием 152-ФЗ и внутренним ИБ-требованиям', 'security-private-cloud.webp'],
    ['Собственный AI-стек', 'Вы определяете модели, хранилища, доступы и цепочки валидации', 'security-ai-stack.webp'],
  ]
  return (
    <section className="section security reveal" id="features">
      <div className="container">
        <SectionHeading title="Безопасность без компромиссов" />
        <div className="security-grid">
          {cards.map(([title, text, image]) => <article key={title}><img src={asset(image)} alt="" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function Implementation() {
  const steps = [
    ['01', 'Анализируем', 'Собираем цвета, шрифты, сетки и паттерны из ваших интерфейсов.'],
    ['02', 'Настраиваем', 'Фиксируем компоненты, ограничения и права для разных ролей.'],
    ['03', 'Проверяем', 'Создаём эталонные материалы и валидируем качество с командой.'],
    ['04', 'Масштабируем', 'Подключаем пользователей, процессы и корпоративный контур.'],
  ]
  return (
    <section className="section implementation reveal" id="implementation">
      <div className="container">
        <SectionHeading eyebrow="Новый раздел" title="От дизайн-системы до первого запуска" text="Внедрение остаётся прозрачным: каждый этап заканчивается понятным результатом." />
        <div className="implementation-grid">
          {steps.map(([number, title, text], index) => (
            <article key={number}>
              <div className="step-orbit"><span>{number}</span>{index < 3 && <i />}</div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
        <div className="integration-strip"><span>Figma</span><span>GitHub</span><span>GitLab</span><span>REST API</span><span>Private Cloud</span></div>
      </div>
    </section>
  )
}

function Roadmap() {
  return (
    <section className="section roadmap reveal" id="roadmap">
      <div className="container">
        <SectionHeading title="Каждый день — новый релиз" text="Приоритизируем бэклог для ваших целей" />
      </div>
      <div className="roadmap-track-wrap">
        <div className="roadmap-line" />
        <div className="roadmap-track">
          {roadmap.map(([title, text, date]) => <article key={title}><i /><h3>{title}</h3><p>{text}</p><time>{date}</time></article>)}
        </div>
      </div>
    </section>
  )
}

function Stories() {
  const [index, setIndex] = useState(0)
  const story = testimonials[index]
  const select = (next) => setIndex((next + testimonials.length) % testimonials.length)
  return (
    <section className="section stories reveal" id="stories">
      <div className="container">
        <SectionHeading eyebrow="Новый раздел" title="Команды замечают результат с первого запуска" />
        <div className="story-card" key={story.name}>
          <div className="story-quote-mark">“</div>
          <blockquote>{story.quote}</blockquote>
          <div className="story-person"><div className="avatar">{story.name.split(' ').map((part) => part[0]).join('')}</div><div><strong>{story.name}</strong><span>{story.role}</span></div></div>
          <div className="story-result">{story.result}</div>
        </div>
        <div className="story-controls">
          <div className="story-dots">{testimonials.map((item, dot) => <button key={item.name} className={dot === index ? 'is-active' : ''} aria-label={`Отзыв ${dot + 1}`} onClick={() => setIndex(dot)} />)}</div>
          <div><button aria-label="Предыдущий отзыв" onClick={() => select(index - 1)}>←</button><button aria-label="Следующий отзыв" onClick={() => select(index + 1)}>→</button></div>
        </div>
      </div>
    </section>
  )
}

function PlansAndContact() {
  const [annual, setAnnual] = useState(false)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const prices = annual ? ['по запросу', 'от 240 000 ₽/мес', 'индивидуально'] : ['по запросу', 'от 300 000 ₽/мес', 'индивидуально']

  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const nextErrors = {}
    if (!String(form.get('name')).trim()) nextErrors.name = 'Укажите имя'
    const email = String(form.get('email')).trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Введите корректный email'
    if (!form.get('company')) nextErrors.company = 'Укажите компанию'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setStatus('success')
      event.currentTarget.reset()
    }
  }

  const plans = [
    ['Пилот', 'Проверить сценарий и качество', ['Один формат материалов', 'Базовая дизайн-система', 'Совместная настройка']],
    ['Команда', 'Запустить рабочий процесс', ['Все форматы', 'Роли и согласования', 'Интеграции и аналитика']],
    ['Контур', 'Развернуть внутри компании', ['Частное облако', 'Собственный AI-стек', 'SLA и обучение']],
  ]

  return (
    <section className="section plans-contact reveal" id="contact">
      <div className="container">
        <SectionHeading eyebrow="Новый раздел" title="Начните с подходящего масштаба" text="Выберите формат подключения — мы поможем оценить сценарий и собрать пилот." align="center" />
        <div className="billing-toggle" role="group" aria-label="Период оплаты">
          <button className={!annual ? 'is-active' : ''} onClick={() => setAnnual(false)}>Помесячно</button>
          <button className={annual ? 'is-active' : ''} onClick={() => setAnnual(true)}>За год <span>−20%</span></button>
        </div>
        <div className="plans-grid">
          {plans.map(([title, text, features], index) => (
            <article className={index === 1 ? 'is-featured' : ''} key={title}>
              {index === 1 && <span className="popular">Популярный</span>}
              <h3>{title}</h3><p>{text}</p><strong className="price">{prices[index]}</strong>
              <ul>{features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul>
              <a className={`button ${index === 1 ? 'button--dark' : 'button--outline'}`} href="#demo-form">Обсудить</a>
            </article>
          ))}
        </div>
        <div className="demo-panel" id="demo-form">
          <div className="demo-copy"><p className="eyebrow">Персональная демонстрация</p><h3>Покажем Снэпбилд на ваших материалах</h3><p>Расскажите о задаче — подготовим сценарий встречи и свяжемся в рабочее время.</p><div className="demo-note"><span>✓</span> Никаких платных сервисов или закрытых ключей для демо</div></div>
          {status === 'success' ? (
            <div className="form-success" role="status"><div>✓</div><h3>Заявка готова</h3><p>Демо-форма работает локально: данные прошли проверку, имитация отправки завершена успешно.</p><button className="button button--outline" onClick={() => setStatus('idle')}>Отправить ещё одну</button></div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label>Имя<input name="name" type="text" placeholder="Как к вам обращаться" aria-invalid={Boolean(errors.name)} />{errors.name && <span>{errors.name}</span>}</label>
              <label>Рабочий email<input name="email" type="email" placeholder="name@company.ru" aria-invalid={Boolean(errors.email)} />{errors.email && <span>{errors.email}</span>}</label>
              <label>Компания<input name="company" type="text" placeholder="Название компании" aria-invalid={Boolean(errors.company)} />{errors.company && <span>{errors.company}</span>}</label>
              <label>Задача<textarea name="message" rows="3" placeholder="Что хотите создавать быстрее?" /></label>
              <button className="button button--dark" type="submit">Запросить демо <ArrowIcon /></button>
              <small>Нажимая кнопку, вы соглашаетесь с обработкой данных.</small>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq reveal" id="faq">
      <div className="container">
        <SectionHeading title="Часто задаваемые вопросы" text="Ответы, которые помогут принять решение уверенно — без рисков для бренда и безопасности" />
        <div className="faq-grid">
          {faqs.map(([question, answer], index) => (
            <article className={open === index ? 'is-open' : ''} key={question}>
              <button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><i>+</i></button>
              <div className="faq-answer"><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta reveal">
      <div><h2>Профессиональные материалы в фирменном стиле<br />за минуты, а не дни</h2><a className="button button--light" href="#contact">Начать сейчас <ArrowIcon /></a></div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo /><p>Платформа, где всё создаётся в рамках вашего бренда и дизайн-системы</p></div>
        <div><strong>Навигация</strong><a href="#process">Продукт</a><a href="#use-cases">Возможности</a><a href="#compare">Преимущества</a><a href="#features">Безопасность</a></div>
        <div><strong>Материалы</strong><a href="#roadmap">Роадмап</a><a href="#faq">Частые вопросы</a><a href="#contact">Форматы подключения</a></div>
        <div><strong>Контакты</strong><a href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a><a href="https://t.me/snapbuild" target="_blank" rel="noreferrer">Telegram</a></div>
      </div>
      <div className="container footer-bottom"><span>© Сгенерировано в Снэпбилде. Все права защищены.</span><a href="mailto:hey@snapbuild.ru">hey@snapbuild.ru</a></div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.08 })
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
        <Results />
        <Comparison />
        <Security />
        <Implementation />
        <Roadmap />
        <Stories />
        <PlansAndContact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
