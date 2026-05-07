import "./venueSection.css";

export default function VenueSection({ data }) {
  return (
    <section className="venueWrap" aria-labelledby="venue-title">
      <header className="venueHead">
        <div className="venueEyebrow">{data.eyebrow}</div>
        <h2 className="venueTitle" id="venue-title">{data.title}</h2>
        <p className="venueSub">{data.subtitle}</p>
      </header>

      <div className="venueCard">
        <div className="venueCardInner">
          <h3 className="venueName">{data.venueName}</h3>

          <div className="venueAddr">
            {data.lines.map((t, i) => (
              <p className="venueAddrLine" key={`${t}-${i}`}>{t}</p>
            ))}
          </div>

          <div className="venueActions">
            <a
              className="venueBtn"
              href={data.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="pin" aria-hidden="true">📍</span>
              {data.buttonText}
            </a>
          </div>
        </div>
      </div>

      <div className="venueDivider" aria-hidden="true" />
    </section>
  );
}