"use client";

import { useActionState } from "react";
import { type AdminLoginState, adminLogin } from "@/lib/actions/admin";

export function AdminLoginForm({ notice }: { notice?: string }) {
  const [state, formAction, pending] = useActionState<
    AdminLoginState,
    FormData
  >(adminLogin, null);

  const errorMessage = state?.error;
  const displayMessage = errorMessage ?? notice;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="admin-user-id"
          className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
        >
          Admin User ID
        </label>
        <input
          id="admin-user-id"
          name="user-id"
          type="text"
          required
          autoComplete="username"
          disabled={pending}
          placeholder="e.g. kynta-owner"
          className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={pending}
          placeholder="••••••••"
          className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
        />
      </div>

      {displayMessage && (
        <p
          role="alert"
          className="text-[12px] leading-[1.5] text-kynta-rust bg-kynta-rust/5 border border-kynta-rust/30 rounded-md px-3 py-2"
        >
          {displayMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="w-full px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Verifying…" : "Sign In"}
      </button>
    </form>
  );
}
