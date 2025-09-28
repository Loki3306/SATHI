const presetReports = [
  {
    title: "Government Compliance Digest",
    description:
      "Consolidated AISHE + NAAC dataset with enrolment, infrastructure, faculty ratio and outcome indicators.",
    frequency: "Monthly",
  },
  {
    title: "Financial Health Statement",
    description:
      "Fee collection versus outstanding dues with GST-ready export and payment gateway reconciliation.",
    frequency: "Fortnightly",
  },
  {
    title: "Hostel Allocation Ledger",
    description: "Occupancy, vacancy, maintenance tickets and hostel-specific fee collection summary.",
    frequency: "Weekly",
  },
];

const AdminReports = () => {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-primary">Reports &amp; Exports</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate data-backed artefacts for government audits, governing councils and finance committees.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        {presetReports.map((report) => (
          <article key={report.title} className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{report.frequency}</p>
            <h3 className="mt-3 text-lg font-semibold text-primary">{report.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{report.description}</p>
            <button className="mt-5 inline-flex items-center justify-center rounded-full border border-primary/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Export Snapshot
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminReports;
