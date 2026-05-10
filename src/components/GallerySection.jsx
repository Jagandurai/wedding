import { useEffect, useMemo, useState } from "react";
import "./gallerySection.css";

import g1 from "../assets/banner1.jpg";
import g2 from "../assets/cartoon2.jpeg";
import g3 from "../assets/cartoon3.jpeg";
import g5 from "../assets/cartoon4.jpeg";
import g4 from "../assets/banner2.jpg";
import g6 from "../assets/banner3.jpg";

export default function GallerySection() {
  const images = useMemo(
    () => [
      { src: g1, alt: "Gallery 1", posClass: "imgDownSmall" },
      { src: g2, alt: "Gallery 2", posClass: "" },
      { src: g3, alt: "Gallery 3", posClass: "" },
      { src: g4, alt: "Gallery 4", posClass: "imgDownMedium" },
      { src: g5, alt: "Gallery 5", posClass: "imgDownSmall" },
      { src: g6, alt: "Gallery 6", posClass: "" },
    ],
    []
  );

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
          <button
            className="gItem gSmall"
            onClick={() => openLightbox(images[0].src)}
            type="button"
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              className={images[0].posClass}
              loading="lazy"
            />
          </button>

          <button
            className="gItem gLarge"
            onClick={() => openLightbox(images[1].src)}
            type="button"
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              className={images[1].posClass}
              loading="lazy"
            />
          </button>

          <button
            className="gItem"
            onClick={() => openLightbox(images[2].src)}
            type="button"
          >
            <img
              src={images[2].src}
              alt={images[2].alt}
              className={images[2].posClass}
              loading="lazy"
            />
          </button>

          <button
            className="gItem"
            onClick={() => openLightbox(images[3].src)}
            type="button"
          >
            <img
              src={images[3].src}
              alt={images[3].alt}
              className={images[3].posClass}
              loading="lazy"
            />
          </button>

          <button
            className="gItem"
            onClick={() => openLightbox(images[4].src)}
            type="button"
          >
            <img
              src={images[4].src}
              alt={images[4].alt}
              className={images[4].posClass}
              loading="lazy"
            />
          </button>

          <button
            className="gItem"
            onClick={() => openLightbox(images[5].src)}
            type="button"
          >
            <img
              src={images[5].src}
              alt={images[5].alt}
              className={images[5].posClass}
              loading="lazy"
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={closeLightbox}>
          <button
            className="lbClose"
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
          ></button>

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