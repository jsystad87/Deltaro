import { supabase } from './supabase';

export async function createEvent(eventData: {
  owner_id: string;
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
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
