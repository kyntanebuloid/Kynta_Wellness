import { adminLogout } from "@/lib/actions/admin";

export function LogoutButton({
  className = "px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase text-kynta-charcoal border border-kynta-border rounded-md hover:border-kynta-charcoal transition-colors",
}: {
  className?: string;
}) {
  return (
    <form action={adminLogout}>
      <button type="submit" className={className}>
        Logout
      </button>
    </form>
  );
}
