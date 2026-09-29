import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin | Kynta Wellness",
    template: "%s | Kynta Wellness Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-kynta-cream text-kynta-charcoal">
      {children}
    </div>
  );
}
