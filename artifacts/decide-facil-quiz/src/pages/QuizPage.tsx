import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {
    question: "Cuando se trata de decisiones importantes, ¿cómo te sientes?",
    options: [
      { label: "A", text: "Confundido" },
      { label: "B", text: "Tranquilo" },
      { label: "C", text: "Ansioso" },
    ],
  },
  {
    question: "¿Cuánto tiempo te toma decidir en situaciones cotidianas?",
    options: [
      { label: "A", text: "Más de una hora" },
      { label: "B", text: "Menos de 10 minutos" },
      { label: "C", text: "Entre 10 minutos y una hora" },
    ],
  },
  {
    question: "¿Te arrepientes frecuentemente de tus decisiones?",
    options: [
      { label: "A", text: "Sí" },
      { label: "B", text: "A veces" },
      { label: "C", text: "No" },
    ],
  },
  {
    question: "¿Sientes presión al decidir entre varias opciones?",
    options: [
      { label: "A", text: "Siempre" },
      { label: "B", text: "A veces" },
      { label: "C", text: "Nunca" },
    ],
  },
  {
    question: "¿Te gusta tener varias alternativas al tomar decisiones?",
    options: [
      { label: "A", text: "No, me abruma" },
      { label: "B", text: "Sí, pero a veces me confunde" },
      { label: "C", text: "Totalmente de acuerdo" },
    ],
  },
  {
    question: "¿Qué tipo de decisiones te resultan más difíciles?",
    options: [
      { label: "A", text: "Las cotidianas (comida, ropa)" },
      { label: "B", text: "Las importantes (trabajo, relaciones)" },
      { label: "C", text: "Ninguna" },
    ],
  },
];

const PROFILES = [
  {
    id: 1,
    name: "Decisor Confundido",
    description:
      "Tiendes a sentirte abrumado y con poca confianza al tomar decisiones. La saturación mental afecta tu juicio y necesitas herramientas para simplificar el proceso.",
    icon: "🧩",
    color: "rgba(249, 115, 22, 0.15)",
    borderColor: "rgba(249, 115, 22, 0.35)",
    textColor: "#FB923C",
  },
  {
    id: 2,
    name: "Decisor Eficiente",
    description:
      "Tienes habilidad natural para decidir, pero te agobia el exceso de opciones. Con el sistema correcto, puedes elevar tu efectividad al siguiente nivel.",
    icon: "⚡",
    color: "rgba(56, 189, 248, 0.1)",
    borderColor: "rgba(56, 189, 248, 0.35)",
    textColor: "#38BDF8",
  },
  {
    id: 3,
    name: "Decisor Seguro",
    description:
      "Tu confianza te permite decidir de manera efectiva. Aun así, optimizar tu proceso te dará aún más claridad y velocidad en decisiones complejas.",
    icon: "🎯",
    color: "rgba(34, 197, 94, 0.08)",
    borderColor: "rgba(34, 197, 94, 0.3)",
    textColor: "#4ADE80",
  },
];

const HOTMART_LINK = "https://go.hotmart.com/K106051077A";

