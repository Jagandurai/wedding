import { useEffect, useMemo, useState } from "react";
import "./gallerySection.css";

import g1 from "../assets/banner1.jpg";
import g2 from "../assets/cartoon2.jpeg";
import g3 from "../assets/cartoon3.jpeg";
import g5 from "../assets/cartoon4.jpeg";
import g4 from "../assets/banner2.jpg";
import g6 from "../assets/banner3.jpg";

export default function GallerySection() {
  const images = useMemo(() => [g1, g2, g3, g4, g5, g6], []);
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState("");

  const openLightbox = (src) => {
    setActiveSrc(src);
    setOpen(true);
  };

  const closeLightbox = () => {
    setOpen(false);
    setActiveSrc("");
  };

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="galleryWrap" id="gallery">
      <div className="galleryInner">
        <header className="galleryHead">
          <div className="galleryEyebrow">MEMORIES</div>
          <h2 className="galleryTitle">OUR GALLERY</h2>
          <p className="gallerySub">A few moments we cherish forever.</p>
        </header>

        <div className="galleryGrid">
          {/* Row 1: 1 small + 1 big */}
          <button className="gItem gSmall" onClick={() => openLightbox(images[0])} type="button">
            <img src={images[0]} alt="Gallery 1" loading="lazy" />
          </button>

          <button className="gItem gLarge" onClick={() => openLightbox(images[1])} type="button">
            <img src={images[1]} alt="Gallery 2" loading="lazy" />
          </button>

          {/* Row 2: 4 images */}
          <button className="gItem" onClick={() => openLightbox(images[2])} type="button">
            <img src={images[2]} alt="Gallery 3" loading="lazy" />
          </button>

          <button className="gItem" onClick={() => openLightbox(images[3])} type="button">
            <img src={images[3]} alt="Gallery 4" loading="lazy" />
          </button>

          <button className="gItem" onClick={() => openLightbox(images[4])} type="button">
            <img src={images[4]} alt="Gallery 5" loading="lazy" />
          </button>

          <button className="gItem" onClick={() => openLightbox(images[5])} type="button">
            <img src={images[5]} alt="Gallery 6" loading="lazy" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={closeLightbox}>
        <button
        className="lbClose"
        type="button"
        onClick={closeLightbox}
        aria-label="Close"
        >
        </button>

          <img
            className="lightboxImage"
            src={activeSrc}
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}