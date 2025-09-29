import { FormEvent, useMemo, useState } from "react";
import { storageClient } from "@shared/api-client";
import type { Payment } from "@shared/types";
import { formatCurrency } from "@/utils/formatters";
import { useStudentProfile } from "@/utils/useStudentProfile";
import { DEFAULT_STUDENT_ID } from "@shared/constants";

const feeTypes: Payment["feeType"][] = ["tuition", "hostel", "exam", "library"];
const paymentMethods = ["UPI", "NetBanking", "Card"];

const StudentPayFees = () => {
  const [feeType, setFeeType] = useState<Payment["feeType"]>("tuition");
  const [amount, setAmount] = useState(25000);
  const [method, setMethod] = useState(paymentMethods[0]);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const { payments, refresh } = useStudentProfile(DEFAULT_STUDENT_ID);

  const collectedTotal = useMemo(
    () =>
      payments
        .filter((payment) => payment.status === "completed")
        .reduce((total, payment) => total + payment.amount, 0),
    [payments],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allPayments = storageClient.getPayments();
    const id = `PAY-${new Date().getFullYear()}-${String(allPayments.length + 1).padStart(3, "0")}`;

    const payment: Payment = {
      id,
      studentId: DEFAULT_STUDENT_ID,
      amount,
      feeType,
      paymentMethod: method,
      transactionId: `${method}-${Math.random().toString().slice(2, 10)}`,
      status: "completed",
      receiptUrl: `/receipts/${id}.pdf`,
      timestamp: new Date().toISOString(),
    };

    storageClient.setPayments([payment, ...allPayments]);
    setStatus("success");
    window.dispatchEvent(new StorageEvent("storage", { key: "student_portal:payments" }));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-xl">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Secure payments</p>
          <h2 className="text-2xl font-semibold text-primary">Fee payment hub</h2>
          <p className="text-sm text-muted-foreground">
            Pay tuition, hostel, exam and library dues with instant GST-ready receipts.
          </p>
        </header>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="text-sm font-medium text-primary">
            Fee type
            <div className="mt-2 grid grid-cols-2 gap-2">
              {feeTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFeeType(type)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold capitalize transition ${
                    type === feeType
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </label>
          <label className="text-sm font-medium text-primary">
            Payment method
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {paymentMethods.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-primary">
            Amount (INR)
            <input
              type="number"
              min={1000}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-2 w-full rounded-2xl border border-border/70 bg-white px-4 py-3 text-sm text-primary shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
          >
            Pay {formatCurrency(amount)} securely
          </button>
          {status === "success" ? (
            <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">
              Payment processed. Receipt is available in history.
            </p>
          ) : null}
        </form>
      </section>

      <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-xl">
        <header className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary">Payment history</h3>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">auto-synced with admin portal</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Total paid {formatCurrency(collectedTotal)}
          </span>
        </header>
        <div className="mt-4 divide-y divide-border/60">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between gap-3 py-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-primary">
                  {payment.feeType.toUpperCase()} · {formatCurrency(payment.amount)}
                </p>
                <p className="text-xs">{new Date(payment.timestamp).toLocaleString()}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
                {payment.status}
              </span>
            </div>
          ))}
          {payments.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No payments recorded yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default StudentPayFees;
