'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function FormFieldEditor() {
  const router = useRouter();
  const { eventId } = router.query;
  const [fields, setFields] = useState<any[]>([]);
  const [label, setLabel] = useState('');
  const [type, setType] = useState('text');
  const [required, setRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) return;
    fetchFields();
  }, [eventId]);

  const fetchFields = async () => {
    const { data, error } = await supabase
      .from('form_fields')
      .select('*')
      .eq('event_id', eventId);
    if (error) {
      setError(error.message);
    } else {
      setFields(data);
    }
  };

  const handleAddField = async () => {
    setLoading(true);
    const { error } = await supabase.from('form_fields').insert([
      {
        event_id: eventId,
        label,
        type,
        required,
        settings: {},
      },
    ]);
    if (error) {
      setError(error.message);
    } else {
      setLabel('');
      setType('text');
      setRequired(false);
      fetchFields();
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Rediger skjema for arrangement</h2>

      {fields.length === 0 ? (
        <p>Ingen felt opprettet ennå.</p>
      ) : (
        <ul className="mb-4">
          {fields.map((field) => (
            <li key={field.id} className="border-b py-2">
              <strong>{field.label}</strong> ({field.type})
              {field.required && ' *'}
            </li>
          ))}
        </ul>
      )}

      <h3 className="font-semibold mb-2">Legg til nytt felt</h3>
      <div className="space-y-2">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="text">Tekst</option>
          <option value="textarea">Tekstområde</option>
          <option value="number">Tall</option>
          <option value="checkbox">Avkryssing</option>
        </select>

        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          Påkrevd
        </label>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddField}
          disabled={loading || !label}
        >
          Legg til felt
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
