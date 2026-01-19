"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type UserRole = "customer" | "admin" | "staff";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  loading: boolean;
  error?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "customer";

  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    role: initialRole,
    loading: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Unable to create account");
      }

      // Option 1: just send user to login for that role
      router.push(`/auth/login?role=${encodeURIComponent(form.role)}`);
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to create account. Please try again.",
      }));
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setForm((prev) => ({ ...prev, role }));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950/5 via-white to-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Create account
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Register for workspace access
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Choose your role to get a tailored experience.
          </p>
        </div>

        <div className="mb-4 flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleRoleChange("customer")}
            className={`flex-1 rounded-full border px-3 py-1.5 font-medium ${
              form.role === "customer"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("admin")}
            className={`flex-1 rounded-full border px-3 py-1.5 font-medium ${
              form.role === "admin"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("staff")}
            className={`flex-1 rounded-full border px-3 py-1.5 font-medium ${
              form.role === "staff"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Staff
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-slate-600">
              Full name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
              placeholder="Create a strong password"
            />
          </div>

          {form.error ? (
            <p className="text-xs text-red-600">{form.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={form.loading}
            className="flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() =>
              router.push(`/auth/login?role=${encodeURIComponent(form.role)}`)
            }
            className="font-medium text-slate-900 underline-offset-2 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
}


