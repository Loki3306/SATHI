import { useMemo } from "react";
import { useAdminData } from "@/utils/useAdminData";
import { formatCurrency } from "@/utils/formatters";

const AdminFeeManagement = () => {
  const { payments } = useAdminData();

  const stats = useMemo(() => {
    const totals = {
      collected: 0,
      pending: 0,
      failed: 0,
    };

    payments.forEach((payment) => {
      if (payment.status === "completed") {
        totals.collected += payment.amount;
      } else if (payment.status === "pending") {
        totals.pending += payment.amount;
      } else if (payment.status === "failed") {
        totals.failed += payment.amount;
      }
    });

    const byFeeType = payments.reduce<Record<string, number>>((accumulator, payment) => {
      accumulator[payment.feeType] = (accumulator[payment.feeType] ?? 0) + payment.amount;
      return accumulator;
    }, {});

    return { totals, byFeeType };
  }, [payments]);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-primary">Fee Intelligence Center</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Track collections, pending dues and payment outcomes with UPI-ready reconciliation.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Collected</p>
          <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(stats.totals.collected)}</p>
        </div>
        <div className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(stats.totals.pending)}</p>
        </div>
        <div className="rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Failed</p>
          <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(stats.totals.failed)}</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-white/85 shadow-lg">
        <table className="min-w-full divide-y divide-border/60 text-left text-sm">
          <thead className="bg-muted/80 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 bg-white/80">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{payment.transactionId}</td>
                <td className="px-6 py-4 text-muted-foreground">{payment.studentId}</td>
                <td className="px-6 py-4 capitalize text-muted-foreground">{payment.feeType}</td>
                <td className="px-6 py-4 text-muted-foreground">{payment.paymentMethod}</td>
                <td className="px-6 py-4 font-semibold text-primary">{formatCurrency(payment.amount)}</td>
                <td className="px-6 py-4">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                    style={{
                      background:
                        payment.status === "completed"
                          ? "rgba(56, 189, 248, 0.12)"
                          : payment.status === "pending"
                          ? "rgba(251, 191, 36, 0.16)"
                          : "rgba(248, 113, 113, 0.16)",
                      color:
                        payment.status === "completed"
                          ? "#0f172a"
                          : payment.status === "pending"
                          ? "#92400e"
                          : "#991b1b",
                    }}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-3xl border border-border/70 bg-white/85 p-6 text-sm text-muted-foreground">
        <h3 className="text-lg font-semibold text-primary">Fee type allocation</h3>
        <ul className="mt-3 space-y-2">
          {Object.entries(stats.byFeeType).map(([feeType, amount]) => (
            <li key={feeType} className="flex items-center justify-between">
              <span className="capitalize">{feeType}</span>
              <span className="font-semibold text-primary">{formatCurrency(amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdminFeeManagement;
