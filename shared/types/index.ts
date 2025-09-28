export type RegistrationStatus = "pending" | "approved" | "rejected";

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

export interface AcademicInfo {
  course: string;
  year: number;
  rollNumber: string;
  department: string;
}

export interface StudentDocuments {
  photo: string;
  certificates: string[];
  identityProof: string;
}

export interface HostelAssignment {
  hostelName: string;
  block: string;
  roomNumber: string;
}

export interface Student {
  id: string;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  documents: StudentDocuments;
  hostel?: HostelAssignment;
  blockchainToken: string;
  registrationDate: string;
  status: RegistrationStatus;
}

export type FeeType = "tuition" | "hostel" | "exam" | "library";
export type PaymentStatus = "pending" | "completed" | "failed";

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  feeType: FeeType;
  paymentMethod: string;
  transactionId: string;
  status: PaymentStatus;
  receiptUrl: string;
  timestamp: string;
}

export type DocumentType = "id" | "certificate" | "photo";
export type VerificationStatus = "pending" | "verified" | "rejected";

export interface DocumentVerification {
  id: string;
  studentId: string;
  documentType: DocumentType;
  originalFile: string;
  extractedText: string;
  verificationStatus: VerificationStatus;
  confidence: number;
  timestamp: string;
}

export interface AnalyticsSnapshot {
  totalStudents: number;
  pendingApplications: number;
  totalFeesCollected: number;
  outstandingFees: number;
  registrationTrends: Array<{ month: string; value: number }>;
  paymentTrends: Array<{ month: string; value: number }>;
}

export interface HostelSummary {
  hostelName: string;
  capacity: number;
  occupied: number;
}

export interface DemoResponse {
  message: string;
}
