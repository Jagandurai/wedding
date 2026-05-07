import { useEffect, useMemo, useRef, useState } from "react";
import "./scrollIntro.css";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function ScrollIntro({ data, onOpen }) {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [burst, setBurst] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const distance = data.scrollDistance ?? 700;
  const percent = useMemo(() => Math.round(progress * 100), [progress]);

  const introRef = useRef(null);
  const touchStartYRef = useRef(0);
  const openedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  const finishIfNeeded = (next, prev) => {
    if (next >= 1 && prev < 1 && !openedRef.current) {
      openedRef.current = true;

      setBurstKey((k) => k + 1);
      setBurst(true);

      setTimeout(() => setBurst(false), 1100);
      setTimeout(() => onOpen?.(), 1600);
    }
  };

  // lock page scroll behind intro (important for iOS)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;

    // Desktop wheel
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;

      setProgress((p) => {
        const next = clamp(p + delta / distance, 0, 1);
        finishIfNeeded(next, p);
        return next;
      });
    };

    // iOS/Android touch
    const onTouchStart = (e) => {
      touchStartYRef.current = e.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (e) => {
      // Must be passive:false to allow preventDefault on iOS Safari
      e.preventDefault();

      const y = e.touches?.[0]?.clientY ?? 0;
      const dy = touchStartYRef.current - y; // swipe up => positive
      touchStartYRef.current = y;

      setProgress((p) => {
        const next = clamp(p + dy / distance, 0, 1);
        finishIfNeeded(next, p);
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [distance, onOpen]);

  const leftStart = isMobile ? -140 : -90;
  const rightStart = isMobile ? 140 : 90;
  const leftEnd = isMobile ? -10 : 0;
  const rightEnd = isMobile ? 18 : 8;

  const leftX = `${leftStart + (leftEnd - leftStart) * progress}%`;
  const rightX = `${rightStart + (rightEnd - rightStart) * progress}%`;

  const sparks = Array.from({ length: 18 }, (_, i) => i);
  const bubbles = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div ref={introRef} className="intro">
      <div className="intro-bg" />
      <div className="intro-vignette" />

      <div className="intro-center">
        <div className="intro-top">{data.titleTop}</div>
        <div className="intro-main">{data.titleMain}</div>
        <div className="intro-hint">{data.hint}</div>

        <div className="intro-bar">
          <div className="intro-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="intro-percent">{percent}%</div>
      </div>

      <img
        className="intro-img left"
        src={data.brideImage}
        alt="Bride"
        style={{ transform: `translateX(${leftX})` }}
        draggable={false}
      />

      <img
        className="intro-img right bigRight"
        src={data.groomImage}
        alt="Groom"
        style={{ transform: `translateX(${rightX})` }}
        draggable={false}
      />

      {burst ? (
        <div key={burstKey} className="burst show" aria-hidden="true">
          <div className="burst-heart">♥</div>

          {sparks.map((i) => (
            <span
              key={`s-${i}`}
              className="spark"
              style={{
                ["--x"]: `${(Math.random() * 220 - 110).toFixed(0)}px`,
                ["--y"]: `${(Math.random() * -200 - 30).toFixed(0)}px`,
              }}
            />
          ))}

          {bubbles.map((i) => (
            <span
              key={`b-${i}`}
              className="bubble"
              style={{
                ["--bx"]: `${(Math.random() * 200 - 100).toFixed(0)}px`,
                ["--by"]: `${(Math.random() * -220 - 40).toFixed(0)}px`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}