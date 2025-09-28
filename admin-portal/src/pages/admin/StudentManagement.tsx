import { useAdminData } from "@/utils/useAdminData";
import { formatNumber } from "@/utils/formatters";

const AdminStudentManagement = () => {
  const { students } = useAdminData();

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-primary">Student Registry</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor registration lifecycle and blockchain identity status across all departments.
        </p>
      </header>
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-white/85 shadow-lg">
        <table className="min-w-full divide-y divide-border/60 text-left text-sm">
          <thead className="bg-muted/80 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Programme</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Blockchain ID</th>
              <th className="px-6 py-4">Hostel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 bg-white/80">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-muted/60">
                <td className="px-6 py-4">
                  <div className="font-semibold text-primary">{student.personalInfo.name}</div>
                  <div className="text-xs text-muted-foreground">{student.personalInfo.email}</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="font-medium text-primary/80">{student.academicInfo.course}</div>
                  <div className="text-xs text-muted-foreground">Year {student.academicInfo.year}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{student.blockchainToken}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {student.hostel ? (
                    <div>
                      <span className="font-medium text-primary/80">{student.hostel.hostelName}</span>
                      <div className="text-xs text-muted-foreground">
                        Block {student.hostel.block} · Room {student.hostel.roomNumber}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Day scholar</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span>Total mapped students: {formatNumber(students.length)}</span>
        <span>
          Pending approvals: {formatNumber(students.filter((student) => student.status === "pending").length)}
        </span>
        <span>
          Hostel residents: {formatNumber(students.filter((student) => student.hostel).length)}
        </span>
      </footer>
    </section>
  );
};

export default AdminStudentManagement;
