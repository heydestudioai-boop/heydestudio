'use client';

import { useState } from 'react';
import { calculateCustomerEquivalent } from '@/lib/planEquivalence';

export function PlanEquivalence({ price, priceLabel }: { price: number; priceLabel: string }) {
  const [value, setValue] = useState('');
  const equivalent = calculateCustomerEquivalent(price, value);
  const invalid = value.trim() !== '' && equivalent === null;

  return (
    <section aria-labelledby="plan-equivalence-title" className="mt-10 border-t border-gray-200 pt-8">
      <div className="grid max-w-4xl gap-6 md:grid-cols-2">
        <div>
          <h3 id="plan-equivalence-title" className="text-xl font-bold">Una cuenta orientativa · Crecimiento</h3>
          <label htmlFor="customer-value" className="mb-3 mt-4 block text-sm font-medium">
            ¿Cuánto te deja de media un cliente nuevo?
          </label>
          <div className="flex max-w-xs items-center gap-3">
            <input
              id="customer-value"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              maxLength={12}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              aria-describedby="plan-equivalence-note plan-equivalence-result"
              aria-invalid={invalid || undefined}
              className="min-h-11 w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-base"
            />
            <span aria-label="euros">EUR</span>
          </div>
        </div>
        <div className="self-end text-sm leading-relaxed">
          <p id="plan-equivalence-result" aria-live="polite" aria-atomic="true" className="font-bold">
            {equivalent !== null
              ? `Para cubrir ${priceLabel}, necesitarías ${equivalent.toLocaleString('es-ES')} clientes de ese valor.`
              : invalid ? 'Introduce un importe mayor que cero, con un máximo de dos decimales.'
                : 'Introduce un importe para ver la equivalencia de coste.'}
          </p>
          <p className="mt-2 text-gray-700">Precio de lista sin IVA dividido entre tu importe. Redondeo al cliente entero superior.</p>
          <p id="plan-equivalence-note" className="mt-2 text-gray-700">
            Es solo una equivalencia de coste, no una estimación de resultados. El importe no se guarda ni se envía.
          </p>
        </div>
      </div>
    </section>
  );
}
