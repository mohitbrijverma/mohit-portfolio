import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  HeartPulse,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chemisto Case Study | Mohit Verma",
  description:
    "A privacy-conscious overview of Mohit Verma’s contribution to Chemisto, an online pharmacy and doctor-supported healthcare product.",
};

const capabilities = [
  {
    icon: Workflow,
    title: "Product workflows",
    description:
      "Translating practical requirements into understandable customer and operational experiences.",
  },
  {
    icon: PackageCheck,
    title: "Healthcare commerce",
    description:
      "Contributing to dependable product discovery, ordering and supporting commerce workflows.",
  },
  {
    icon: HeartPulse,
    title: "Doctor-supported care",
    description:
      "Supporting responsible digital experiences where healthcare assistance forms part of the customer journey.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable execution",
    description:
      "Connecting implementation, testing and deployment with the needs of a growing product.",
  },
] as const;

export default function ChemistoCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#F0F8F7] text-[#172121]">
      <header className="border-b border-[#BFDCD8] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition-opacity hover:opacity-65"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to portfolio
          </Link>

          <a
            href="https://chemisto.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#0F766E] px-4 py-2 text-sm font-semibold text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white"
          >
            Visit website
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
                  Selected work · 01
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-[#0F766E]"
                />
              </div>

              <div className="mt-8">
                <span
                  className="inline-block text-5xl font-bold leading-none tracking-[-0.065em] text-[#0F766E] sm:text-6xl lg:text-7xl"
                  style={{
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  Chemisto
                </span>
              </div>

              <h1 className="mt-7 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                Learning through the responsibility of building a real
                healthcare product.
              </h1>
            </div>

            <div className="border-l-2 border-[#0F766E] pl-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Public overview
              </p>

              <p className="mt-4 text-base leading-7 text-[#5F6F6D]">
                Chemisto is an organizational online pharmacy product with
                doctor-supported healthcare experiences. This case study
                presents only a limited, public view of my contribution.
              </p>
            </div>
          </div>

          <div className="mt-14 grid border-y border-[#BFDCD8] sm:grid-cols-3">
            <div className="border-b border-[#BFDCD8] py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0F766E]">
                Product type
              </p>

              <p className="mt-2 font-semibold">
                Healthcare commerce
              </p>
            </div>

            <div className="border-b border-[#BFDCD8] py-6 sm:border-b-0 sm:border-r sm:px-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0F766E]">
                Contribution
              </p>

              <p className="mt-2 font-semibold">
                Product and technical execution
              </p>
            </div>

            <div className="py-6 sm:px-6 sm:pr-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0F766E]">
                Status
              </p>

              <p className="mt-2 font-semibold">
                An evolving product
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E3F2F0] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
                My contribution
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                Connecting requirements with responsible implementation.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#4E6562]">
                My work contributes to turning product requirements into
                usable digital workflows across customer-facing and
                operational experiences. It involves understanding the
                problem, shaping an appropriate solution and following the
                work through implementation, testing and improvement.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F6F6D]">
                This is collaborative organizational work. The product and its
                outcomes are not presented as my sole creation or ownership.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-[#BFDCD8] bg-[#BFDCD8] sm:grid-cols-2">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="bg-[#F0F8F7] p-6 sm:p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#D5EBE8] text-[#0F766E]">
                    <Icon size={20} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 text-xl font-semibold">
                    {capability.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#5F6F6D]">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <article>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
              What it taught me
            </p>

            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
              Real products require judgment beyond writing code.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#5F6F6D]">
              Working on an evolving product has strengthened my ability to
              ask clearer questions, understand dependencies, consider the
              people affected by a decision and treat implementation as part
              of a larger product responsibility.
            </p>
          </article>

          <article className="border border-[#BFDCD8] bg-white/55 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#D5EBE8] text-[#0F766E]">
                <LockKeyhole size={19} aria-hidden="true" />
              </span>

              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                  Privacy and attribution
                </p>

                <h2 className="mt-4 text-2xl font-semibold">
                  Intentionally limited by design.
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#5F6F6D]">
                  This page contains only general, non-confidential
                  information suitable for a public portfolio. It does not
                  disclose internal architecture, private integrations,
                  credentials, customer information, medical information,
                  organizational data or confidential implementation details.
                </p>

                <p className="mt-4 text-sm leading-6 text-[#5F6F6D]">
                  Chemisto remains an organizational product. This page
                  describes my contribution without claiming ownership of the
                  complete product or the work of other contributors.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="bg-[#115E59] px-5 py-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/65">
              One chapter of a continuing journey
            </p>

            <p className="mt-3 text-xl font-semibold">
              Built through practical learning and responsibility.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-65"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Selected work
            </Link>

            <a
              href="https://chemisto.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-65"
            >
              Visit Chemisto
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}