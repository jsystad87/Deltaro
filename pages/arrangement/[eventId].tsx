'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function ArrangementPage() {
  const router = useRouter();
  const { eventId } = router.query;

  const [event, setEvent] = useState<any>(null);
  const [fields, setFields] = useState<any[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) return;
    fetchEvent();
    fetchFormFields();
  }, [eventId]);

  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();
    if (error) setError(error.message);
    else setEvent(data);
  };

  const fetchFormFields = async () => {
    const { data, error } = await supabase
      .from('form_fields')
      .select('*')
      .eq('event_id', eventId);
    if (error) setError(error.message);
    else setFields(data);
  };

  const handleChange = (fieldId: string, value: any) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from('submissions').insert([
      {
        event_id: eventId,
        data: formData,
      },
    ]);
    if (error) setError(error.message);
    else setSubmitted(true);
  };

  if (!event) return <p>Laster …</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="mb-4">{event.description}</p>

      {submitted ? (
        <p className="text-green-600">Takk for påmeldinga!</p>
      ) : (
        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block font-semibold">
                {field.label}
                {field.required && ' *'}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  className="border p-2 w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
              ) : (
                <input
                  type={field.type}
                  className="border p-2 w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Meld meg på
          </button>
        </form>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
