import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Opprett Supabase-klient
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventId } = req.query;

  if (!eventId || typeof eventId !== 'string') {
    return res.status(400).json({ error: 'Mangler eventId' });
  }

  if (req.method === 'GET') {
    // Hent form fields for arrangementet
    const { data, error } = await supabase
      .from('form_fields')
      .select('*')
      .eq('event_id', eventId)
      .order('field_order', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  // Andre metodar kan leggast til seinare (POST, PUT, DELETE)
  return res.status(405).json({ error: 'Metode ikke tillatt' });
}
