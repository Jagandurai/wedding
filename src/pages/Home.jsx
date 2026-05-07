import { useState } from "react";
import InvitationCard from "../components/InvitationCard";
import Section from "../components/Section";
import { siteData } from "../data/siteData";
import { EventCard, FacilityCard } from "../components/EventCard";

export default function Home() {
  const [opened, setOpened] = useState(false);

  const { couple, events, facilities } = siteData;

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800">
      {!opened ? (
        <InvitationCard onOpen={() => setOpened(true)} />
      ) : (
        <>
          {/* Header */}
          <header className="py-10">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <p className="text-rose-700 font-semibold tracking-widest uppercase text-xs">
                Wedding Invitation
              </p>
              <h1 className="mt-3 text-4xl font-extrabold">
                {couple.groom} & {couple.bride}
              </h1>
              <p className="mt-3 text-slate-600">
                {couple.date} • {couple.city}
              </p>
            </div>
          </header>

          {/* Events */}
          <Section
            title="Events"
            subtitle="All functions with time, date, and venue details."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((e) => (
                <EventCard key={e.title} {...e} />
              ))}
            </div>
          </Section>

          {/* Facilities */}
          <Section
            title="Facilities"
            subtitle="Everything available at the venue for guests."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((f) => (
                <FacilityCard key={f.title} {...f} />
              ))}
            </div>
          </Section>

          <footer className="py-10">
            <div className="max-w-5xl mx-auto px-6 text-center text-sm text-slate-600">
              Next step: RSVP form + Gallery + Google Map + Deploy
            </div>
          </footer>
        </>
      )}
    </div>
  );
}