import { useEffect, useRef, useState } from "react";
import "./journeySection.css";

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}

export default function JourneySection({ data }) {
  const [wrapRef, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="journey" ref={wrapRef}>
      <div className="journey-inner">
        <header className={`journey-head ${inView ? "is-in" : ""}`}>
          <div className="journey-eyebrow">{data.eyebrow}</div>
          <h2 className="journey-title">{data.title}</h2>
          <p className="journey-sub">{data.subtitle}</p>
        </header>

        <div className="timelinePro" aria-label="Timeline">
          {data.timeline.map((t, i) => (
            <article
              key={`${t.date}-${t.title}-${i}`}
              className={`tlRow ${inView ? "is-in" : ""} ${i % 2 === 0 ? "left" : "right"}`}
              style={{ ["--d"]: `${i * 90}ms` }}
            >
              <div className="tlCard">
                <div className="tlDate">{t.date}</div>
                <div className="tlTitle">{t.title}</div>
                <div className="tlDesc">{t.desc}</div>
              </div>

              <div className="tlNode" aria-hidden="true">
                <span className="tlHeart">♥</span>
              </div>
            </article>
          ))}
        </div>

        <div className="journey-divider" aria-hidden="true" />
      </div>
    </section>
  );
}