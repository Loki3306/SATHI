import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileBarChart2,
  LayoutDashboard,
  ShieldCheck,
  Users2,
  Wallet2,
} from "lucide-react";
import { ADMIN_NAVIGATION } from "@shared/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, JSX.Element> = {
  dashboard: <LayoutDashboard className="h-5 w-5" />,
  users: <Users2 className="h-5 w-5" />,
  wallet: <Wallet2 className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
  file: <FileBarChart2 className="h-5 w-5" />,
};

const topHighlights = [
  { label: "NAAC Ready", value: "Govt Compliant" },
  { label: "AI Verification", value: "Enabled" },
  { label: "Blockchain IDs", value: "Live" },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(28,50,80,0.12),_transparent_55%)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] gap-6 px-4 py-6 lg:px-8">
        <aside className="hidden w-72 flex-col rounded-3xl bg-sidebar text-sidebar-foreground shadow-2xl shadow-slate-900/20 lg:flex">
          <div className="px-6 pb-6 pt-8">
            <span className="text-xs uppercase tracking-[0.35em] text-sidebar-foreground/60">
              Smart College ERP
            </span>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Admin Control Center
            </h1>
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {ADMIN_NAVIGATION.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: activeRoute }) =>
                    cn(
                      "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                      (isActive || activeRoute) &&
                        "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-emerald-500/20",
                      !(isActive || activeRoute) &&
                        "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white/90",
                    )
                  }
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                    {iconMap[item.icon] ?? <BarChart3 className="h-5 w-5" />}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          <div className="mx-4 mb-6 rounded-2xl bg-white/5 p-4 text-xs text-white/70">
            <p className="font-semibold text-white">Compliance Snapshot</p>
            <p className="mt-1 leading-relaxed text-white/70">
              Automated AI + Blockchain audits keep your statutory reports
              government-ready at all times.
            </p>
          </div>
        </aside>
        <main className="flex-1 rounded-3xl border border-border/70 bg-white/70 shadow-[0_35px_120px_-45px_rgba(15,23,42,0.6)] backdrop-blur-xl">
          <header className="flex flex-col gap-4 border-b border-border/80 px-6 pb-6 pt-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Control Tower
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-foreground">
                  Administrative Intelligence Hub
                </h2>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-2 text-xs font-medium text-muted-foreground shadow-inner">
                <span className="flex items-center gap-2 text-primary font-semibold">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Live Sync
                </span>
                <span className="hidden sm:inline">
                  Blockchain: #3478FEA | AI Watch: Stable
                </span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {topHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-white/70 px-5 py-4 text-sm font-medium leading-tight text-muted-foreground"
                >
                  <p className="text-[11px] uppercase tracking-[0.38em] text-muted-foreground/70">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </header>
          <div className="px-6 pb-10 pt-8 lg:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
