import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import "@fullcalendar/daygrid/index.css";

// Lightweight calendar event type
interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string (YYYY-MM-DD)
  location?: string | null;
  description?: string | null;
}

// Replace with your Supabase project details
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co"; // TODO: replace
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY"; // TODO: replace

const supabaseCalendar: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const toISODate = (d: Date) => d.toISOString().slice(0, 10);

const getMonthRange = (anchor: Date) => {
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1); // exclusive
  return { start, end };
};

const withinRange = (iso: string, start: Date, end: Date) => {
  const d = new Date(iso + "T00:00:00");
  return d >= start && d < end;
};

export const MonthlyEventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState(() => getMonthRange(new Date()));
  const channelRef = useRef<ReturnType<typeof supabaseCalendar.channel> | null>(null);

  const fetchEvents = async (start: Date, end: Date) => {
    setLoading(true);
    try {
      const { data, error } = await supabaseCalendar
        .from("events")
        .select("id, title, description, event_date, location, created_at, date")
        .gte("event_date", toISODate(start))
        .lt("event_date", toISODate(end));

      if (error) throw error;

      const mapped: CalendarEvent[] = (data || []).map((row: any) => ({
        id: String(row.id),
        title: row.title,
        date: row.event_date || row.date, // fallback if using different schema
        location: row.location ?? null,
        description: row.description ?? null,
      })).filter((e) => !!e.date);

      setEvents(mapped);
    } catch (e) {
      console.error("Failed to load events:", e);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when range changes
  useEffect(() => {
    fetchEvents(range.start, range.end);
  }, [range.start.getTime(), range.end.getTime()]);

  // Realtime: listen for new events and update if in current range
  useEffect(() => {
    // Clean previous channel
    if (channelRef.current) {
      supabaseCalendar.removeChannel(channelRef.current);
    }

    const channel = supabaseCalendar
      .channel("events-calendar-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "events" },
        (payload: any) => {
          const row = payload.new;
          const iso = row?.event_date || row?.date;
          if (iso && withinRange(iso, range.start, range.end)) {
            setEvents((prev) => [
              ...prev,
              {
                id: String(row.id),
                title: row.title,
                date: iso,
                location: row.location ?? null,
                description: row.description ?? null,
              },
            ]);
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channel) supabaseCalendar.removeChannel(channel);
    };
  }, [range.start.getTime(), range.end.getTime()]);

  const handleEventClick = (arg: EventClickArg) => {
    const { title, startStr, extendedProps } = arg.event;
    const location = (extendedProps as any)?.location || "Unknown location";
    const date = startStr?.slice(0, 10);
    alert(`${title}\nDate: ${date}\nLocation: ${location}`);
  };

  const onDatesSet = (arg: DatesSetArg) => {
    // arg.start is beginning of visible range; compute month boundaries from that date
    const { start, end } = getMonthRange(arg.start);
    setRange({ start, end });
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className={cn("rounded-xl shadow-lg p-4 md:p-6 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40")}>        
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          eventClick={handleEventClick}
          datesSet={onDatesSet}
          headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
        />
        {loading && (
          <div className="mt-4 text-center text-muted-foreground text-sm">Loading events…</div>
        )}
      </div>
    </section>
  );
};

export default MonthlyEventCalendar;
