
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
}

export default function Arrangement() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Feil ved henting av arrangement:', error);
      } else {
        setEvents(data || []);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Arrangement</h1>
      {events.length === 0 ? (
        <p>Ingen arrangement funne.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.name}</strong> – {event.date} i {event.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
