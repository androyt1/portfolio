import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

import { resumeChatPromptSuggestions } from '@/data/resume-knowledge';
import { siteContent } from '@/data/portfolio';
import { useDeviceProfile } from '@/hooks/use-device-profile';

interface Citation {
  id: string;
  section: string;
  title: string;
}

interface ChatMessage {
  citations?: Citation[];
  content: string;
  id: string;
  role: 'assistant' | 'user';
}

const starterMessage: ChatMessage = {
  content:
    "Ask about Andrew's senior frontend work, AI experience, key projects, or why he would be a strong fit for a role.",
  id: 'starter',
  role: 'assistant',
};

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    content,
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
  };
}

export function ResumeChatWidget() {
  const { allowViewportMotion, coarsePointer, smallViewport } = useDeviceProfile();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
  const messagesViewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      behavior: allowViewportMotion ? 'smooth' : 'auto',
      top: viewport.scrollHeight,
    });
  }, [allowViewportMotion, messages]);

  useEffect(() => {
    if (!isOpen || !textareaRef.current) {
      return;
    }

    textareaRef.current.focus();
  }, [isOpen]);

  const submitMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isPending) {
      return;
    }

    const userMessage = createMessage('user', trimmed);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft('');
    setError(null);
    setIsPending(true);

    try {
      const response = await fetch('/api/chat', {
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.id !== starterMessage.id)
            .map((message) => ({
              content: message.content,
              role: message.role,
            })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const rawPayload = await response.text();
      const payload = (
        response.headers.get('content-type')?.includes('application/json') && rawPayload
          ? JSON.parse(rawPayload)
          : {}
      ) as {
        answer?: string;
        citations?: Citation[];
        error?: string;
      };

      if (!response.ok || !payload.answer) {
        throw new Error(
          payload.error ??
            (response.status === 404
              ? 'Resume chat is only available from the Vercel deployment, not the raw Vite dev server.'
              : 'The assistant could not answer right now.'),
        );
      }

      const answer = payload.answer;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          citations: payload.citations,
          content: answer,
          id: `assistant-${Date.now()}`,
          role: 'assistant',
        },
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'The chat service is temporarily unavailable.',
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitMessage(draft);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    await submitMessage(draft);
  };

  const panelWidthClass = smallViewport ? 'w-[calc(100vw-1.5rem)]' : 'w-[25rem]';

  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-50 sm:bottom-5 sm:left-5">
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.section
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`surface-strong pointer-events-auto flex max-h-[min(36rem,calc(100vh-5rem))] flex-col overflow-hidden rounded-[1.9rem] bg-[#08111a]/96 ${panelWidthClass}`}
            exit={{ opacity: 0, scale: 0.98, y: 14 }}
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={
              allowViewportMotion
                ? { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0 }
            }
          >
            <div className="border-b border-white/10 px-4 py-4 sm:px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="border-secondary-soft bg-secondary-soft text-secondary-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.28em]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Resume AI Brief
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-white">
                    Chat with Andrew&apos;s resume
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Answers stay grounded in the uploaded resume and portfolio profile.
                  </p>
                </div>

                <button
                  aria-label="Close resume chat"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/64">
                <FileText className="text-secondary-soft h-3.5 w-3.5" />
                <span>Source locked to resume.pdf</span>
              </div>
            </div>

            <div
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
              ref={messagesViewportRef}
            >
              {messages.length === 1 ? (
                <div className="grid gap-2">
                  {resumeChatPromptSuggestions.map((prompt) => (
                    <button
                      className="rounded-[1.2rem] border border-white/12 bg-white/[0.07] px-4 py-3 text-left text-sm leading-6 text-white/88 transition hover:border-[#0d9488]/28 hover:bg-white/[0.11] hover:text-white"
                      key={prompt}
                      onClick={() => void submitMessage(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              {messages.map((message) => {
                const isAssistant = message.role === 'assistant';

                return (
                  <div
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                    key={message.id}
                  >
                    <div
                      className={`max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-6 ${
                        isAssistant
                          ? 'border border-white/12 bg-white/[0.07] text-white/88'
                          : 'bg-white text-slate-950'
                      }`}
                    >
                      <p>{message.content}</p>

                      {isAssistant && message.citations?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.citations.map((citation) => (
                            <span
                              className="rounded-full border border-[#0d9488]/28 bg-[#0d9488]/12 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-teal-100"
                              key={`${message.id}-${citation.id}`}
                            >
                              {citation.title}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {isPending ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-[1.4rem] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm text-white/80">
                    <LoaderCircle className="h-4 w-4 animate-spin text-teal-200" />
                    Thinking through the resume…
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="rounded-[1.35rem] border border-rose-300/18 bg-rose-300/8 px-4 py-3 text-sm leading-6 text-rose-100/88">
                  {error}
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-4 py-4 sm:px-5">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="rounded-[1.4rem] border border-white/10 bg-black/18 p-3">
                  <textarea
                    className="max-h-28 min-h-20 w-full resize-none border-0 bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/48"
                    disabled={isPending}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => void handleKeyDown(event)}
                    placeholder="Ask about frontend leadership, AI work, project impact, or fit for a role."
                    ref={textareaRef}
                    rows={3}
                    value={draft}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <a
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/60 transition hover:text-teal-200"
                    href={`mailto:${siteContent.email}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Prefer email
                  </a>

                  <button
                    className="border-secondary-soft inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--secondary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f766e] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/14 disabled:text-white/52"
                    disabled={!draft.trim() || isPending}
                    type="submit"
                  >
                    Send
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        animate={{ opacity: 1, y: 0 }}
        aria-label="Open resume chat"
        className="pointer-events-auto mt-3 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-[#0b121c]/94 text-white shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-colors hover:border-[#0d9488]/28 hover:bg-[#101925]"
        initial={{ opacity: 0, y: 14 }}
        onClick={() => setIsOpen(true)}
        transition={
          allowViewportMotion
            ? { delay: coarsePointer ? 0 : 0.35, duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0 }
        }
        type="button"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-white shadow-[0_10px_24px_rgba(13,148,136,0.22)]">
          <MessageSquareText className="h-4.5 w-4.5" />
        </span>
      </motion.button>
    </div>
  );
}
