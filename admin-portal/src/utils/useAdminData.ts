import { useCallback, useEffect, useState } from "react";
import { storageClient } from "@shared/api-client";
import type {
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
}

const getSnapshot = (): AdminDataState => ({
  students: storageClient.getStudents(),
  payments: storageClient.getPayments(),
  documents: storageClient.getDocuments(),
  hostels: storageClient.getHostels(),
});

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
