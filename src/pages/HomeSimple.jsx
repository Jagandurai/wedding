import "./homeSimple.css";

export default function HomeSimple() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="names">RAJEEV</h1>
          <div className="amp">&</div>
          <h1 className="names">NEENA</h1>
          <button className="btn">Open Invitation</button>
        </div>
      </section>

      {/* STORY / ROMANCE */}
      <section className="card">
        <div className="grid2">
          <div className="photoTall">
            {/* replace with your image */}
            <img
              src="https://images.unsplash.com/photo-1523438097201-512ae7d59cfc?auto=format&fit=crop&w=800&q=60"
              alt="couple"
            />
            <div className="monoTag">R&N</div>
          </div>

          <div className="textBox">
            <h2>A WHIRLWIND ROMANCE</h2>
            <p>
              Add your short story here. Keep it 3–5 lines just like the sample.
              This section is perfect for a simple intro about the couple.
            </p>
            <p className="small">
              You can add date / venue lines here as well.
            </p>
          </div>
        </div>
      </section>

      {/* CEREMONY */}
      <section className="card">
        <div className="grid2 reverse">
          <div className="textBox">
            <h2>JOIN THEIR INTIMATE CEREMONY</h2>
            <p>
              Date: 12 Dec 2026 <br />
              Time: 10:00 AM <br />
              Venue: Your Venue Name
            </p>
            <a
              className="link"
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </div>

          <div className="photoWide">
            <img
              src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=60"
              alt="couple ceremony"
            />
          </div>
        </div>
      </section>

      {/* FOOTER INVITE */}
      <section className="footerInvite">
        <h2>THEY'RE EXCITED TO SEE YOU THERE!</h2>
        <p className="small">
          RSVP by: 01 Dec 2026 • Contact: +91-XXXXXXXXXX
        </p>
        <button className="btn outline">RSVP</button>
      </section>
    </div>
  );
}