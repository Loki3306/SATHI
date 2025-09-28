import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("Attempted to access unknown route", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f6f9fc] to-[#dce7f5] px-6">
      <div className="max-w-lg rounded-3xl border border-border bg-white/80 p-10 text-center shadow-[0_40px_120px_-80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SearchX className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-primary">
          We could not find that screen
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The requested resource is not available. Navigate back to the portal
          overview or choose a section from the navigation menu.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-slate-400/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to home
          </Link>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Open Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
