import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import AdminLayout from "@/pages/admin/AdminLayout";
import StudentLayout from "@/pages/student/StudentLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import StudentDashboard from "@/pages/student/Dashboard";
import StudentRegister from "@/pages/student/Register";
import StudentPayFees from "@/pages/student/PayFees";
import StudentDocuments from "@/pages/student/Documents";
import AdminStudentManagement from "@/pages/admin/StudentManagement";
import AdminFeeManagement from "@/pages/admin/FeeManagement";
import AdminVerification from "@/pages/admin/VerificationCenter";
import AdminReports from "@/pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="student-management"
              element={<AdminStudentManagement />}
            />
            <Route path="fee-management" element={<AdminFeeManagement />} />
            <Route path="verification-center" element={<AdminVerification />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>

          <Route
            path="/student"
            element={<Navigate to="/student/dashboard" replace />}
          />
          <Route path="/student/*" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="register" element={<StudentRegister />} />
            <Route path="pay-fees" element={<StudentPayFees />} />
            <Route path="documents" element={<StudentDocuments />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
