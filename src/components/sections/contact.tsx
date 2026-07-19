"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/primitives/animated-section";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OWNER, SOCIAL_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

/**
 * Zod schema for the contact form. The same schema can be reused on a
 * future server action — keeping validation in one place is the whole
 * point of Zod.
 */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Tell me what to call you (2+ characters).")
    .max(80, "That's a long name. Keep it under 80 characters."),
  email: z
    .string()
    .min(1, "I'll need an email to reply.")
    .email("That doesn't look like a valid email."),
  subject: z
    .string()
    .min(3, "Add a short subject so I can prioritize.")
    .max(120, "Subjects work best under 120 characters."),
  message: z
    .string()
    .min(20, "Tell me a bit more — at least 20 characters.")
    .max(2000, "Keep it under 2000 characters — link to a doc if it's longer."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactSection() {
  const [submitState, setSubmitState] = React.useState<SubmitState>({
    status: "idle",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState({ status: "submitting" });
    try {
      // ────────────────────────────────────────────────────────────────
      // Pluggable contact transport.
      //
      // Swap this block for EmailJS, a Next.js route handler, a server
      // action, or a third-party form service — the rest of the form
      // (validation, UI states, accessibility) stays identical.
      // ────────────────────────────────────────────────────────────────
      await new Promise<void>((resolve, reject) => {
        // Simulate network latency for the demo. Replace with a real
        // transport (e.g. `emailjs.send(...)`) when wiring this up.
        window.setTimeout(() => {
          // Randomly succeed — keep this as `resolve` in production.
          if (Math.random() < 0.95) resolve();
          else reject(new Error("Network error. Please try again."));
        }, 1100);
      });

      setSubmitState({ status: "success" });
      reset();
    } catch (err) {
      setSubmitState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Section id="contact" spacing="xl" className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/4 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-accent-electric/8 blur-[120px]"
      />
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="08"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something
                  <span className="text-gradient"> worth shipping.</span>
                </>
              }
              description="Hiring for a senior frontend or platform role? Working on something interesting? Send a note — I read every message."
            />
          </AnimatedItem>

          <AnimatedItem className="mt-12">
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              {/* Left: meta panel */}
              <aside className="lg:col-span-4">
                <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-7">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      Direct line
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Prefer email? Reach me directly — I usually reply within a
                      day.
                    </p>
                  </div>

                  <a
                    href={`mailto:${OWNER.email}`}
                    className="group inline-flex items-center gap-3 rounded-xl border border-border bg-foreground/[0.02] p-3 transition-colors hover:border-accent-electric/40"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-electric/10 text-accent-electric">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                        Email
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {OWNER.email}
                      </span>
                    </span>
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-foreground/[0.02] p-3">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        Location
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        {OWNER.location}
                      </div>
                    </div>
                    <div className="rounded-xl border border-border bg-foreground/[0.02] p-3">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Timezone
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        IST · UTC+5:30
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="mt-auto">
                    <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Elsewhere
                    </h4>
                    <ul className="space-y-1.5">
                      {SOCIAL_LINKS.filter((s) => s.id !== "resume").map(
                        (link) => {
                          const Icon = link.icon;
                          return (
                            <li key={link.id}>
                              <a
                                href={link.href}
                                target={
                                  link.href.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
                              >
                                <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent-electric" />
                                <span className="font-medium">
                                  {link.label}
                                </span>
                                {link.handle ? (
                                  <span className="ml-auto text-xs text-muted-foreground">
                                    {link.handle}
                                  </span>
                                ) : null}
                              </a>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Right: form */}
              <div className="lg:col-span-8">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-8">
                  <AnimatePresence mode="wait">
                    {submitState.status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex min-h-[420px] flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-emerald/15 text-accent-emerald"
                        >
                          <CheckCircle2 className="h-8 w-8" />
                        </motion.div>
                        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                          Message received.
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                          Thanks for reaching out. I&apos;ll get back to you at
                          the email you provided — usually within a day.
                        </p>
                        <div className="mt-6 flex gap-3">
                          <Button
                            variant="outline"
                            size="md"
                            magnetic={false}
                            onClick={() => setSubmitState({ status: "idle" })}
                          >
                            Send another
                          </Button>
                          <Button
                            variant="ghost"
                            size="md"
                            magnetic={false}
                            onClick={() =>
                              document
                                .getElementById("home")
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            Back to top
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="grid gap-5 sm:grid-cols-2"
                      >
                        <Field
                          label="Your name"
                          htmlFor="name"
                          error={errors.name?.message}
                        >
                          <Input
                            id="name"
                            placeholder="Karan Verma"
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                          />
                        </Field>

                        <Field
                          label="Email"
                          htmlFor="email"
                          error={errors.email?.message}
                        >
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            {...register("email")}
                          />
                        </Field>

                        <Field
                          label="Subject"
                          htmlFor="subject"
                          error={errors.subject?.message}
                          className="sm:col-span-2"
                        >
                          <Input
                            id="subject"
                            placeholder="Senior Frontend role — let's chat"
                            aria-invalid={!!errors.subject}
                            {...register("subject")}
                          />
                        </Field>

                        <Field
                          label="Message"
                          htmlFor="message"
                          error={errors.message?.message}
                          className="sm:col-span-2"
                        >
                          <Textarea
                            id="message"
                            rows={6}
                            placeholder="Tell me about the role, the team, and what you're trying to build…"
                            aria-invalid={!!errors.message}
                            {...register("message")}
                          />
                        </Field>

                        <div className="sm:col-span-2">
                          {submitState.status === "error" ? (
                            <div
                              role="alert"
                              className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                            >
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>{submitState.message}</span>
                            </div>
                          ) : null}

                          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-muted-foreground">
                              Protected by Zod validation. No spam, ever.
                            </p>
                            <Button
                              type="submit"
                              variant="accent"
                              size="lg"
                              magnetic={false}
                              disabled={submitState.status === "submitting"}
                              className="w-full sm:w-auto"
                            >
                              {submitState.status === "submitting" ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Sending…
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4" />
                                  Send message
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </Container>
    </Section>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={htmlFor}
        className="text-xs font-medium text-foreground/80"
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
