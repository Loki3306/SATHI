import type {
  Student,
  Payment,
  DocumentVerification,
  AnalyticsSnapshot,
  HostelSummary,
} from "@shared/types";
import { STORAGE_KEYS } from "@shared/constants";

const readJson = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`Failed to parse localStorage key ${key}`, error);
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const storageClient = {
  getStudents: () => readJson<Student[]>(STORAGE_KEYS.students, []),
  setStudents: (students: Student[]) =>
    writeJson(STORAGE_KEYS.students, students),
  getPayments: () => readJson<Payment[]>(STORAGE_KEYS.payments, []),
  setPayments: (payments: Payment[]) =>
    writeJson(STORAGE_KEYS.payments, payments),
  getDocuments: () =>
    readJson<DocumentVerification[]>(STORAGE_KEYS.documents, []),
  setDocuments: (documents: DocumentVerification[]) =>
    writeJson(STORAGE_KEYS.documents, documents),
  getHostels: () => readJson<HostelSummary[]>(STORAGE_KEYS.hostels, []),
  setHostels: (hostels: HostelSummary[]) =>
    writeJson(STORAGE_KEYS.hostels, hostels),
  getAnalyticsSnapshot: () =>
    readJson<AnalyticsSnapshot | null>(STORAGE_KEYS.analytics, null),
  setAnalyticsSnapshot: (snapshot: AnalyticsSnapshot) =>
    writeJson(STORAGE_KEYS.analytics, snapshot),
};
