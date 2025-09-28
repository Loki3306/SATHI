import { useAdminData } from "@/utils/useAdminData";
import { formatPercent } from "@/utils/formatters";

const statusColorMap: Record<string, string> = {
  verified: "text-emerald-600",
  pending: "text-amber-500",
  rejected: "text-rose-500",
};

const AdminVerification = () => {
  const { documents } = useAdminData();

  const statusGroups = documents.reduce<Record<string, number>>((accumulator, document) => {
    accumulator[document.verificationStatus] = (accumulator[document.verificationStatus] ?? 0) + 1;
    return accumulator;
  }, {});

  const averageConfidence =
    documents.filter((document) => document.verificationStatus === "verified").reduce((total, document) => total + document.confidence, 0) /
      Math.max(documents.filter((document) => document.verificationStatus === "verified").length, 1) || 0;

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-primary">AI Verification Center</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Document OCR results, confidence scores and manual override readiness for compliance teams.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(statusGroups).map(([status, count]) => (
          <div key={status} className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{status}</p>
            <p className={`mt-2 text-2xl font-semibold capitalize ${statusColorMap[status] ?? "text-primary"}`}>{count} records</p>
          </div>
        ))}
        <div className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Confidence</p>
          <p className="mt-2 text-2xl font-semibold text-primary">{formatPercent(averageConfidence || 0)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Average for verified documents</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-white/85 shadow-lg">
        <table className="min-w-full divide-y divide-border/60 text-left text-sm">
          <thead className="bg-muted/80 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Document</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Extracted Text</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 bg-white/80">
            {documents.map((document) => (
              <tr key={document.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="font-semibold text-primary">{document.documentType.toUpperCase()}</div>
                  <div className="text-xs text-muted-foreground">{document.id}</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{document.studentId}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{document.extractedText}</td>
                <td className="px-6 py-4 font-semibold text-primary">{formatPercent(document.confidence)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    statusColorMap[document.verificationStatus] ?? "text-primary"
                  }`}
                  >
                    {document.verificationStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminVerification;
