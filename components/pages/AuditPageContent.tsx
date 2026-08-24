'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Check, Clock3, Mail, MapPin } from 'lucide-react';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { trackAuditEvent } from '@/lib/auditAnalytics';

interface AuditPageContentProps {
  formEnabled: boolean;
}

interface AuditFormState {
  businessName: string;
  cityArea: string;
  businessPresence: string;
  contactName: string;
  email: string;
  phone: string;
  privacyConsent: boolean;
  fax: string;
}

type ConfirmationState = {
  duplicate: boolean;
  emailStatus: 'pending' | 'sent' | 'failed' | 'delayed';
  isTest: boolean;
};

const INITIAL_FORM: AuditFormState = {
  businessName: '',
  cityArea: '',
  businessPresence: '',
  contactName: '',
  email: '',
  phone: '',
  privacyConsent: false,
  fax: '',
};

const REVIEW_POINTS = [
  ['Foto y vídeo', 'Cómo presenta el negocio su espacio, producto, servicio y personas.'],
  ['Redes sociales', 'Claridad, frecuencia y coherencia de la presencia que ya tienes.'],
  ['Ficha de Google', 'Fotos, reseñas, horarios y señales que ayudan a elegirte.'],
  ['Web móvil', 'Qué entiende alguien cuando llega desde su teléfono.'],
  ['Primera impresión', 'La confianza que transmite el conjunto en los primeros segundos.'],
  ['Siguiente prioridad', 'La mejora concreta que tendría más sentido abordar primero.'],
] as const;

