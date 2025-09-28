import { storageClient } from "@shared/api-client";
import { STORAGE_KEYS } from "@shared/constants";
import type {
  AnalyticsSnapshot,
  DocumentVerification,
  HostelSummary,
  Payment,
  Student,
} from "@shared/types";

const DEFAULT_STUDENTS: Student[] = [
  {
    id: "STU-2025-001",
    personalInfo: {
      name: "Aarav Sharma",
      email: "aarav.sharma@smartcollege.edu",
      phone: "+91 98765 12345",
      address: "12, Green Enclave, Bengaluru",
      dateOfBirth: "2004-03-14",
    },
    academicInfo: {
      course: "B.Tech Computer Science",
      year: 3,
      rollNumber: "CS-3-057",
      department: "Engineering",
    },
    documents: {
      photo: "/assets/students/aarav-photo.jpg",
      certificates: ["/assets/students/aarav-hs.pdf", "/assets/students/aarav-jee.pdf"],
      identityProof: "/assets/students/aarav-id.pdf",
    },
    hostel: {
      hostelName: "Narmada Residency",
      block: "C",
      roomNumber: "312",
    },
    blockchainToken: "0xA1B2C3D4E5F6",
    registrationDate: "2025-01-08T09:12:00.000Z",
    status: "approved",
  },
  {
    id: "STU-2025-002",
    personalInfo: {
      name: "Meera Patel",
      email: "meera.patel@smartcollege.edu",
      phone: "+91 98541 98821",
      address: "89, Sunrise Apartments, Ahmedabad",
      dateOfBirth: "2005-07-02",
    },
    academicInfo: {
      course: "BBA Finance",
      year: 1,
      rollNumber: "BBA-1-021",
      department: "Management",
    },
    documents: {
      photo: "/assets/students/meera-photo.jpg",
      certificates: ["/assets/students/meera-hs.pdf"],
      identityProof: "/assets/students/meera-id.pdf",
    },
    hostel: {
      hostelName: "Kaveri Heights",
      block: "A",
      roomNumber: "108",
    },
    blockchainToken: "0xB7E9F2A1D4C3",
    registrationDate: "2025-01-11T10:45:00.000Z",
    status: "pending",
  },
  {
    id: "STU-2025-003",
    personalInfo: {
      name: "Siddharth Varma",
      email: "siddharth.varma@smartcollege.edu",
      phone: "+91 98331 67234",
      address: "45, Lakeview Road, Hyderabad",
      dateOfBirth: "2003-11-21",
    },
    academicInfo: {
      course: "MBA Operations",
      year: 2,
      rollNumber: "MBA-2-014",
      department: "Management",
    },
    documents: {
      photo: "/assets/students/siddharth-photo.jpg",
      certificates: ["/assets/students/siddharth-grad.pdf"],
      identityProof: "/assets/students/siddharth-id.pdf",
    },
    hostel: {
      hostelName: "Tapti House",
      block: "B",
      roomNumber: "208",
    },
    blockchainToken: "0xC4D5E6F7A8B9",
    registrationDate: "2024-12-28T14:20:00.000Z",
    status: "approved",
  },
  {
    id: "STU-2025-004",
    personalInfo: {
      name: "Lakshmi Nair",
      email: "lakshmi.nair@smartcollege.edu",
      phone: "+91 98908 44221",
      address: "220, Seaside Residency, Kochi",
      dateOfBirth: "2004-01-05",
    },
    academicInfo: {
      course: "B.Sc Data Science",
      year: 2,
      rollNumber: "DS-2-034",
      department: "Science",
    },
    documents: {
      photo: "/assets/students/lakshmi-photo.jpg",
      certificates: ["/assets/students/lakshmi-hs.pdf"],
      identityProof: "/assets/students/lakshmi-id.pdf",
    },
    hostel: {
      hostelName: "Godavari Towers",
      block: "D",
      roomNumber: "416",
    },
    blockchainToken: "0xD1E2F3A4B5C6",
    registrationDate: "2025-01-05T08:05:00.000Z",
    status: "approved",
  },
  {
    id: "STU-2025-005",
    personalInfo: {
      name: "Rahul Deshmukh",
      email: "rahul.deshmukh@smartcollege.edu",
      phone: "+91 98231 98123",
      address: "7, Victory Park, Pune",
      dateOfBirth: "2005-09-16",
    },
    academicInfo: {
      course: "B.Com Accounting",
      year: 1,
      rollNumber: "BCOM-1-077",
      department: "Commerce",
    },
    documents: {
      photo: "/assets/students/rahul-photo.jpg",
      certificates: ["/assets/students/rahul-hs.pdf"],
      identityProof: "/assets/students/rahul-id.pdf",
    },
    blockchainToken: "0xE7F8A9B0C1D2",
    registrationDate: "2025-01-12T12:32:00.000Z",
    status: "pending",
  },
  {
    id: "STU-2025-006",
    personalInfo: {
      name: "Ananya Singh",
      email: "ananya.singh@smartcollege.edu",
      phone: "+91 98111 76543",
      address: "5, Scholar Avenue, Delhi",
      dateOfBirth: "2004-05-28",
    },
    academicInfo: {
      course: "B.Architecture",
      year: 4,
      rollNumber: "ARCH-4-009",
      department: "Architecture",
    },
    documents: {
      photo: "/assets/students/ananya-photo.jpg",
      certificates: ["/assets/students/ananya-portfolio.pdf"],
      identityProof: "/assets/students/ananya-id.pdf",
    },
    blockchainToken: "0xF1A2B3C4D5E6",
    registrationDate: "2024-12-20T16:50:00.000Z",
    status: "approved",
  },
];

