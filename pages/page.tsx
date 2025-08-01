"use client";

import OpprettSkjema from "../Components/OpprettSkjema";

export default function OpprettSide() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Opprett nytt arrangement</h1>
      <OpprettSkjema />
    </main>
  );
}