export function AuditPageContent({ formEnabled }: AuditPageContentProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);
  const viewed = useRef(false);
  const started = useRef(false);
  const submissionInFlight = useRef(false);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackAuditEvent('audit_view', 'es');
  }, []);

  useEffect(() => {
    if (confirmation) confirmationHeading.current?.focus();
  }, [confirmation]);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackAuditEvent('audit_started', 'es');
  }

  function updateField(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function submitAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInFlight.current) return;

    submissionInFlight.current = true;
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/audit/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale: 'es' }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        duplicate?: boolean;
        emailStatus?: ConfirmationState['emailStatus'];
        isTest?: boolean;
      };

      if (!response.ok) {
        setError(
          data.error ||
            'No hemos podido registrar la solicitud. Revisa los campos e inténtalo de nuevo.'
        );
        return;
      }

      setConfirmation({
        duplicate: Boolean(data.duplicate),
        emailStatus: data.emailStatus || 'pending',
        isTest: Boolean(data.isTest),
      });
      setForm(INITIAL_FORM);
      trackAuditEvent('audit_submitted', 'es');
      trackAuditEvent('audit_confirmation_view', 'es');
    } catch {
      setError(
        'No hemos podido conectar con el servicio. Comprueba tu conexión e inténtalo de nuevo.'
      );
    } finally {
      submissionInFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-12 pt-16 text-white sm:px-8 md:px-12 md:pb-16 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <EditorialKicker muted>Auditoría gratuita</EditorialKicker>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Mira tu negocio como lo ve un cliente." />
          </h1>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            Reviso tu presencia digital y te entrego una lectura clara en 72 horas. Sin reunión previa,
            sin cuestionario largo y sin compromiso.
          </EditorialBody>
          <a
            href="#solicitud-auditoria"
            className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Pedir auditoría
          </a>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
          <PromiseCard icon={Clock3} title="Dos minutos">
            Solo necesito los datos básicos del negocio y su web o Instagram.
          </PromiseCard>
          <PromiseCard icon={Mail} title="En 72 horas">
            Recibes la auditoría por correo. No necesitas reservar una llamada.
          </PromiseCard>
          <PromiseCard icon={MapPin} title="Toledo">
            Si estás en Toledo, también puedo llevártela en persona.
          </PromiseCard>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Qué reviso</EditorialKicker>
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text="Lo que un cliente encuentra antes de elegirte." />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-3">
            {REVIEW_POINTS.map(([title, body], index) => (
              <article key={title} className="bg-white p-7 md:p-8">
                <span className="mb-6 block text-sm font-bold text-magenta">0{index + 1}</span>
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="leading-relaxed text-gray-700">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="solicitud-auditoria"
        className="scroll-mt-24 px-6 py-14 sm:px-8 md:px-12 md:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <EditorialKicker>Solicitud</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              <EditorialTitle text="Cuéntame dónde mirar." />
            </h2>
            <EditorialBody>
              Prepararé la auditoría manualmente con la información que compartas aquí. No hace falta
              que prepares documentación adicional.
            </EditorialBody>
            <ul className="mt-8 space-y-4 text-gray-700">
              {[
                'Auditoría gratuita y sin compromiso.',
                'Sin reunión obligatoria antes de empezar.',
                'Un único correo para confirmar la solicitud.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {confirmation ? (
            <AuditConfirmation
              confirmation={confirmation}
              headingRef={confirmationHeading}
            />
          ) : !formEnabled ? (
            <div
              role="status"
              className="border border-amber-300 bg-amber-50 p-7 text-amber-950 sm:p-10"
            >
              <h3 className="mb-4 text-2xl font-bold">Formulario temporalmente cerrado.</h3>
              <p className="leading-relaxed">
                Estamos preparando la apertura. Vuelve a esta página cuando se anuncie la
                activación.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submitAudit}
              onFocusCapture={markStarted}
              className="space-y-6 border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              aria-busy={submitting}
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="audit-fax">Fax</label>
                <input
                  id="audit-fax"
                  name="fax"
                  value={form.fax}
                  onChange={updateField}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error ? (
                <div role="alert" className="border border-red-300 bg-red-50 p-4 text-red-800">
                  {error}
                </div>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2">
                <AuditField
                  label="Nombre del negocio"
                  name="businessName"
                  value={form.businessName}
                  onChange={updateField}
                  autoComplete="organization"
                  required
                />
                <AuditField
                  label="Ciudad o zona"
                  name="cityArea"
                  value={form.cityArea}
                  onChange={updateField}
                  autoComplete="address-level2"
                  required
                />
              </div>

              <AuditField
                label="Web o Instagram"
                name="businessPresence"
                value={form.businessPresence}
                onChange={updateField}
                placeholder="tusitio.es o @tunegocio"
                inputMode="url"
                required
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <AuditField
                  label="Persona de contacto"
                  name="contactName"
                  value={form.contactName}
                  onChange={updateField}
                  autoComplete="name"
                  required
                />
                <AuditField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  required
                />
              </div>

              <AuditField
                label="Teléfono / WhatsApp (opcional)"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
              />

              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-gray-700">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={form.privacyConsent}
                  onChange={updateField}
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-magenta"
                />
                <span>
                  Solicito que HEYDE Studio tramite estos datos para preparar y entregar la
                  auditoría. He leído la{' '}
                  <Link href="/privacy" className="font-bold text-magenta underline underline-offset-2">
                    política de privacidad
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
              >
                {submitting ? 'Registrando solicitud…' : 'Pedir auditoría gratuita'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function PromiseCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock3;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white p-7 md:p-8">
      <Icon aria-hidden="true" className="mb-6 h-6 w-6 text-magenta" />
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <p className="leading-relaxed text-gray-700">{children}</p>
    </article>
  );
}

function AuditField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  required = false,
}: {
  label: string;
  name: keyof AuditFormState;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'url' | 'email' | 'tel';
  required?: boolean;
}) {
  const id = `audit-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-gray-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full rounded-sm border border-gray-300 px-4 py-3 text-base text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-magenta focus:ring-2 focus:ring-magenta/20"
      />
    </div>
  );
}

function AuditConfirmation({
  confirmation,
  headingRef,
}: {
  confirmation: ConfirmationState;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const emailMessage =
    confirmation.emailStatus === 'sent'
      ? 'Te hemos enviado un correo de confirmación.'
      : confirmation.emailStatus === 'delayed' || confirmation.emailStatus === 'failed'
          ? 'La confirmación por correo se ha retrasado. No hace falta que envíes otra solicitud.'
          : 'La confirmación por correo está pendiente.';

  return (
    <div role="status" className="border border-green-300 bg-green-50 p-7 sm:p-10">
      {confirmation.isTest ? (
        <p className="mb-5 inline-flex border border-amber-400 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-900">
          Solicitud de prueba
        </p>
      ) : null}
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-4 text-3xl font-bold text-green-950 outline-none"
      >
        {confirmation.duplicate ? 'La solicitud ya estaba registrada.' : 'Solicitud registrada.'}
      </h2>
      <p className="mb-3 leading-relaxed text-green-900">
        {emailMessage} Recibirás la auditoría en 72 horas.
      </p>
      <p className="leading-relaxed text-green-900">
        No necesitas reservar una llamada ni enviarnos más información ahora.
      </p>
      <p className="mt-3 leading-relaxed text-green-900">
        Revisaré tus redes, tu web y la ficha de Google Business cuando exista.
      </p>
    </div>
  );
}
