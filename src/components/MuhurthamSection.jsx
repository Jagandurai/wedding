import "./muhurthamSection.css";

export default function MuhurthamSection({ data }) {
  return (
    <section className="muhurtham">
      <div className="muhurtham-inner">
        <div className="m-eyebrow">{data.eyebrow}</div>
        <h2 className="m-title">{data.title}</h2>
        <div className="m-sub">{data.subtitle}</div>

        <div className="m-box">
          <div className="m-day">{data.day}</div>
          <div className="m-month">{data.month}</div>
          <div className="m-year">{data.year}</div>

          <div className="m-time">
            <span className="m-time-label">{data.timeLabel}</span>
            <span className="m-time-sep"> · </span>
            <span className="m-time-value">{data.timeValue}</span>
          </div>
        </div>

        <div className="m-ornament" aria-hidden="true">
          <span className="o-dot" />
          <span className="o-line" />
          <span className="o-dot" />
        </div>
      </div>
    </section>
  );
}