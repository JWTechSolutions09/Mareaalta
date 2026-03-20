import React, { useState } from "react";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-2xl">
      <h2 className="heading-serif text-3xl text-[var(--ma-black)] mb-6">Contacto</h2>
      <p className="text-neutral-600 mb-6">
        Escríbenos y te responderemos a la brevedad. También puedes contactarnos por Instagram o WhatsApp.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <a
          className="card p-4 hover:shadow-md transition-shadow"
          href="https://instagram.com/mareaalta.rd"
          target="_blank"
          rel="noreferrer"
        >
          <p className="font-semibold">Instagram</p>
          <p className="text-sm text-neutral-600">@mareaalta.rd</p>
        </a>
        <a
          className="card p-4 hover:shadow-md transition-shadow"
          href="https://wa.me/18292605027"
          target="_blank"
          rel="noreferrer"
        >
          <p className="font-semibold">WhatsApp</p>
          <p className="text-sm text-neutral-600">1-829-260-5027</p>
        </a>
      </div>
      <div className="card p-4 space-y-3">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="w-full rounded border px-3 py-2 h-32 resize-none"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="btn-primary">Enviar</button>
          <a
            className="btn-outline"
            href={`https://wa.me/18292605027?text=${encodeURIComponent(`Hola, soy ${name}. ${message}`)}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp directo
          </a>
        </div>
      </div>
    </div>
  );
};
