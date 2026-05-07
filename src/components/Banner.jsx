import { useEffect, useRef, useState } from "react";
import "./banner.css";

export default function Banner({ data }) {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.6;
  }, []);

  const toggleMusic = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (!on) {
        await a.play();
        setOn(true);
      } else {
        a.pause();
        setOn(false);
      }
    } catch {
      setOn(false);
    }
  };

  return (
    <header className="banner">
      {/* IMPORTANT:
         Remove inline backgroundImage so CSS media queries can switch images */}
      <div className="banner-bg" />

      <div className="banner-overlay" />

      <div className="banner-content">
        <div className="banner-top">{data.titleTop}</div>
        <h1 className="banner-title">{data.couple}</h1>
        <div className="banner-date">{data.dateText}</div>
        <div className="scroll-indicator" aria-hidden="true" />
      </div>

      {/*
      <button className="music-btn" onClick={toggleMusic} aria-label="Toggle music">
        {on ? "🔊" : "🔇"}
      </button>
      */}

      <audio ref={audioRef} src={data.musicSrc} loop />
    </header>
  );
}