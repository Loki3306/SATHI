import { useCallback, useEffect, useState } from "react";
import { storageClient } from "@shared/api-client";
import type {
  AnalyticsSnapshot,
  DocumentVerification,
  HostelSummary,
  Payment,
  Student,
} from "@shared/types";

interface AdminDataState {
  students: Student[];
  payments: Payment[];
  documents: DocumentVerification[];
  hostels: HostelSummary[];
  analytics: AnalyticsSnapshot;
}

const deriveAnalytics = (students: Student[], payments: Payment[]): AnalyticsSnapshot => {
  const completedPayments = payments.filter((payment) => payment.status === "completed");
  const pendingApplications = students.filter((student) => student.status === "pending");

  const outstandingFees = payments
    .filter((payment) => payment.status !== "completed")
    .reduce((total, payment) => total + payment.amount, 0);

  const cachedSnapshot = storageClient.getAnalyticsSnapshot();

  return {
    totalStudents: students.length,
    pendingApplications: pendingApplications.length,
    totalFeesCollected: completedPayments.reduce((total, payment) => total + payment.amount, 0),
    outstandingFees,
    registrationTrends:
      cachedSnapshot?.registrationTrends ?? [
        { month: "Sep", value: 84 },
        { month: "Oct", value: 112 },
        { month: "Nov", value: 156 },
        { month: "Dec", value: 188 },
        { month: "Jan", value: students.length },
      ],
    paymentTrends:
      cachedSnapshot?.paymentTrends ?? [
        { month: "Sep", value: 62 },
        { month: "Oct", value: 94 },
        { month: "Nov", value: 131 },
        { month: "Dec", value: 168 },
        { month: "Jan", value: completedPayments.length },
      ],
  };
};

const getSnapshot = (): AdminDataState => {
  const students = storageClient.getStudents();
  const payments = storageClient.getPayments();

  return {
    students,
    payments,
    documents: storageClient.getDocuments(),
    hostels: storageClient.getHostels(),
    analytics: deriveAnalytics(students, payments),
  };
};

export const useAdminData = () => {
  const [state, setState] = useState<AdminDataState>(() => getSnapshot());

  const refresh = useCallback(() => {
    setState(getSnapshot());
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!event.key) {
        refresh();
        return;
      }

      if (event.key.includes("student_portal") || event.key.includes("admin_portal")) {
        refresh();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refresh]);

  return { ...state, refresh };
};
