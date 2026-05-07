import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "./components/Banner";
import CoupleSection from "./components/CoupleSection";
import EventsSection from "./components/EventsSection";
import VenueSection from "./components/VenueSection";
import JourneySection from "./components/JourneySection";
import MessageFormSection from "./components/MessageFormSection";
import MuhurthamSection from "./components/MuhurthamSection";
import FinalFooter from "./components/FinalFooter";
import ScrollIntro from "./components/ScrollIntro";
import GallerySection from "./components/GallerySection";
import FloatingActions from "./components/FloatingActions";

import { bannerData } from "./data/bannerData";
import { coupleSectionData } from "./data/coupleSectionData";
import { eventsData } from "./data/eventsData";
import { venueData } from "./data/venueData";
import { journeyData } from "./data/journeyData";
import { messageFormData } from "./data/messageFormData";
import { muhurthamData } from "./data/muhurthamData";
import { finalFooterData } from "./data/finalFooterData";
import { introData } from "./data/introData";

export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;

    AOS.init({
      once: true,
      duration: 700,
      offset: 90,
      easing: "ease-out",
    });

    // if content loads later, refresh positions
    AOS.refresh();
  }, [opened]);

  if (!opened) {
    return (
      <>
        <Toaster position="top-center" />
        <ScrollIntro data={introData} onOpen={() => setOpened(true)} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <Banner data={bannerData} />
      <CoupleSection data={coupleSectionData} />

      <EventsSection data={eventsData} />
      <MuhurthamSection data={muhurthamData} />
      <VenueSection data={venueData} />
      <JourneySection data={journeyData} />

      <GallerySection />
      <MessageFormSection data={messageFormData} />
      <FinalFooter data={finalFooterData} />

      <FloatingActions
        phone="91 7826815439"
        message="Hi Ajay, I saw your wedding invite!"
      />
    </>
  );
}