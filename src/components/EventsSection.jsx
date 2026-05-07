import "./eventsSection.css";

export default function EventsSection({ data }) {
  return (
    <section className="eventsWrap" id="events">
      <div className="eventsInner">

        <div
          className="eventsHead"
          data-aos="fade-up"
        >
          <div className="eventsEyebrow">{data.eyebrow}</div>

          <h2 className="eventsTitle">
            {data.title}
          </h2>

          <div className="eventsSub">
            {data.subtitle}
          </div>
        </div>

        <div className="eventsGrid">
          {data.cards.map((c, index) => (
            <div
              className="eventCard"
              key={c.name}
              data-aos={c.animation}
              data-aos-delay={index * 150}
            >
              <div className="eventIcon" aria-hidden="true">
                {c.icon}
              </div>

              <div className="eventName">
                {c.name}
              </div>

              <div className="eventDate">
                {c.date}
              </div>

              <div className="eventTime">
                {c.time}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}