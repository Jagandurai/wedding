import "./finalFooter.css";

export default function FinalFooter({ data }) {
  return (
    <footer className="final">
      <div className="final-inner">
        <div className="final-flowers" aria-hidden="true">
          {data.flowerRow.map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>

        <h2 className="final-names">
          <span>{data.leftName}</span>
          <span className="final-heart" aria-hidden="true">{data.heart}</span>
          <span>{data.rightName}</span>
        </h2>

        <div className="final-divider">
          <span className="miniFlower" aria-hidden="true">❀</span>
        </div>

        <div className="final-quote">
          {data.quoteLines.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>

        <div className="final-bottom">{data.bottomLine}</div>

        <div className="final-dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span className="big" />
          <span />
          <span />
          <span />
        </div>
      </div>
    </footer>
  );
}