import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, AlertCircle, Loader2, MessageCircle, ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { packages } from '../data/packages';
import { site, whatsappLink } from '../data/site';

const ENQUIRY_ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

const budgets = [
  'Under KSh 20,000',
  'KSh 20,000 – KSh 50,000',
  'KSh 50,000 – KSh 150,000',
  'Above KSh 150,000',
  'Not sure yet',
];

const timelines = ['As soon as possible', 'Within 2–4 weeks', 'Within 1–3 months', 'Exploring options'];

const contactMethods = ['Email', 'Phone', 'WhatsApp'] as const;

type Errors = Partial<Record<string, string>>;

function buildWhatsAppMessage(data: FormState) {
  const selectedServices = services
    .filter((service) => data.services.includes(service.id))
    .map((service) => service.title)
    .join(', ');

  const lines = [
    'Hello Nazora Creative Studios. I would like to enquire about a project.',
    '',
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
  ];
  if (data.phone) lines.push(`Phone / WhatsApp: ${data.phone}`);
  if (data.company) lines.push(`Company / organisation: ${data.company}`);
  lines.push(`Service(s): ${selectedServices}`);
  if (data.package) lines.push(`Website package: ${data.package}`);
  if (data.budget) lines.push(`Estimated budget: ${data.budget}`);
  if (data.timeline) lines.push(`Timeline: ${data.timeline}`);
  lines.push(`Preferred contact method: ${data.preferredContact}`);
  lines.push('', 'Project details:', data.description);
  return lines.join('\n');
}

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  package: string;
  budget: string;
  timeline: string;
  description: string;
  preferredContact: (typeof contactMethods)[number];
};

const emptyState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  services: [],
  package: '',
  budget: '',
  timeline: '',
  description: '',
  preferredContact: 'Email',
};

const fieldBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-[0.92rem] text-ink placeholder:text-muted/80 transition-colors duration-300 focus:outline-none';

