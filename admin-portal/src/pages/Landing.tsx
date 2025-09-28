import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Lock, Zap } from "lucide-react";

const keyHighlights = [
  {
    title: "Unified Government Compliance",
    description: "NAAC, NBA and AISHE ready reports auto-generated with AI validation logs and audit trails.",
  },
  {
    title: "Blockchained Student Identity",
    description: "Every student is assigned a tamper-proof digital identity with on-chain verification tokens.",
  },
  {
    title: "AI-Augmented Administration",
    description: "Document verification, anomaly detection and predictive fee analytics in real-time dashboards.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#edf2f7] to-[#dce7f5]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-12">
        <header className="grid items-center gap-12 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" /> Smart College ERP 2025
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Two intelligent portals orchestrating the future of college governance
            </h1>
            <p className="text-lg leading-7 text-muted-foreground sm:text-xl">
              Integrate student services, administrative compliance, AI document checks, fee intelligence and blockchain-based identities within a single, secure ecosystem built for Indian higher education mandates.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-slate-400/30 transition hover:bg-primary/95"
              >
                Explore Admin Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/student/register"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary"
              >
                Begin Student Registration
                <Lock className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              {["AI Document Verification", "Blockchain Identity", "UPI-GST Ready"].map((feature) => (
                <span key={feature} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="relative isolate -mx-6 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:mx-0 lg:p-10">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Strategic Snapshot</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Govt-ready insights at a glance</h2>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Registrations</dt>
                  <dd className="mt-2 text-3xl font-semibold text-primary">4,982</dd>
                  <p className="mt-2 text-xs text-muted-foreground">Real-time sync with document verification and fee approvals.</p>
                </div>
                <div className="rounded-2xl border border-border bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Fee Compliance</dt>
                  <dd className="mt-2 text-3xl font-semibold text-primary">₹12.7 Cr</dd>
                  <p className="mt-2 text-xs text-muted-foreground">Automated reconciliation &amp; GST-ready receipt generation.</p>
                </div>
                <div className="rounded-2xl border border-border bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Hostel Utilisation</dt>
                  <dd className="mt-2 text-3xl font-semibold text-primary">92%</dd>
                  <p className="mt-2 text-xs text-muted-foreground">Live occupancy data across blocks with vacancy alerts.</p>
                </div>
                <div className="rounded-2xl border border-border bg-white/80 p-4">
                  <dt className="text-xs uppercase tracking-[0.35em] text-muted-foreground">AI Verifications</dt>
                  <dd className="mt-2 text-3xl font-semibold text-primary">98.4%</dd>
                  <p className="mt-2 text-xs text-muted-foreground">OCR + rule-engine backed validation across document types.</p>
                </div>
              </dl>
            </div>
          </div>
        </header>
        <section className="grid gap-6 rounded-3xl border border-border bg-white/75 p-8 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:grid-cols-3">
          {keyHighlights.map((item) => (
            <article key={item.title} className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-white to-slate-50/60 p-6">
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Landing;
