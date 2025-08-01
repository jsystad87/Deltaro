'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  registration_end: string;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('registration_end', today)
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Feil ved henting av arrangement:', error.message);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kommande arrangement</h1>
      {loading ? (
        <p>Laster inn arrangement …</p>
      ) : events.length === 0 ? (
        <p>Ingen arrangement med open påmelding akkurat no.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.location}</p>
              <p>
                {new Date(event.start_date).toLocaleDateString()} –{' '}
                {new Date(event.end_date).toLocaleDateString()}
              </p>
              <Link
                href={`/arrangement/${event.id}`}
                className="text-blue-600 hover:underline mt-2 block"
              >
                Sjå detaljer / Meld deg på
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
