'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const { eventId } = router.query;

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) return;
    fetchSubmissions();
  }, [eventId]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setSubmissions(data);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Innsendingar for arrangement {eventId}</h1>

      {loading && <p>Laster inn …</p>}
      {error && <p className="text-red-600">Feil: {error}</p>}
      {!loading && submissions.length === 0 && <p>Ingen innsendingar funne.</p>}

      <ul className="space-y-4">
        {submissions.map((submission) => (
          <li key={submission.id} className="border p-4 rounded">
            <p className="text-gray-500 text-sm mb-2">
              Sendt inn: {new Date(submission.created_at).toLocaleString()}
            </p>
            <ul className="list-disc pl-6">
              {Object.entries(submission.data).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>: {value?.toString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
