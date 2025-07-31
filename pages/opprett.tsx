
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Opprett() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('events').insert([{ name, location, date }]);
    if (error) {
      alert('Feil ved lagring: ' + error.message);
    } else {
      alert('Arrangement lagra!');
      setName('');
      setLocation('');
      setDate('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Opprett nytt arrangement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Namnet på arrangement:</label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Stad:</label><br />
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Dato:</label><br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">Lagre</button>
      </form>
    </div>
  );
}