function getProfile(answers: string[]): (typeof PROFILES)[0] {
  const aCount = answers.filter((a) => a === "A").length;
  const cCount = answers.filter((a) => a === "C").length;
  if (aCount >= 3) return PROFILES[0];
  if (cCount >= 3) return PROFILES[2];
  return PROFILES[1];
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function AccordionItem({
  title,
  p1,
  p2,
  p3,
  cta,
  index,
}: {
  title: string;
  p1: string;
  p2: string;
  p3: string;
  cta: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className="accordion-item reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <button
        className="accordion-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span style={{ color: "var(--sky)", fontSize: "0.85rem", fontWeight: 700, minWidth: 24 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ flex: 1 }}>{title}</span>
        <svg
          className={`accordion-arrow ${open ? "open" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`accordion-content ${open ? "open" : ""}`}
        style={{ maxHeight: height }}
      >
        <div ref={contentRef} className="accordion-body">
          <div
            style={{
              height: 1,
              background: "var(--glass-border)",
              marginBottom: 20,
            }}
          />
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 12 }}>{p1}</p>
          <p style={{ color: "var(--text-white)", lineHeight: 1.7, marginBottom: 12 }}>{p2}</p>
          <p
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: 16,
              fontStyle: "italic",
            }}
          >
            {p3}
          </p>
          <a href={HOTMART_LINK} className="cta-mini-link" target="_blank" rel="noopener noreferrer">
            {cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  useScrollReveal();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [profile, setProfile] = useState<(typeof PROFILES)[0] | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    if (currentQ + 1 >= QUESTIONS.length) {
      setAnswers(newAnswers);
      setProfile(getProfile(newAnswers));
      setQuizDone(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      setAnswers(newAnswers);
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setQuizDone(false);
    setProfile(null);
  }

  return (
    <div style={{ background: "var(--navy)", minHeight: "100vh", position: "relative" }}>
      {/* Background glow orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* ══════════ SECTION 1: HERO / PROMISE ══════════ */}
      <section className="section" style={{ paddingBottom: 80, paddingTop: 100 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="badge animate-fade-up" style={{ marginBottom: 28, display: "inline-flex" }}>
            <span style={{ width: 6, height: 6, background: "var(--sky)", borderRadius: "50%" }} />
            Herramienta gratuita de diagnóstico
          </div>

          <h1
            className="hero-title animate-fade-up delay-100"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              color: "var(--text-white)",
            }}
          >
            ¿Qué tipo de decisor eres?{" "}
            <span style={{ color: "var(--sky)" }}>Descúbrelo ahora</span>
          </h1>

          <p
            className="animate-fade-up delay-200"
            style={{
              fontSize: "1.2rem",
              color: "var(--text-muted)",
              marginBottom: 12,
              maxWidth: 560,
              margin: "0 auto 12px",
              lineHeight: 1.6,
            }}
          >
            Identifica tu estilo de decisión y cómo mejorarlo en minutos
          </p>

          <p
            className="animate-fade-up delay-300"
            style={{
              fontSize: "1rem",
              color: "var(--text-muted)",
              maxWidth: 520,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            Este quiz te ayudará a entender tu patrón de toma de decisiones y te
            ofrecerá recomendaciones personalizadas. Toma el control de tu vida y
            aprende a decidir sin culpa.
          </p>

          <div
            className="animate-fade-up delay-400"
            style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
          >
            <a href="#quiz" className="btn-cta animate-pulse-glow">
              Empezar el quiz
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="animate-fade-up delay-500"
            style={{
              marginTop: 48,
              display: "flex",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "⚡", text: "Solo 2 minutos" },
              { icon: "🎯", text: "Resultado inmediato" },
              { icon: "🔒", text: "Sin registro" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                }}
              >
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ SECTION 2: INSTRUCTIONS ══════════ */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                marginBottom: 16,
                color: "var(--text-white)",
              }}
            >
              ¿Cómo usar esta herramienta?
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
              Tres pasos simples para descubrir tu perfil de decisor
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              marginBottom: 40,
            }}
          >
            {[
              {
                step: "01",
                title: "Responde con honestidad",
                desc: "Responde cada pregunta seleccionando la opción que más te represente.",
              },
              {
                step: "02",
                title: "Avanza pregunta a pregunta",
                desc: "Haz clic en 'Siguiente' para avanzar a la siguiente pregunta.",
              },
              {
                step: "03",
                title: "Recibe tu perfil",
                desc: "Al final, recibirás tu perfil de decisor y consejos para mejorar tu confianza.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="glass-card glass-card-hover reveal"
                style={{ padding: 28, transitionDelay: `${i * 0.1}s` }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div className="step-number">{item.step}</div>
                  <div>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--text-white)",
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center" }}>
            <p
              style={{
                color: "var(--sky)",
                fontWeight: 600,
                fontSize: "1.05rem",
                letterSpacing: "0.01em",
              }}
            >
              ¡Vamos a descubrirlo!
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ SECTION 3: QUIZ ══════════ */}
      <section className="section" id="quiz">
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                marginBottom: 12,
                color: "var(--text-white)",
              }}
            >
              Tu diagnóstico de decisor
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
              Responde estas 6 preguntas para descubrir tu perfil
            </p>
          </div>

          {!quizDone ? (
            <div className="glass-card reveal" style={{ padding: "36px 40px" }}>
              {/* Progress */}
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "var(--sky)" }}>
                    Pregunta {currentQ + 1} de {QUESTIONS.length}
                  </span>
                  <span>{Math.round(progress)}% completado</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Question */}
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "var(--text-white)",
                  marginBottom: 24,
                  lineHeight: 1.4,
                }}
              >
                {QUESTIONS[currentQ].question}
              </h3>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {QUESTIONS[currentQ].options.map((opt) => (
                  <button
                    key={opt.label}
                    className={`quiz-option ${selected === opt.label ? "selected" : ""}`}
                    onClick={() => setSelected(opt.label)}
                  >
                    <span className="quiz-option-letter">{opt.label}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>

              {/* Next button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="btn-cta"
                  onClick={handleNext}
                  disabled={!selected}
                  style={{
                    opacity: selected ? 1 : 0.4,
                    cursor: selected ? "pointer" : "not-allowed",
                    animation: "none",
                  }}
                >
                  {currentQ + 1 >= QUESTIONS.length ? "Ver mi resultado" : "Siguiente"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div ref={resultRef}>
              {profile && (
                <div
                  className="result-card reveal visible"
                  style={{
                    background: profile.color,
                    borderColor: profile.borderColor,
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>{profile.icon}</div>
                  <div
                    style={{
                      display: "inline-block",
                      background: profile.color,
                      border: `1px solid ${profile.borderColor}`,
                      borderRadius: 100,
                      padding: "4px 16px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: profile.textColor,
                      marginBottom: 16,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Tu perfil
                  </div>
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: profile.textColor,
                      marginBottom: 16,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {profile.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                      maxWidth: 460,
                      margin: "0 auto 28px",
                      fontSize: "1rem",
                    }}
                  >
                    {profile.description}
                  </p>

                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href={HOTMART_LINK} className="btn-cta" target="_blank" rel="noopener noreferrer">
                      Mejora tu decisión ahora
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <button
                      className="btn-sky"
                      onClick={handleRestart}
                    >
                      Repetir quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ SECTION 4: BELIEFS TABS ══════════ */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                marginBottom: 16,
                color: "var(--text-white)",
              }}
            >
              Ahora que conoces tu estilo, descubre la verdad detrás de tus{" "}
              <span style={{ color: "var(--sky)" }}>creencias limitantes</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Vamos a desmontar las creencias que pueden estar afectando tu capacidad
              para decidir con confianza.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 780, margin: "0 auto" }}>
            <AccordionItem
              index={0}
              title="¿Por qué me siento ansioso al decidir?"
              p1="Es normal sentir ansiedad al tomar decisiones. Muchas personas lo sienten, y eso está bien."
              p2="Sin embargo, la ansiedad puede ser una señal de que estás abrumado por demasiadas opciones. La clave es simplificar."
              p3="Adoptar un enfoque más simple puede liberarte de la presión y permitirte decidir con calma."
              cta="Descubre cómo Decide Fácil te ayuda a enfrentar tus decisiones."
            />
            <AccordionItem
              index={1}
              title="¿Por qué a veces regreso a la parálisis?"
              p1="Recuperar la confianza en la toma de decisiones puede ser un proceso complicado."
              p2="Hay momentos en que la vida se siente abrumadora, pero eso no significa que no puedas avanzar."
              p3="Lo importante es contar con herramientas adecuadas que te orienten a salir de la parálisis."
              cta="Conoce las herramientas de Decide Fácil."
            />
            <AccordionItem
              index={2}
              title="¿Por qué no soy capaz de decidir como antes?"
              p1="Tu mente puede estar saturada y eso afecta tu capacidad de juicio."
              p2="Esto no significa que no tengas la capacidad, solo que necesitas un poco de apoyo."
              p3="Recuerda que con las herramientas apropiadas, puedes potenciar tu capacidad de decisión."
              cta="Descubre cómo Decide Fácil puede ser lo que necesitas."
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ SECTION 5: TRANSITION / OFFER ══════════ */}
      <section className="section" style={{ paddingBottom: 120 }}>
        <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
          <div className="reveal" style={{ marginBottom: 40 }}>
            <div className="badge" style={{ marginBottom: 28, display: "inline-flex" }}>
              <span style={{ width: 6, height: 6, background: "#FB923C", borderRadius: "50%" }} />
              <span style={{ color: "#FB923C" }}>Próximo paso</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 24,
                color: "var(--text-white)",
                lineHeight: 1.15,
              }}
            >
              Ahora que sabes tu estilo de decisión,{" "}
              <span style={{ color: "var(--sky)" }}>es hora de actuar</span>
            </h2>

            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                marginBottom: 20,
                maxWidth: 600,
                margin: "0 auto 20px",
              }}
            >
              Entender tu estilo de toma de decisiones es el primer paso hacia la
              mejora. Decide Fácil te ofrece un sistema práctico que te permitirá
              decidir sin culpa y recuperar tu confianza.
            </p>

            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                marginBottom: 48,
                maxWidth: 560,
                margin: "0 auto 48px",
              }}
            >
              Con Decide Fácil, recibirás herramientas prácticas que te ayudarán a
              simplificar tu toma de decisiones y a actuar de manera efectiva.
            </p>
          </div>

          <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <a
              href={HOTMART_LINK}
              className="btn-cta"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "1.1rem", padding: "18px 44px" }}
            >
              Accede a Decide Fácil ahora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>Acceso inmediato</span>
              <span style={{ color: "var(--glass-border)" }}>•</span>
              <span>Garantía de 7 días</span>
              <span style={{ color: "var(--glass-border)" }}>•</span>
              <span>Sin riesgo</span>
            </p>
          </div>

          {/* Feature highlights */}
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginTop: 64,
            }}
          >
            {[
              { icon: "🧠", label: "Claridad mental" },
              { icon: "⚡", label: "Tecnología moderna" },
              { icon: "🎯", label: "Resultados reales" },
              { icon: "🔒", label: "Sin riesgo" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card glass-card-hover"
                style={{ padding: "20px 16px", textAlign: "center" }}
              >
                <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--glass-border)",
          padding: "32px 24px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} Decide Fácil — Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
