import { useCallback, useEffect, useState } from "react";
import { storageClient } from "@shared/api-client";
import type { DocumentVerification, Payment, Student } from "@shared/types";

interface StudentProfileState {
  student: Student | null;
  payments: Payment[];
  documents: DocumentVerification[];
}

const getStudentSnapshot = (studentId: string): StudentProfileState => {
  const students = storageClient.getStudents();
  const payments = storageClient.getPayments();
  const documents = storageClient.getDocuments();
  const student = students.find((entry) => entry.id === studentId) ?? null;

  return {
    student,
    payments: payments.filter((payment) => payment.studentId === studentId),
    documents: documents.filter((document) => document.studentId === studentId),
  };
};

export const useStudentProfile = (studentId: string) => {
  const [state, setState] = useState<StudentProfileState>(() =>
    getStudentSnapshot(studentId),
  );

  const refresh = useCallback(() => {
    setState(getStudentSnapshot(studentId));
  }, [studentId]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!event.key) {
        refresh();
        return;
      }

      if (
        event.key.includes("student_portal") ||
        event.key.includes("admin_portal")
      ) {
        refresh();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refresh]);

  return { ...state, refresh };
};
