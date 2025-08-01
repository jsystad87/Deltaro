// pages/skjema/[eventId].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FormFieldEditor from '../../Components/FormFieldEditor';

export default function SkjemaEditor() {
  const router = useRouter();
  const { eventId } = router.query;
  const [fields, setFields] = useState([]);

  // TODO: hent felter via fetch('/api/skjema/'+eventId)
  // TODO: vis liste og inkluder <FormFieldEditor> for nytt felt

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1>Bygg skjema for arrangement {eventId}</h1>
      <Link href={`/arrangement/${eventId}`}>Se arrangementsiden</Link>
      {/* Vis eksisterende felt */}
      {/* Vis editor for nytt felt */}
    </div>
  );
}
