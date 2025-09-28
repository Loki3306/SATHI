import { DEFAULT_STUDENT_ID } from "@shared/constants";
import { formatCurrency } from "@/utils/formatters";
import { useStudentProfile } from "@/utils/useStudentProfile";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Coins,
  FileText,
  Shield,
} from "lucide-react";

const StudentDashboard = () => {
  const { student, payments, documents } =
    useStudentProfile(DEFAULT_STUDENT_ID);

  if (!student) {
    return (
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <p className="text-lg font-semibold text-primary">
          Student profile unavailable
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load your profile. Please contact the administration
          office for assistance.
        </p>
      </div>
    );
  }

  const completedPayments = payments.filter(
    (payment) => payment.status === "completed",
  );
  const upcomingPayments = payments.filter(
    (payment) => payment.status !== "completed",
  );
  const verifiedDocuments = documents.filter(
    (doc) => doc.verificationStatus === "verified",
  );
  const pendingDocuments = documents.filter(
    (doc) => doc.verificationStatus === "pending",
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Welcome back
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-primary">
              {student.personalInfo.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.academicInfo.course} · Year {student.academicInfo.year} ·
              Roll {student.academicInfo.rollNumber}
            </p>
          </div>
          <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
            Registration Status: {student.status.toUpperCase()}
          </div>
        </div>
        {student.hostel ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-white/80 p-4 text-sm text-muted-foreground">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/70">
                Hostel
              </p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {student.hostel.hostelName}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/80 p-4 text-sm text-muted-foreground">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/70">
                Block
              </p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {student.hostel.block}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-white/80 p-4 text-sm text-muted-foreground">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/70">
                Room
              </p>
              <p className="mt-2 text-lg font-semibold text-primary">
                {student.hostel.roomNumber}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-3xl border border-border bg-white/90 p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Fee Payments
              </h3>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                completed vs pending
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-white/80 px-4 py-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Cleared
                dues
              </span>
              <span className="font-semibold text-primary">
                {formatCurrency(
                  completedPayments.reduce(
                    (total, payment) => total + payment.amount,
                    0,
                  ),
                )}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-white/80 px-4 py-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-amber-500" /> Upcoming
                dues
              </span>
              <span className="font-semibold text-primary">
                {upcomingPayments.length > 0
                  ? formatCurrency(
                      upcomingPayments.reduce(
                        (total, payment) => total + payment.amount,
                        0,
                      ),
                    )
                  : "No dues"}
              </span>
            </div>
          </div>
        </article>
        <article className="rounded-3xl border border-border bg-white/90 p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Documents</h3>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                verification status
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-white/80 px-4 py-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-emerald-500" /> Verified
              </span>
              <span className="font-semibold text-primary">
                {verifiedDocuments.length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-white/80 px-4 py-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4 text-amber-500" /> Pending
              </span>
              <span className="font-semibold text-primary">
                {pendingDocuments.length}
              </span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default StudentDashboard;
