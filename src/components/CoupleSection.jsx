import "./coupleSection.css";

export default function CoupleSection({ data }) {
  return (
    <section className="couple">
      <div className="couple-inner">
        <div className="couple-top">
          <span className="line" />
          <span className="diamond" aria-hidden="true" />
          <span className="label">{data.topLabel}</span>
          <span className="diamond" aria-hidden="true" />
          <span className="line" />
        </div>

        <div className="couple-grid">
          <div className="person">
            <div className="avatarRing">
              <img className="avatar" src={data.bride.avatar} alt={data.bride.name} />
            </div>
            <div className="role">{data.bride.role}</div>
            <div className="name">{data.bride.name}</div>
          </div>

          <div className="ampersand" aria-hidden="true">
            &
          </div>

          <div className="person">
            <div className="avatarRing">
              <img className="avatar" src={data.groom.avatar} alt={data.groom.name} />
            </div>
            <div className="role">{data.groom.role}</div>
            <div className="name">{data.groom.name}</div>
          </div>
        </div>

        <div className="divider" />

        <p className="msg">{data.message}</p>

        <div className="flowers" aria-hidden="true">
          🌸 🌺 🌼 🌸 🌺 🌼 🌺 🌼
        </div>
      </div>
    </section>
  );
}