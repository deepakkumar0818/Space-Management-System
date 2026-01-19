"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type UserRole = "customer" | "admin" | "staff";

interface LoginFormState {
  email: string;
  password: string;
  role: UserRole;
  loading: boolean;
  error?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const initialRole = (roleParam as UserRole) || "customer";
  const isCustomerOnly = roleParam === "customer"; // Only hide admin/staff if explicitly customer

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    role: initialRole,
    loading: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Invalid credentials");
      }

      const data = await response.json();
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "workspace_token",
          data.token
        );
        // Store user info for display
        if (data.user) {
          window.localStorage.setItem(
            "workspace_user",
            JSON.stringify({
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
            })
          );
        }
      }

      if (form.role === "admin") {
        router.push("/admin");
      } else if (form.role === "staff") {
        router.push("/staff");
      } else {
        router.push("/app");
      }
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to login. Please try again.",
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
            Sign in
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Login to your workspace account
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {isCustomerOnly
              ? "Enter your customer credentials to continue with your booking."
              : "Choose your role and enter your credentials to continue."}
          </p>
        </div>

        {isCustomerOnly ? (
          <div className="mb-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
              <span className="font-medium">Customer Login</span> - Please sign in to continue with your booking.
            </div>
          </div>
        ) : (
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
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
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
              placeholder="Enter your password"
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
            {form.loading ? "Sign in.." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          New here?{" "}
          <button
            type="button"
            onClick={() =>
              router.push(`/auth/register?role=${encodeURIComponent(form.role)}`)
            }
            className="font-medium text-slate-900 underline-offset-2 hover:underline"
          >
            Create a {form.role} account
          </button>
        </p>
      </div>
    </main>
  );
}


