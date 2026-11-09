"use client";

import { useEffect, useState } from "react";

type Palette = "business" | "graphite" | "green";

const specialties = ["Стратегический маркетинг", "Финансовый советник", "Бизнес-консультант"];

const palettes: { id: Palette; name: string; description: string; colors: string[]; codes: string[] }[] = [
  { id: "business", name: "Светлая деловая", description: "Спокойствие, ясность, деловой подход.", colors: ["#F6F4EF", "#202B35", "#274C63", "#D9DEDF"], codes: ["#F6F4EF", "#202B35", "#274C63", "#D9DEDF"] },
  { id: "graphite", name: "Графит и тёплый акцент", description: "Личный бренд, сдержанность, опыт.", colors: ["#F5F3EF", "#252525", "#956747", "#DED8D0"], codes: ["#F5F3EF", "#252525", "#956747", "#DED8D0"] },
  { id: "green", name: "Белый и глубокий зелёный", description: "Устойчивость, доверие, спокойствие.", colors: ["#FAFBF8", "#20352D", "#35634D", "#DCE4DC"], codes: ["#FAFBF8", "#20352D", "#35634D", "#DCE4DC"] },
];

const nextBlocks = [
  ["Опыт и образование", "Профессиональная основа"],
  ["Кейсы", "Задачи, решения и подтверждённые результаты"],
  ["Порядок работы", "От первого обращения до сотрудничества"],
  ["Партнёры и клиенты", "Подтверждённый опыт взаимодействия"],
  ["Ответы на вопросы", "Формат, сроки и условия"],
  ["Контакты", "Удобный способ обсудить задачу"],
];

