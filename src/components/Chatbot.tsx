import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  X,
  Send,
  MessageSquare,
  Loader2,
  AlertTriangle,
  MessageCircle,
  RotateCw,
} from 'lucide-react';
import { site, whatsappLink } from '../data/site';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hello and welcome to Nazora Creative Studios. I'm your virtual assistant, here to help you explore our services, compare website packages, understand our production rates, and find the best way to get started. What can I help you with today?",
};

const SUGGESTIONS = [
  'How much does a website cost?',
  'Compare your Bronze, Silver, and Gold packages.',
  'Tell me about your AI and automation services.',
  'How do I book podcast production?',
  'Do you offer church media consulting?',
  'How can I contact your team?',
];

const STORAGE_KEY = 'nazora-assistant-history';
const MAX_HISTORY = 30;

type ChatState = 'idle' | 'loading' | 'error' | 'unconfigured';

function loadHistory(): ChatMessage[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [WELCOME];
    return parsed.filter(
      (m): m is ChatMessage =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    );
  } catch {
    return [WELCOME];
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
  } catch {
    /* storage unavailable — history stays in memory for this session */
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [status, setStatus] = useState<ChatState>('idle');
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    saveHistory(messages);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || status === 'loading') return;

      const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question }];
      setMessages(nextMessages);
      setInput('');
      setStatus('loading');
      setErrorMessage('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages.slice(-12) }),
        });

        if (response.status === 503) {
          setStatus('unconfigured');
          return;
        }

        if (response.status === 429) {
          setStatus('error');
          setErrorMessage('You have sent several messages quickly. Please wait a moment and try again.');
          return;
        }

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: unknown = await response.json();
        const reply =
          data && typeof data === 'object' && typeof (data as { reply?: unknown }).reply === 'string'
            ? ((data as { reply: string }).reply as string)
            : '';

        if (!reply.trim()) throw new Error('Empty reply');

        setMessages((current) => [...current, { role: 'assistant', content: reply.trim() }]);
        setStatus('idle');
      } catch {
        setStatus('error');
        setErrorMessage(
          'I could not reach the assistant just now. You can try again, or contact the team directly.',
        );
      }
    },
    [messages, status],
  );

  const clearChat = () => {
    setMessages([WELCOME]);
    setStatus('idle');
    setErrorMessage('');
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* Launcher ------------------------------------------------------- */}
      <div className="fixed bottom-6 right-5 z-40 md:bottom-8 md:right-8">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={open ? 'Close the Nazora AI Assistant' : 'Open the Nazora AI Assistant'}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold shadow-[0_14px_34px_-12px_rgba(8,20,38,0.75)] ring-1 ring-gold/35 transition-all duration-300 hover:scale-105 hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold md:h-16 md:w-16"
        >
          {open ? <X size={22} /> : <MessageSquare size={22} />}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-70" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-electric ring-2 ring-navy" />
            </span>
          )}
        </button>
      </div>

      {/* Panel ---------------------------------------------------------- */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Nazora AI Assistant"
          className="fixed inset-x-4 bottom-24 z-40 flex max-h-[70vh] flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_40px_90px_-30px_rgba(8,20,38,0.6)] sm:inset-x-auto sm:right-8 sm:w-[390px] md:bottom-28"
        >
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden bg-navy px-5 py-4 text-white">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-electric/25 blur-2xl"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30">
                  <Bot size={19} />
                </span>
                <div>
                  <p className="font-display text-[0.98rem] font-semibold">Nazora AI Assistant</p>
                  <p className="text-[0.7rem] tracking-wide text-white/55">
                    Answers about services, packages &amp; rates
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear the conversation"
                  className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <RotateCw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    launcherRef.current?.focus();
                  }}
                  aria-label="Close the assistant"
                  className="rounded-full p-2 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[0.86rem] leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-navy text-white'
                      : 'rounded-bl-md border border-navy/8 bg-white text-ink/85 shadow-[0_2px_10px_-6px_rgba(8,20,38,0.35)]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {status === 'loading' && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-navy/8 bg-white px-4 py-3 shadow-[0_2px_10px_-6px_rgba(8,20,38,0.35)]">
                  <span className="flex gap-1">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-electric" style={{ animationDelay: '0ms' }} />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-electric" style={{ animationDelay: '150ms' }} />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-electric" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span className="text-xs text-muted">
                    <Loader2 size={12} className="mr-1 inline animate-spin" />
                    Nazora is thinking…
                  </span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-start gap-2 rounded-2xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-[0.82rem] text-amber-900">
                <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            {status === 'unconfigured' && (
              <div className="rounded-2xl border border-navy/10 bg-white px-4 py-4">
                <p className="font-display text-[0.9rem] font-semibold text-navy">
                  The live assistant is not connected yet
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/70">
                  The AI service has not been configured for this deployment. You can still get an
                  accurate answer from the team right now.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={whatsappLink(
                      'Hello Nazora Creative Studios. I have a question about your services and would like to discuss a possible project.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-display text-[0.82rem] font-semibold text-white transition-colors hover:bg-[#1fbb59]"
                  >
                    <MessageCircle size={15} />
                    Chat on WhatsApp
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-full border border-navy/20 px-4 py-2.5 font-display text-[0.82rem] font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                  >
                    Send an enquiry instead
                  </Link>
                </div>
              </div>
            )}

            {(messages.length <= 1 || status !== 'idle') && status !== 'loading' && status !== 'unconfigured' && (
              <div className="pt-1">
                <p className="mb-2 px-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => send(question)}
                      className="rounded-full border border-navy/15 bg-white px-3 py-2 text-left text-[0.76rem] leading-tight text-ink/75 transition-all duration-300 hover:border-electric hover:text-electric"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-navy/8 bg-white px-3 py-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about services, packages, rates…"
              autoComplete="off"
              maxLength={600}
              className="min-w-0 flex-1 rounded-full border border-navy/12 bg-surface px-4 py-2.5 text-[0.86rem] text-ink placeholder:text-muted focus:border-electric focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading' || input.trim().length === 0}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric text-white transition-all duration-300 hover:bg-[#1b53ec] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>

          <p className="shrink-0 bg-white px-4 pb-3 text-center text-[0.66rem] leading-snug text-muted">
            Automated answers use approved {site.name} information. For confirmed terms, speak to the
            team on{' '}
            <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" className="underline">
              WhatsApp
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
}
