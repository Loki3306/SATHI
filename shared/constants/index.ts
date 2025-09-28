export const STORAGE_KEYS = {
  students: "student_portal:students",
  payments: "student_portal:payments",
  documents: "student_portal:documents",
  analytics: "admin_portal:analytics",
  hostels: "admin_portal:hostels",
} as const;

export const ADMIN_NAVIGATION = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
  { label: "Students", path: "/admin/student-management", icon: "users" },
  { label: "Fees", path: "/admin/fee-management", icon: "wallet" },
  { label: "Verification", path: "/admin/verification-center", icon: "shield" },
  { label: "Reports", path: "/admin/reports", icon: "file" },
] as const;

export const STUDENT_NAVIGATION = [
  { label: "Dashboard", path: "/student/dashboard" },
  { label: "Register", path: "/student/register" },
  { label: "Pay Fees", path: "/student/pay-fees" },
  { label: "Documents", path: "/student/documents" },
  { label: "Support", path: "/student/support" },
] as const;

export const DEFAULT_STUDENT_ID = "STU-2025-001";