export default function Home() {
  const [palette, setPalette] = useState<Palette>("business");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [specialtyPhase, setSpecialtyPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    document.body.dataset.palette = palette;
    return () => { delete document.body.dataset.palette; };
  }, [palette]);

  useEffect(() => {
    document.body.style.overflow = isContactOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isContactOpen]);

  useEffect(() => {
    let transitionTimer: number;
    const timer = window.setInterval(() => {
      setSpecialtyPhase("out");
      transitionTimer = window.setTimeout(() => {
        setSpecialtyIndex((current) => (current + 1) % specialties.length);
        setSpecialtyPhase("in");
      }, 430);
    }, 3200);
    return () => { window.clearInterval(timer); window.clearTimeout(transitionTimer); };
  }, []);

  return (
    <main>
      <div className="site-shell">
        <section className="site-section hero" aria-labelledby="hero-title">
          <header className="site-header">
            <div className="wordmark">Сергей Клементьев</div>
            <nav className="main-nav" aria-label="Основная навигация">
              {["Услуги", "Опыт", "Кейсы", "Контакты"].map((item) => <span className="nav-placeholder" key={item}>{item}</span>)}
            </nav>
            <div className="header-actions">
              <span className="language-switcher" aria-label="Переключатель языков"><strong>RU</strong><span>/</span><span>EN</span></span>
              <button className="button button-small" onClick={() => setIsContactOpen(true)}>Обсудить задачу <span aria-hidden="true">↗</span></button>
            </div>
          </header>

          <div className="hero-grid">
            <div className="portrait-placeholder" role="img" aria-label="Место для фотографии Сергея Клементьева"><span>Фото Сергея<br />Клементьева</span></div>
            <div className="hero-copy">
              <h1 id="hero-title">Сергей<br />Клементьев</h1>
              <div className="hero-actions">
                <button className="button" onClick={() => setIsContactOpen(true)}>Обсудить задачу <span aria-hidden="true">↗</span></button>
                <a className="text-link" href="#directions">Направления работы <span aria-hidden="true">↓</span></a>
              </div>
              <p className="hero-description">Помогаю принимать взвешенные решения и находить точки роста бизнеса. Разбираю стратегию, маркетинг и финансовую модель, чтобы увидеть риски и определить приоритеты. Вместе превращаем выводы в понятный план действий.</p>
              <p className={`specialty-switch ${specialtyPhase}`} aria-live="polite">{specialties[specialtyIndex]}</p>
            </div>
          </div>
        </section>

        <section className="site-section directions" id="directions" aria-labelledby="directions-title" data-flow-palette={palette === "graphite" ? "sand" : palette === "green" ? "green" : "blue"}>
          <div className="flow-heading">
            <p className="map-overline">ОТ ЗАДАЧИ К РЕШЕНИЮ</p>
            <h2 id="directions-title">Увидеть, что мешает — <em>понять, что делать</em></h2>
            <p>Сначала находим причину, затем вместе определяем конкретные шаги.</p>
          </div>
          <div className="business-flow" aria-label="Примеры задач, с которыми помогает консультант">
            <svg className="flow-connectors" viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
              <path d="M288 180 H312 M312 58 V302 M312 58 H336 M312 180 H336 M312 302 H336" />
              <circle cx="312" cy="180" r="4" />
            </svg>
            <div className="flow-question">Что мешает<br />бизнесу расти?</div>
            <div className="flow-branches">
              <div className="flow-pair"><div className="flow-item"><span className="flow-label">СИТУАЦИЯ</span>Компания пока незаметна на рынке</div><span className="flow-arrow" aria-hidden="true" /><div className="flow-solution"><span className="flow-label">КАК ПОМОГАЕТ СЕРГЕЙ</span><strong>Находим своё место на рынке</strong><span>Стратегический маркетинг, позиционирование и развитие бренда.</span></div></div>
              <div className="flow-pair"><div className="flow-item"><span className="flow-label">СИТУАЦИЯ</span>Клиент не понимает ценность предложения</div><span className="flow-arrow" aria-hidden="true" /><div className="flow-solution"><span className="flow-label">КАК ПОМОГАЕТ СЕРГЕЙ</span><strong>Делаем ценность понятной</strong><span>Разбираем продукт, аудиторию и аргументы для продвижения.</span></div></div>
              <div className="flow-pair"><div className="flow-item"><span className="flow-label">СИТУАЦИЯ</span>Продажи растут, а прибыль — нет</div><span className="flow-arrow" aria-hidden="true" /><div className="flow-solution"><span className="flow-label">КАК ПОМОГАЕТ СЕРГЕЙ</span><strong>Находим, где теряются деньги</strong><span>Финансовое управление и налоговое планирование.</span></div></div>
            </div>
          </div>
        </section>
      </div>

      <section className="concept-zone" aria-labelledby="concept-title">
        <div className="concept-inner">
          <header className="concept-header"><p className="concept-label">КОНЦЕПЦИЯ САЙТА</p><h2 id="concept-title">Оформление и развитие</h2><p>Выберите цветовое направление и посмотрите, какие разделы можно добавить.</p></header>
          <div className="concept-palette-section"><h3>Цветовое оформление</h3><div className="palette-grid">{palettes.map((item) => <button className={`palette-option ${palette === item.id ? "selected" : ""}`} key={item.id} onClick={() => setPalette(item.id)} aria-pressed={palette === item.id}><div className="swatches">{item.colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</div><div className="palette-name">{item.name}<span className="radio-dot" /></div><p>{item.description}</p></button>)}</div></div>
          <div className="concept-details">
            <article className="concept-detail"><h3>Разделы сайта</h3><p>В структуру можно добавить:</p><ul>{nextBlocks.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}</ul></article>
            <article className="concept-detail"><h3>Развитие проекта</h3><p>Сайт можно расширять по мере появления новых задач:</p><ul><li>Русская и английская версии с переключателем языка.</li><li>Админ-панель для самостоятельного обновления фото, текстов и кейсов.</li><li>Формат лендинга или многостраничного сайта.</li><li>Отдельные страницы услуг и кейсов для подробного описания экспертизы и поискового продвижения.</li></ul></article>
          </div>
          <footer className="concept-footer"><span>Сергей Клементьев</span><span>Материал для обсуждения</span></footer>
        </div>
      </section>

      {isContactOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsContactOpen(false); }}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button className="modal-close" aria-label="Закрыть окно" onClick={() => setIsContactOpen(false)}>×</button><p className="eyebrow">Обсудить задачу</p><h2 id="contact-title">Давайте обсудим <em>ваши вопросы</em></h2><p>Свяжитесь напрямую удобным способом — форма и отправка данных пока не включены в концепцию.</p><div className="contact-list"><a href="tel:+79219564343"><span>Телефон</span>+7 (921) 956-43-43</a><a href="mailto:info@klementeff.com"><span>Электронная почта</span>info@klementeff.com</a><a href="https://wa.me/79219564343" target="_blank" rel="noreferrer"><span>WhatsApp</span>Написать в WhatsApp <span aria-hidden="true">↗</span></a></div></section></div>}
    </main>
  );
}
