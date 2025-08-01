'use client';

import { useState } from 'react';
import { createEvent } from '../lib/api';

export default function OpprettSkjema() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newEvent = await createEvent({
        // owner_id fjernet – bruker default i databasen
        title,
        description,
        location,
        is_public: true,
        language: 'no',
      });

      setSuccessMessage(`Arrangementet "${newEvent.title}" ble opprettet!`);
      setErrorMessage('');
      setTitle('');
      setDescription('');
      setLocation('');
    } catch (error: any) {
      setSuccessMessage('');
      setErrorMessage('Klarte ikke opprette arrangementet: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block font-semibold">Tittel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Sted</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Beskrivelse</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Opprett arrangement
      </button>

      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </form>
  );
}

