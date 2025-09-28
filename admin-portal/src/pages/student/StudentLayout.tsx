import { NavLink, Outlet } from "react-router-dom";
import { STUDENT_NAVIGATION } from "@shared/constants";
import { cn } from "@/lib/utils";
import { Menu, School, UserCircle2 } from "lucide-react";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#eef3f8] to-[#dde6ef]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary/60">Smart College ERP</p>
          <h1 className="mt-2 text-2xl font-semibold text-primary">Student Portal</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </header>
      <div className="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-5xl gap-6 px-4 pb-24 sm:px-6">
        <Outlet />
      </div>
      <nav className="fixed bottom-4 left-1/2 z-40 w-[92%] max-w-xl -translate-x-1/2 rounded-3xl bg-white/90 shadow-2xl shadow-slate-400/30 backdrop-blur">
        <ul className="grid grid-cols-5">
          {STUDENT_NAVIGATION.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs font-medium text-muted-foreground transition",
                    isActive && "text-primary",
                  )
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {item.path.includes("dashboard") ? (
                    <School className="h-4 w-4" />
                  ) : item.path.includes("register") ? (
                    <UserCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-sm">•</span>
                  )}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default StudentLayout;
