import { FormEvent, useState } from "react";
import { storageClient } from "@shared/api-client";
import type { DocumentVerification } from "@shared/types";
import { DEFAULT_STUDENT_ID } from "@shared/constants";
import { formatPercent } from "@/utils/formatters";
import { useStudentProfile } from "@/utils/useStudentProfile";

const documentTypes: DocumentVerification["documentType"][] = [
  "id",
  "certificate",
  "photo",
];

const StudentDocuments = () => {
  const [documentType, setDocumentType] =
    useState<DocumentVerification["documentType"]>("id");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const { documents, refresh } = useStudentProfile(DEFAULT_STUDENT_ID);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allDocuments = storageClient.getDocuments();
    const id = `DOC-${new Date().getFullYear()}-${String(allDocuments.length + 1).padStart(3, "0")}`;

    const document: DocumentVerification = {
      id,
      studentId: DEFAULT_STUDENT_ID,
      documentType,
      originalFile: `/uploads/${fileName}`,
      extractedText: "OCR in progress",
      verificationStatus: "pending",
      confidence: 0,
      timestamp: new Date().toISOString(),
    };

    storageClient.setDocuments([document, ...allDocuments]);
    setStatus("success");
    setFileName("");
    refresh();
    window.dispatchEvent(
      new StorageEvent("storage", { key: "student_portal:documents" }),
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-xl">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Verification pipeline
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            Document upload center
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload documents for AI verification. Status updates mirror the
            admin verification center.
          </p>
        </header>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="text-sm font-medium text-primary">
            Document type
            <div className="mt-2 flex gap-2">
              {documentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDocumentType(type)}
                  className={`rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    type === documentType
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </label>
          <label className="text-sm font-medium text-primary">
            File reference
            <input
              required
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
              placeholder="upload filename"
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
          >
            Submit for AI verification
          </button>
          {status === "success" ? (
            <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">
              Document submitted. Verification updates will be notified.
            </p>
          ) : null}
        </form>
      </section>

      <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-xl">
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-primary">
            Verification history
          </h3>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            mirrors admin portal records
          </p>
        </header>
        <div className="space-y-3">
          {documents.map((document) => (
            <article
              key={document.id}
              className="rounded-2xl border border-border/70 bg-white/80 px-4 py-3 text-sm text-muted-foreground"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">
                  {document.documentType.toUpperCase()}
                </span>
                <span className="text-xs">
                  {new Date(document.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {document.extractedText}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {document.verificationStatus}
                </span>
                <span className="font-semibold text-accent">
                  {formatPercent(document.confidence)}
                </span>
              </div>
            </article>
          ))}
          {documents.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No documents submitted yet.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default StudentDocuments;
