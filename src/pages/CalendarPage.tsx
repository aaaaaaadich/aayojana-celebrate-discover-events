import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import MonthlyEventCalendar from "@/components/calendar/MonthlyEventCalendar";

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const { hasRole } = useUserRoles();
  const isAttendee = !!user && hasRole("attendee");

  return (
    <>
      <Helmet>
        <title>Event Calendar | Aayojana</title>
        <meta name="description" content="Browse monthly event calendar on Aayojana. View events by date and location in a clean day grid month view." />
        <link rel="canonical" href="/calendar" />
      </Helmet>
      <main>
        <header className="container mx-auto px-4 pt-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Event Calendar</h1>
          <p className="mt-2 text-muted-foreground">Discover events by date with live updates.</p>
        </header>
        {isAttendee ? (
          <MonthlyEventCalendar />
        ) : (
          <section className="container mx-auto px-4 py-16">
            <div className="rounded-xl border bg-card p-8 text-center">
              <p className="text-lg">Please sign in as an attendee to view the calendar.</p>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default CalendarPage;
