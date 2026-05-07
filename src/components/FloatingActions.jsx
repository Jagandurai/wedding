import { useEffect, useState } from "react";
import "./floatingActions.css";

const WA_ICON =
  "https://img.icons8.com/?size=100&id=16713&format=png&color=000000";
const TOP_ICON =
  "https://img.icons8.com/?size=100&id=63247&format=png&color=000000";

export default function FloatingActions({
  phone = "91 7826815439",
  message = "Hi! I came from your wedding website.",
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Always sanitize to digits only => 917826815439
  const phoneDigits = String(phone).replace(/\D/g, "");
  const text = encodeURIComponent(message);

  // Mobile works with wa.me, desktop works with web.whatsapp
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const waLink = isMobile
    ? `https://wa.me/${phoneDigits}?text=${text}`
    : `https://web.whatsapp.com/send?phone=${phoneDigits}&text=${text}`;

  return (
    <div className={`floatWrap ${show ? "show" : ""}`} aria-label="Floating actions">
      <a
        className="floatBtn floatWa"
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <img className="floatIcon waIcon" src={WA_ICON} alt="" aria-hidden="true" />
      </a>

      <button
        type="button"
        className="floatBtn floatTop"
        onClick={toTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <img className="floatIcon topIcon" src={TOP_ICON} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}