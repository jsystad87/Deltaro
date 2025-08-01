'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // sørg for at denne fila finst
import { useRouter } from 'next/router';

interface FormField {
  id: string;
  event_id: string;
  label: string;
  type: string;
  required: boolean;
  order: number;
}

export default function FormFieldEditor() {
  const router = useRouter();
  const { eventId } = router.query;

  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId || typeof eventId !== 'string') return;

    const fetchFields = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('form_fields')
        .select('*')
        .eq('event_id', eventId)
        .order('order');

      if (error) {
        setError('Klarte ikke hente skjemafelt: ' + error.message);
      } else {
        setFields(data);
      }
      setLoading(false);
    };

    fetchFields();
  }, [eventId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rediger skjema</h2>

      {loading && <p>Laster inn...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2">
          {fields.map((field) => (
            <li
              key={field.id}
              className="border rounded p-2 bg-gray-100 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{field.label}</p>
                <p className="text-sm text-gray-600">
                  Type: {field.type} – {field.required ? 'Påkrevd' : 'Valgfritt'}
                </p>
              </div>
              <p className="text-sm text-gray-500">Rekkefølge: {field.order}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
