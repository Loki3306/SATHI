import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAdminData } from "@/utils/useAdminData";
import { formatCurrency, formatNumber } from "@/utils/formatters";

const STATUS_COLORS: Record<string, string> = {
  approved: "#1ABC9C",
  pending: "#F59E0B",
  rejected: "#EF4444",
};

const FEE_COLORS = ["#3498DB", "#1ABC9C", "#F59E0B", "#A855F7"];

const AdminDashboard = () => {
  const { students, payments, hostels, documents, analytics } = useAdminData();

  const studentStatusData = useMemo(() => {
    const groups = students.reduce<Record<string, number>>((accumulator, student) => {
      accumulator[student.status] = (accumulator[student.status] ?? 0) + 1;
      return accumulator;
    }, {});

    return Object.entries(groups).map(([status, value]) => ({
      status,
      value,
      fill: STATUS_COLORS[status] ?? "#2C3E50",
    }));
  }, [students]);

  const hostelUtilisation = useMemo(
    () =>
      hostels.map((hostel) => ({
        name: hostel.hostelName,
        utilisation: Math.round((hostel.occupied / hostel.capacity) * 100),
      })),
    [hostels],
  );

  const feeTypeBreakdown = useMemo(() => {
    const results = payments.reduce<Record<string, number>>((accumulator, payment) => {
      if (payment.status !== "completed") {
        return accumulator;
      }
      accumulator[payment.feeType] = (accumulator[payment.feeType] ?? 0) + payment.amount;
      return accumulator;
    }, {});

    return Object.entries(results).map(([name, value], index) => ({
      name,
      value,
      fill: FEE_COLORS[index % FEE_COLORS.length],
    }));
  }, [payments]);

  const documentStats = useMemo(
    () => ({
      verified: documents.filter((document) => document.verificationStatus === "verified").length,
      pending: documents.filter((document) => document.verificationStatus === "pending").length,
      rejected: documents.filter((document) => document.verificationStatus === "rejected").length,
    }),
    [documents],
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Total students</p>
          <p className="mt-2 text-3xl font-semibold text-primary">{formatNumber(analytics.totalStudents)}</p>
          <p className="mt-4 text-xs text-muted-foreground">Blockchain identities minted for all approved students.</p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Pending approvals</p>
          <p className="mt-2 text-3xl font-semibold text-primary">{formatNumber(analytics.pendingApplications)}</p>
          <p className="mt-4 text-xs text-muted-foreground">AI-assisted triaging ensures fast turnaround.</p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Fees collected</p>
          <p className="mt-2 text-3xl font-semibold text-primary">{formatCurrency(analytics.totalFeesCollected)}</p>
          <p className="mt-4 text-xs text-muted-foreground">Integrated UPI + Netbanking reconciliations.</p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/85 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Outstanding dues</p>
          <p className="mt-2 text-3xl font-semibold text-primary">{formatCurrency(analytics.outstandingFees)}</p>
          <p className="mt-4 text-xs text-muted-foreground">Automated reminders scheduled for pending cases.</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">Registration momentum</h3>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">last five months</p>
            </div>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">AI Forecast Stable</span>
          </header>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer>
              <AreaChart data={analytics.registrationTrends}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498DB" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3498DB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                <Tooltip cursor={false} contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1D4ED8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorReg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">Registration status mix</h3>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">live distribution</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Govt audit ready</span>
          </header>
          <div className="mx-auto h-60 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }} />
                <Pie dataKey="value" data={studentStatusData} innerRadius={70} outerRadius={100} paddingAngle={4}>
                  {studentStatusData.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid gap-3 text-sm">
            {studentStatusData.map((entry) => (
              <div key={entry.status} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <span className="flex items-center gap-3 text-muted-foreground">
                  <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                  {entry.status.toUpperCase()}
                </span>
                <span className="font-semibold text-primary">{formatNumber(entry.value)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg">
          <header className="mb-6">
            <h3 className="text-lg font-semibold text-primary">Hostel occupancy</h3>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">block-wise utilisation</p>
          </header>
          <ul className="space-y-3">
            {hostelUtilisation.map((hostel) => (
              <li key={hostel.name} className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
                <div className="flex items-center justify-between text-sm font-medium text-primary">
                  <span>{hostel.name}</span>
                  <span>{hostel.utilisation}% occupancy</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.min(hostel.utilisation, 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">Fee analytics</h3>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">receipt-ready consolidation</p>
            </div>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">GST compliant</span>
          </header>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }} />
                <Pie dataKey="value" data={feeTypeBreakdown} innerRadius={70} outerRadius={110} paddingAngle={4}>
                  {feeTypeBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid gap-3 text-sm">
            {feeTypeBreakdown.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
                <span className="flex items-center gap-3 text-muted-foreground">
                  <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                  {entry.name.toUpperCase()}
                </span>
                <span className="font-semibold text-primary">{formatCurrency(entry.value)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-primary">Payment velocity</h3>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">receipts processed monthly</p>
          <div className="mt-6 h-56 w-full">
            <ResponsiveContainer>
              <AreaChart data={analytics.paymentTrends}>
                <defs>
                  <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1ABC9C" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#1ABC9C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                <Tooltip cursor={false} contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }} />
                <Area type="monotone" dataKey="value" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#colorPay)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-primary">Verification ledger</h3>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">AI assisted outcomes</p>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
              <span className="text-muted-foreground">Verified</span>
              <span className="font-semibold text-emerald-600">{formatNumber(documentStats.verified)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-semibold text-amber-500">{formatNumber(documentStats.pending)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
              <span className="text-muted-foreground">Rejected</span>
              <span className="font-semibold text-rose-500">{formatNumber(documentStats.rejected)}</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AdminDashboard;
