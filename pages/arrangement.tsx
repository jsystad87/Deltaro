'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string | null;
};

export default function ArrangementListe() {
  const [arrangementer, setArrangementer] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hentArrangement = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, description, location, start_date')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setArrangementer(data);
      }
    };

    hentArrangement();
  }, []);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Alle arrangement</h1>

      {error && <p className="text-red-600">Feil: {error}</p>}

      {arrangementer.length === 0 ? (
        <p>Ingen arrangement oppretta ennå.</p>
      ) : (
        <ul className="space-y-4">
          {arrangementer.map((arr) => (
            <li key={arr.id} className="border border-gray-300 rounded p-4">
              <h2 className="text-xl font-semibold">{arr.title}</h2>
              {arr.description && <p className="text-gray-700">{arr.description}</p>}
              {arr.location && <p className="text-sm text-gray-500">Sted: {arr.location}</p>}
              {arr.start_date && <p className="text-sm text-gray-500">Start: {new Date(arr.start_date).toLocaleString()}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

