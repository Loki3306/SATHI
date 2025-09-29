import { FormEvent, useMemo, useState } from "react";
import { storageClient } from "@shared/api-client";
import type { Student } from "@shared/types";
import { cn } from "@/lib/utils";
import { DEFAULT_STUDENT_ID } from "@shared/constants";

const courseOptions = [
  "B.Tech Computer Science",
  "B.Sc Data Science",
  "B.Com Accounting",
  "MBA Operations",
  "BBA Finance",
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  course: courseOptions[0],
  year: 1,
};

const StudentRegister = () => {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const students = storageClient.getStudents();
    const id = `STU-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, "0")}`;

    const newStudent: Student = {
      id,
      personalInfo: {
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        address: formState.address,
        dateOfBirth: "",
      },
      academicInfo: {
        course: formState.course,
        year: formState.year,
        rollNumber: `${formState.course.split(" ")[0]}-${formState.year}-${String(Math.floor(Math.random() * 200)).padStart(3, "0")}`,
        department: formState.course.includes("MBA") ? "Management" : "Science",
      },
      documents: {
        photo: "",
        certificates: [],
        identityProof: "",
      },
      blockchainToken: `0x${crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()}`,
      registrationDate: new Date().toISOString(),
      status: "pending",
    };

    storageClient.setStudents([newStudent, ...students]);
    setStatus("success");
    setFormState(initialState);
    window.dispatchEvent(
      new StorageEvent("storage", { key: "student_portal:students" }),
    );
  };

  const isSubmissionDisabled = useMemo(
    () =>
      !formState.name ||
      !formState.email ||
      !formState.phone ||
      !formState.address,
    [formState],
  );

  return (
    <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-xl">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Enrollment intake
        </p>
        <h2 className="text-2xl font-semibold text-primary">
          New student registration
        </h2>
        <p className="text-sm text-muted-foreground">
          Submit your application for blockchain-backed registration. You can
          track status on the dashboard.
        </p>
      </header>
      <form className="mt-6 space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-primary">
            Full name
            <input
              required
              value={formState.name}
              onChange={(event) =>
                setFormState((state) => ({
                  ...state,
                  name: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Enter your name"
            />
          </label>
          <label className="text-sm font-medium text-primary">
            Email address
            <input
              required
              type="email"
              value={formState.email}
              onChange={(event) =>
                setFormState((state) => ({
                  ...state,
                  email: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="you@college.edu"
            />
          </label>
          <label className="text-sm font-medium text-primary">
            Phone number
            <input
              required
              value={formState.phone}
              onChange={(event) =>
                setFormState((state) => ({
                  ...state,
                  phone: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="10-digit mobile"
            />
          </label>
          <label className="text-sm font-medium text-primary">
            Course
            <select
              value={formState.course}
              onChange={(event) =>
                setFormState((state) => ({
                  ...state,
                  course: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-primary sm:col-span-2">
            Residential address
            <textarea
              required
              value={formState.address}
              onChange={(event) =>
                setFormState((state) => ({
                  ...state,
                  address: event.target.value,
                }))
              }
              className="mt-2 h-24 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="House number, street, city"
            />
          </label>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-xs text-muted-foreground">
          <span>Existing sample student ID for preview:</span>
          <span className="font-semibold text-primary">
            {DEFAULT_STUDENT_ID}
          </span>
        </div>
        <button
          type="submit"
          className={cn(
            "w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition",
            isSubmissionDisabled && "pointer-events-none opacity-60",
          )}
        >
          Submit registration for verification
        </button>
        {status === "success" ? (
          <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">
            Application submitted. Track approval updates on your dashboard.
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default StudentRegister;