const DEFAULT_PAYMENTS: Payment[] = [
  {
    id: "PAY-2025-001",
    studentId: "STU-2025-001",
    amount: 125000,
    feeType: "tuition",
    paymentMethod: "UPI",
    transactionId: "UPI-1900-2025",
    status: "completed",
    receiptUrl: "/receipts/PAY-2025-001.pdf",
    timestamp: "2025-01-15T09:15:00.000Z",
  },
  {
    id: "PAY-2025-002",
    studentId: "STU-2025-003",
    amount: 45000,
    feeType: "hostel",
    paymentMethod: "NetBanking",
    transactionId: "NB-8821-2025",
    status: "completed",
    receiptUrl: "/receipts/PAY-2025-002.pdf",
    timestamp: "2025-01-07T11:02:00.000Z",
  },
  {
    id: "PAY-2025-003",
    studentId: "STU-2025-004",
    amount: 3200,
    feeType: "exam",
    paymentMethod: "UPI",
    transactionId: "UPI-2784-2025",
    status: "completed",
    receiptUrl: "/receipts/PAY-2025-003.pdf",
    timestamp: "2025-01-10T08:45:00.000Z",
  },
  {
    id: "PAY-2025-004",
    studentId: "STU-2025-002",
    amount: 98000,
    feeType: "tuition",
    paymentMethod: "Card",
    transactionId: "CARD-5521-2025",
    status: "pending",
    receiptUrl: "",
    timestamp: "2025-01-18T10:10:00.000Z",
  },
  {
    id: "PAY-2025-005",
    studentId: "STU-2025-005",
    amount: 2600,
    feeType: "library",
    paymentMethod: "UPI",
    transactionId: "UPI-3321-2025",
    status: "failed",
    receiptUrl: "",
    timestamp: "2025-01-16T07:35:00.000Z",
  },
];

const DEFAULT_DOCUMENTS: DocumentVerification[] = [
  {
    id: "DOC-2025-001",
    studentId: "STU-2025-001",
    documentType: "certificate",
    originalFile: "/documents/STU-2025-001-certificate.pdf",
    extractedText: "Bachelor of Science - First Class",
    verificationStatus: "verified",
    confidence: 96,
    timestamp: "2025-01-12T07:30:00.000Z",
  },
  {
    id: "DOC-2025-002",
    studentId: "STU-2025-002",
    documentType: "id",
    originalFile: "/documents/STU-2025-002-id.pdf",
    extractedText: "Government ID - Valid",
    verificationStatus: "pending",
    confidence: 0,
    timestamp: "2025-01-14T09:18:00.000Z",
  },
  {
    id: "DOC-2025-003",
    studentId: "STU-2025-005",
    documentType: "certificate",
    originalFile: "/documents/STU-2025-005-certificate.pdf",
    extractedText: "Higher Secondary - 84%",
    verificationStatus: "rejected",
    confidence: 52,
    timestamp: "2025-01-13T11:48:00.000Z",
  },
];

const DEFAULT_HOSTELS: HostelSummary[] = [
  {
    hostelName: "Narmada Residency",
    capacity: 320,
    occupied: 298,
  },
  {
    hostelName: "Kaveri Heights",
    capacity: 280,
    occupied: 251,
  },
  {
    hostelName: "Tapti House",
    capacity: 180,
    occupied: 162,
  },
  {
    hostelName: "Godavari Towers",
    capacity: 240,
    occupied: 219,
  },
];

const DEFAULT_ANALYTICS: AnalyticsSnapshot = {
  totalStudents: DEFAULT_STUDENTS.length,
  pendingApplications: DEFAULT_STUDENTS.filter((student) => student.status === "pending").length,
  totalFeesCollected: DEFAULT_PAYMENTS.filter((payment) => payment.status === "completed").reduce(
    (total, payment) => total + payment.amount,
    0,
  ),
  outstandingFees: DEFAULT_PAYMENTS.filter((payment) => payment.status !== "completed").reduce(
    (total, payment) => total + payment.amount,
    0,
  ),
  registrationTrends: [
    { month: "Sep", value: 84 },
    { month: "Oct", value: 112 },
    { month: "Nov", value: 156 },
    { month: "Dec", value: 188 },
    { month: "Jan", value: 204 },
  ],
  paymentTrends: [
    { month: "Sep", value: 62 },
    { month: "Oct", value: 94 },
    { month: "Nov", value: 131 },
    { month: "Dec", value: 168 },
    { month: "Jan", value: 210 },
  ],
};

export const bootstrapDataLayer = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.students)) {
    storageClient.setStudents(DEFAULT_STUDENTS);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.payments)) {
    storageClient.setPayments(DEFAULT_PAYMENTS);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.documents)) {
    storageClient.setDocuments(DEFAULT_DOCUMENTS);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.hostels)) {
    storageClient.setHostels(DEFAULT_HOSTELS);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.analytics)) {
    storageClient.setAnalyticsSnapshot(DEFAULT_ANALYTICS);
  }
};
