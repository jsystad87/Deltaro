import { createClient } from '@supabase/supabase-js';

// Henter miljøvariablene
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Oppretter Supabase-klienten
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funksjon for å opprette et nytt arrangement
export async function createEvent(eventData: {
  owner_id?: string;
  title: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  registration_start?: string;
  registration_end?: string;
  language?: string;
  is_public?: boolean;
  cost_description?: string;
  banner_image_url?: string;
  settings?: any;
}) {
  const finalData = {
    ...eventData,
    owner_id: eventData.owner_id ?? '00000000-0000-0000-0000-000000000000', // fallback til dummy UUID
  };

  const { data, error } = await supabase
    .from('events')
    .insert([finalData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
