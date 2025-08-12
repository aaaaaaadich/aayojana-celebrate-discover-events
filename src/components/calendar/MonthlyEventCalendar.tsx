import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Lightweight calendar event type used by FullCalendar
interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO date string (YYYY-MM-DD)
  location?: string | null;
  description?: string | null;
}

// Full event row for details modal
interface EventRow {
  id: string;
  title: string;
  description?: string | null;
  date: string; // ISO date string
  time?: string | null;
  location?: string | null;
  price?: number | null;
  qr_code_image_url?: string | null;
}

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
  const [fullEvents, setFullEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState(() => getMonthRange(new Date()));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const navigate = useNavigate();

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventRow[]>();
    for (const ev of fullEvents) {
      if (!ev?.date) continue;
      const key = ev.date.slice(0, 10);
      const arr = map.get(key) || [];
      arr.push(ev);
      map.set(key, arr);
    }
    return map;
  }, [fullEvents]);

  const fetchEvents = async (start: Date, end: Date) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, description, date, time, location, price, qr_code_image_url")
        .gte("date", toISODate(start))
        .lt("date", toISODate(end));

      if (error) throw error;

      const mapped: CalendarEvent[] = (data || [])
        .filter((row: any) => !!row.date)
        .map((row: any) => ({
          id: String(row.id),
          title: row.title,
          start: row.date,
          location: row.location ?? null,
          description: row.description ?? null,
        }));

      setEvents(mapped);
      setFullEvents((data as EventRow[]) || []);
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
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel("events-calendar-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "events" },
        (payload: any) => {
          const row = payload.new as EventRow;
          const iso = row?.date;
          if (iso && withinRange(iso, range.start, range.end)) {
            setEvents((prev) => [
              ...prev,
              {
                id: String(row.id),
                title: row.title,
                start: iso,
                location: row.location ?? null,
                description: row.description ?? null,
              },
            ]);
            setFullEvents((prev) => [...prev, row]);
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [range.start.getTime(), range.end.getTime()]);

  const handleEventClick = (arg: EventClickArg) => {
    const id = arg.event.id;
    const event = fullEvents.find(e => e.id === id);
    if (event) setSelectedEvent(event);
  };

  const onDatesSet = (arg: DatesSetArg) => {
    const { start, end } = getMonthRange(arg.start);
    setRange({ start, end });
  };

  const onDateClick = (arg: DateClickArg) => {
    setSelectedDate(toISODate(arg.date));
  };

  const closeModal = () => setSelectedDate(null);
  const closeEventModal = () => setSelectedEvent(null);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className={cn("rounded-xl shadow-lg p-4 md:p-6 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40")}>        
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          eventClick={handleEventClick}
          datesSet={onDatesSet}
          dateClick={onDateClick}
          headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
          dayCellClassNames={(info) => {
            const iso = toISODate(info.date);
            return eventsByDate.get(iso)?.length ? ["ring-1","ring-primary/30","rounded-md","bg-primary/5"] : [];
          }}
        />
        {loading && (
          <div className="mt-4 text-center text-muted-foreground text-sm">Loading events…</div>
        )}
      </div>

      {/* Details Modal for a specific day */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Events on {selectedDate}</DialogTitle>
            <DialogDescription>
              Browse events scheduled for this day. Select an event to view details and buy tickets.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedDate && (eventsByDate.get(selectedDate) || []).length === 0 && (
              <div className="text-sm text-muted-foreground">No events on this date.</div>
            )}

            {selectedDate && (eventsByDate.get(selectedDate) || []).map((ev) => (
              <article key={ev.id} className="rounded-lg border bg-card p-4">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg leading-snug">{ev.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {ev.time ? `${ev.time} • ` : ""}{ev.location || "Location TBA"}
                    </p>
                  </div>
                  {typeof ev.price === "number" && (
                    <div className="text-sm font-medium">NPR {Number(ev.price).toLocaleString()}</div>
                  )}
                </header>
                {ev.description && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{ev.description}</p>
                )}
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => navigate(`/events/${ev.id}`)}>
                    View details & Buy tickets
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && closeEventModal()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Event details and ticket information
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Date & Time</h4>
                  <p className="text-sm">{selectedEvent.date} {selectedEvent.time && `• ${selectedEvent.time}`}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Location</h4>
                  <p className="text-sm">{selectedEvent.location || "Location TBA"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Price</h4>
                  <p className="text-sm font-medium">
                    {typeof selectedEvent.price === "number" ? `NPR ${Number(selectedEvent.price).toLocaleString()}` : "Free"}
                  </p>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.qr_code_image_url && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Payment QR Code</h4>
                  <div className="flex justify-center">
                    <img 
                      src={selectedEvent.qr_code_image_url} 
                      alt="Payment QR Code" 
                      className="max-w-48 h-auto rounded-lg border"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={closeEventModal}>
                  Close
                </Button>
                <Button onClick={() => navigate(`/events/${selectedEvent.id}`)}>
                  Buy Tickets
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MonthlyEventCalendar;