function fieldClass(error?: string) {
  return error
    ? `${fieldBase} border-red-400 focus:border-red-500`
    : `${fieldBase} border-navy/12 focus:border-electric`;
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(emptyState);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error' | 'fallback'>('idle');
  const [reviewMessage, setReviewMessage] = useState('');

  const presetService = searchParams.get('service');
  const presetPackage = searchParams.get('package');

  useEffect(() => {
    setForm((current) => {
      const next = { ...current };
      if (presetService && services.some((service) => service.id === presetService)) {
        next.services = Array.from(new Set([...current.services, presetService]));
      }
      if (presetPackage) {
        const match = packages.find(
          (pkg) => pkg.id.toLowerCase() === presetPackage.toLowerCase(),
        );
        if (match) next.package = match.name;
      }
      return next;
    });
  }, [presetService, presetPackage]);

  const packageRelevant = useMemo(
    () => form.services.includes('web-design') || form.services.includes('web-development'),
    [form.services],
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (state === 'error' || state === 'success') setState('idle');
  };

  const toggleService = (id: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(id)
        ? current.services.filter((value) => value !== id)
        : [...current.services, id],
    }));
    setErrors((current) => ({ ...current, services: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (form.services.length === 0) next.services = 'Please select at least one service.';
    if (!form.description.trim()) {
      next.description = 'Please describe what you would like to build.';
    } else if (form.description.trim().length < 20) {
      next.description = 'A little more detail will help us prepare a relevant response.';
    }
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    const message = buildWhatsAppMessage(form);

    if (!ENQUIRY_ENDPOINT) {
      // No delivery provider is configured, so we do not claim the enquiry was sent.
      setReviewMessage(message);
      setState('fallback');
      return;
    }

    setState('submitting');
    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setState('success');
      setForm(emptyState);
    } catch {
      setReviewMessage(message);
      setState('error');
    }
  };

  /* ------------------------------------------------------------------ */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="field-fullName" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
            Full name <span className="text-electric">*</span>
          </label>
          <input
            id="field-fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(event) => update('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'error-fullName' : undefined}
            placeholder="Jane Wanjiru"
            className={fieldClass(errors.fullName)}
          />
          {errors.fullName && (
            <p id="error-fullName" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-red-600">
              <AlertCircle size={13} /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-email" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
            Email address <span className="text-electric">*</span>
          </label>
          <input
            id="field-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            placeholder="you@company.co.ke"
            className={fieldClass(errors.email)}
          />
          {errors.email && (
            <p id="error-email" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-red-600">
              <AlertCircle size={13} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-phone" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
            Phone or WhatsApp number <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="field-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            placeholder="+254 …"
            className={fieldClass()}
          />
        </div>

        <div>
          <label htmlFor="field-company" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
            Company or organisation <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="field-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(event) => update('company', event.target.value)}
            placeholder="Your organisation"
            className={fieldClass()}
          />
        </div>
      </div>

      {/* Services */}
      <fieldset aria-describedby={errors.services ? 'error-services' : undefined}>
        <legend className="mb-3 block font-display text-[0.82rem] font-semibold text-navy">
          Service required <span className="text-electric">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((service) => {
            const active = form.services.includes(service.id);
            return (
              <button
                key={service.id}
                id={service.id === 'web-design' ? 'field-services' : undefined}
                type="button"
                onClick={() => toggleService(service.id)}
                aria-pressed={active}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.85rem] transition-all duration-300 ${
                  active
                    ? 'border-electric bg-electric/6 text-navy shadow-[0_10px_24px_-18px_rgba(40,100,255,0.9)]'
                    : 'border-navy/12 bg-white text-ink/75 hover:border-navy/35'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    active ? 'border-electric bg-electric text-white' : 'border-navy/25 bg-white'
                  }`}
                >
                  {active && <Check size={13} strokeWidth={3} />}
                </span>
                <service.icon size={16} className={active ? 'text-electric' : 'text-muted'} />
                <span className="leading-snug">{service.title}</span>
              </button>
            );
          })}
        </div>
        {errors.services && (
          <p id="error-services" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-red-600">
            <AlertCircle size={13} /> {errors.services}
          </p>
        )}
      </fieldset>

      {/* Package */}
      <div>
        <label htmlFor="field-package" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
          Website package
          {!packageRelevant && (
            <span className="ml-2 font-normal text-muted">
              (relevant for web design and development)
            </span>
          )}
        </label>
        <select
          id="field-package"
          value={form.package}
          onChange={(event) => update('package', event.target.value)}
          className={fieldClass()}
        >
          <option value="">Not decided</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.name}>
              {pkg.name} — {pkg.priceLabel}
            </option>
          ))}
          <option value="Not sure">Not sure yet</option>
          <option value="Not applicable">Not applicable</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="field-budget" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
            Estimated budget <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id="field-budget"
            value={form.budget}
            onChange={(event) => update('budget', event.target.value)}
            className={fieldClass()}
          >
            <option value="">Prefer not to say</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="field-timeline" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
            Project timeline <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id="field-timeline"
            value={form.timeline}
            onChange={(event) => update('timeline', event.target.value)}
            className={fieldClass()}
          >
            <option value="">Select a timeline</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="field-description" className="mb-2 block font-display text-[0.82rem] font-semibold text-navy">
          Project description <span className="text-electric">*</span>
        </label>
        <textarea
          id="field-description"
          rows={6}
          value={form.description}
          onChange={(event) => update('description', event.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'error-description' : 'hint-description'}
          placeholder="Tell us what you are building, who it is for, and what a successful outcome looks like."
          className={`${fieldClass(errors.description)} resize-y`}
        />
        <p id="hint-description" className="mt-2 text-[0.75rem] text-muted">
          The more context you share, the more relevant our response will be.
        </p>
        {errors.description && (
          <p id="error-description" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-red-600">
            <AlertCircle size={13} /> {errors.description}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 block font-display text-[0.82rem] font-semibold text-navy">
          Preferred contact method
        </legend>
        <div className="flex flex-wrap gap-3">
          {contactMethods.map((method) => (
            <label
              key={method}
              className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-[0.85rem] transition-all duration-300 ${
                form.preferredContact === method
                  ? 'border-navy bg-navy text-white'
                  : 'border-navy/12 bg-white text-ink/75 hover:border-navy/35'
              }`}
            >
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={form.preferredContact === method}
                onChange={() => update('preferredContact', method)}
                className="sr-only"
              />
              <span
                className={`h-2 w-2 rounded-full ${
                  form.preferredContact === method ? 'bg-gold' : 'bg-navy/25'
                }`}
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      {/* States ------------------------------------------------------- */}
      {state === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
        >
          <Check size={18} className="mt-0.5 shrink-0 text-emerald-600" />
          <p className="text-[0.88rem] leading-relaxed text-emerald-900">
            Thank you — your enquiry has been submitted successfully. The Nazora team will review it
            and respond using your preferred contact method.
          </p>
        </div>
      )}

      {state === 'error' && (
        <div
          role="alert"
          className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-[0.88rem] leading-relaxed text-amber-900"
        >
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle size={16} /> The enquiry could not be submitted
          </p>
          <p className="mt-1">
            Something interrupted the submission, so your details have <strong>not</strong> been
            sent. Please review the prepared WhatsApp message below, or try again.
          </p>
        </div>
      )}

      {state === 'fallback' && (
        <div
          role="status"
          className="rounded-2xl border border-navy/12 bg-surface px-5 py-5"
        >
          <p className="font-display text-[0.95rem] font-semibold text-navy">
            Your enquiry is ready to send
          </p>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink/72">
            Online form delivery is not yet configured for this deployment, so nothing has been
            submitted from this page. Review your details below and send them to the team on
            WhatsApp — you will be able to edit the message before it goes out.
          </p>
          <textarea
            readOnly
            value={reviewMessage}
            rows={8}
            aria-label="Review your enquiry message before sending"
            className="mt-4 w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-[0.82rem] leading-relaxed text-ink/80 focus:outline-none"
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(reviewMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-display text-[0.88rem] font-semibold text-white transition-colors hover:bg-[#1fbb59]"
            >
              <MessageCircle size={16} />
              Send on WhatsApp
            </a>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                'Project enquiry',
              )}&body=${encodeURIComponent(reviewMessage)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 px-6 py-3 font-display text-[0.88rem] font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Send by email
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="btn btn-primary w-full !py-4 sm:w-auto sm:self-start"
        >
          {state === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            'Send Enquiry'
          )}
        </button>
        <p className="text-[0.82rem] leading-relaxed text-muted">
          Your enquiry will help us understand your needs and prepare a more relevant response.
        </p>
      </div>
    </form>
  );
}
