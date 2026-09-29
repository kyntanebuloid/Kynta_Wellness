"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { createBooking } from "@/lib/actions/bookings";

interface BookableService {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  currency: string;
  price?: string | null;
  duration?: string | null;
}

interface Location {
  name: string;
  slug?: string;
}

interface ReservationSectionProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    infoCards?: {
      icon?: string;
      title: string;
      description: string;
    }[];
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
  };
  services?: BookableService[];
  locations?: Location[];
}

declare global {
  interface Window {
    Razorpay?: new (
      options: Record<string, unknown>,
    ) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-lg border border-kynta-border/40 p-4">
      <div className="w-9 h-9 rounded-full bg-kynta-section-bg border border-kynta-border/40 flex items-center justify-center flex-shrink-0 text-kynta-teal">
        {icon}
      </div>
      <div>
        <h4 className="font-serif text-[15px] text-kynta-charcoal mb-1">
          {title}
        </h4>
        <p className="text-[12px] leading-[1.6] text-kynta-warm-gray">
          {description}
        </p>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>No rush</title>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Privacy</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Chat</title>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-bold tracking-[0.12em] uppercase text-kynta-charcoal mb-1.5"
    >
      {children}
      {required && <span className="text-kynta-rust"> *</span>}
    </label>
  );
}

const defaultInfoCards = [
  {
    icon: "clock",
    title: "No Rush, No Crowds",
    description:
      "We take only a few bookings each day, so the spa always stays quiet and calm.",
  },
  {
    icon: "shield",
    title: "Your Privacy Matters",
    description:
      "Tell us about food needs, private travel or a private room. We keep it all private.",
  },
];

function formatInr(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

function addMinutesToTime(time: string, minutes: number): string {
  const [rawH, rawM] = time.split(":");
  const start = Number(rawH) * 60 + Number(rawM);
  const total = (start + minutes) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function ReservationSection({
  data,
  services,
  locations,
}: ReservationSectionProps) {
  const eyebrow = data?.eyebrow || "Book Your Spa Visit";
  const heading = data?.heading || "Book a Treatment";
  const description =
    data?.description ||
    "Book one short session or a stay of many days. Our team will plan every detail for you.";

  const infoCards =
    data?.infoCards?.map((c) => ({
      icon: c.icon === "shield" ? "shield" : "clock",
      title: c.title,
      description: c.description,
    })) || defaultInfoCards;

  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading"; label: string }
    | { kind: "error"; message: string }
    | { kind: "success"; message: string }
  >({ kind: "idle" });
  const submittingRef = useRef(false);

  const isLoading = status.kind === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current || isLoading) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const guestName = String(formData.get("guest-name") ?? "").trim();
    const guestEmail = String(formData.get("guest-email") ?? "").trim();
    const guestPhone = String(formData.get("phone") ?? "").trim();
    const serviceId = String(formData.get("service-id") ?? "").trim();
    const bookingDate = String(formData.get("target-date") ?? "").trim();
    const startTimeRaw = String(formData.get("time-slot") ?? "").trim();
    const destination = String(formData.get("destination") ?? "").trim();
    const partySize = String(formData.get("party-size") ?? "").trim();
    const specialRequests = String(
      formData.get("special-requests") ?? "",
    ).trim();

    if (
      !guestName ||
      !guestEmail ||
      !serviceId ||
      !bookingDate ||
      !startTimeRaw
    ) {
      setStatus({
        kind: "error",
        message: "Please fill in name, email, service, date, and time.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      setStatus({
        kind: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    const selectedService = services?.find((s) => s.id === serviceId);
    if (!selectedService) {
      setStatus({ kind: "error", message: "Please select a valid service." });
      return;
    }

    console.log(
      `[ReservationSection] selected experience id=${selectedService.id} name=${selectedService.name}`,
    );

    const startTime = startTimeRaw.includes(":")
      ? startTimeRaw.length === 5
        ? `${startTimeRaw}:00`
        : startTimeRaw
      : null;

    if (!startTime) {
      setStatus({ kind: "error", message: "Please select a valid time slot." });
      return;
    }

    const endTime = addMinutesToTime(
      startTime,
      selectedService.duration_minutes,
    );

    const noteLines = [
      destination && `Destination: ${destination}`,
      partySize && `Party size: ${partySize}`,
      guestPhone && `Phone: ${guestPhone}`,
      specialRequests && `Notes: ${specialRequests}`,
    ].filter(Boolean);

    submittingRef.current = true;
    setStatus({ kind: "loading", label: "Booking…" });

    try {
      const bookingResult = await createBooking({
        profile_id: null,
        service_id: null,
        experience_id: serviceId,
        treatment_id: null,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        status: "pending",
        notes: noteLines.length > 0 ? noteLines.join("\n") : null,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone || null,
      });

      if (bookingResult.error || !bookingResult.data) {
        setStatus({
          kind: "error",
          message: bookingResult.error || "Could not create booking.",
        });
        return;
      }

      const bookingId = bookingResult.data.id;

      setStatus({ kind: "loading", label: "Getting payment ready…" });

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      const orderData = await orderResponse.json().catch(() => ({}));

      if (!orderResponse.ok) {
        setStatus({
          kind: "error",
          message: orderData.error || "Could not start payment.",
        });
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        setStatus({
          kind: "error",
          message: "Could not open the payment page. Please try again.",
        });
        return;
      }

      setStatus({ kind: "loading", label: "Opening payment…" });

      let verified = false;

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kynta Wellness",
        description: orderData.serviceName || "Spa booking",
        order_id: orderData.orderId,
        prefill: {
          name: guestName,
          email: guestEmail,
          contact: guestPhone || undefined,
        },
        theme: { color: "#0e7490" },
        handler: async (response: {
          razorpay_payment_id?: string;
          razorpay_order_id?: string;
          razorpay_signature?: string;
        }) => {
          if (verified) {
            return;
          }
          verified = true;
          setStatus({ kind: "loading", label: "Checking your payment…" });

          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json().catch(() => ({}));

            if (!verifyResponse.ok) {
              submittingRef.current = false;
              setStatus({
                kind: "error",
                message: verifyData.error || "We could not check your payment.",
              });
              return;
            }

            submittingRef.current = false;
            setStatus({
              kind: "success",
              message:
                "Payment done. Your booking is confirmed. We will contact you soon.",
            });
            form.reset();
          } catch {
            submittingRef.current = false;
            setStatus({
              kind: "error",
              message: "We could not check your payment. Please contact us.",
            });
          }
        },
        modal: {
          ondismiss: () => {
            if (verified) {
              return;
            }
            submittingRef.current = false;
            setStatus({
              kind: "error",
              message:
                "Payment was cancelled. Your booking is saved. You can try to pay again.",
            });
          },
        },
      });

      rzp.on("payment.failed", () => {
        submittingRef.current = false;
        setStatus({
          kind: "error",
          message: "Payment failed. Please try another way to pay.",
        });
      });

      rzp.open();
      setStatus({
        kind: "loading",
        label: "Please finish paying in the payment window…",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      submittingRef.current = false;
    }
  }
  const serviceOptions = services && services.length > 0 ? services : [];

  return (
    <section className="w-full bg-kynta-section-bg py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] gap-7">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-kynta-rust mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl lg:text-[34px] leading-[1.2] text-kynta-charcoal mb-4">
              {heading}
            </h2>
            <p className="text-[13px] leading-[1.7] text-kynta-warm-gray mb-8 max-w-sm">
              {description}
            </p>
            <div className="flex flex-col gap-3">
              {infoCards.map((card) => (
                <InfoCard
                  key={card.title}
                  icon={card.icon === "shield" ? <ShieldIcon /> : <ClockIcon />}
                  title={card.title}
                  description={card.description}
                />
              ))}
              <div className="flex items-center justify-between bg-white rounded-lg border border-kynta-border/40 p-4">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-kynta-section-bg border border-kynta-border/40 flex items-center justify-center flex-shrink-0 text-kynta-teal">
                    <ChatIcon />
                  </div>
                  <div>
                    <h4 className="font-serif text-[15px] text-kynta-charcoal">
                      Talk to Us
                    </h4>
                    <p className="text-[11px] text-kynta-warm-gray">
                      Book fast on WhatsApp
                    </p>
                  </div>
                </div>
                <Link
                  href="https://wa.me/917250333494?text=Hello%20Kynta%20Wellness%20%F0%9F%8C%B8%0A%0AI%E2%80%99d%20love%20to%20explore%20your%20wellness%20and%20spa%20experiences.%20Could%20you%20please%20share%20the%20available%20treatments%2C%20pricing%2C%20and%20appointment%20availability%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[12px] font-semibold text-white bg-[#25D366] rounded-md hover:bg-[#1fb855] transition-colors"
                >
                  WhatsApp
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-kynta-border/40 p-6 lg:p-7">
            <h3 className="font-serif text-xl lg:text-[22px] text-kynta-charcoal mb-6">
              Your Booking Details
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="guest-name" required>
                    Full Name
                  </FieldLabel>
                  <input
                    id="guest-name"
                    name="guest-name"
                    type="text"
                    required
                    disabled={isLoading}
                    placeholder="e.g. Priya Sharma"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="guest-email" required>
                    Email
                  </FieldLabel>
                  <input
                    id="guest-email"
                    name="guest-email"
                    type="email"
                    required
                    disabled={isLoading}
                    placeholder="you@example.com"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="phone">Phone / WhatsApp</FieldLabel>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    disabled={isLoading}
                    placeholder="+91(0) 98765 43210"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="destination" required>
                    Spa Location
                  </FieldLabel>
                  <select
                    id="destination"
                    name="destination"
                    required
                    disabled={isLoading}
                    defaultValue=""
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  >
                    <option value="" disabled>
                      Choose a location
                    </option>
                    {(locations || []).map((location) => (
                      <option key={location.name} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="service-id" required>
                  Treatment
                </FieldLabel>
                <select
                  id="service-id"
                  name="service-id"
                  required
                  disabled={isLoading || serviceOptions.length === 0}
                  defaultValue=""
                  className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                >
                  <option value="" disabled>
                    {serviceOptions.length === 0
                      ? "No treatments available"
                      : "Choose a treatment"}
                  </option>
                  {serviceOptions.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} · {service.duration_minutes} min ·{" "}
                      {formatInr(service.price_cents)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <FieldLabel htmlFor="target-date" required>
                    Date
                  </FieldLabel>
                  <input
                    id="target-date"
                    name="target-date"
                    type="date"
                    required
                    disabled={isLoading}
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="time-slot" required>
                    Time
                  </FieldLabel>
                  <input
                    id="time-slot"
                    name="time-slot"
                    type="time"
                    required
                    disabled={isLoading}
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="party-size">Number of Guests</FieldLabel>
                  <select
                    id="party-size"
                    name="party-size"
                    disabled={isLoading}
                    defaultValue="1"
                    className="w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="other">More Than 6 (Contact Us)</option>
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="special-requests">
                  Anything We Should Know?
                </FieldLabel>
                <textarea
                  id="special-requests"
                  name="special-requests"
                  rows={3}
                  disabled={isLoading}
                  placeholder="Tell us about body pain, allergies, smells you do not like, or if you like hot or cool water..."
                  className="w-full px-3 py-2.5 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 resize-none focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60"
                />
              </div>

              {status.kind === "error" && (
                <p
                  role="alert"
                  className="text-[12px] leading-[1.5] text-kynta-rust bg-kynta-rust/5 border border-kynta-rust/30 rounded-md px-3 py-2"
                >
                  {status.message}
                </p>
              )}
              {status.kind === "success" && (
                <output className="text-[12px] leading-[1.5] text-kynta-teal-dark bg-kynta-teal/10 border border-kynta-teal/30 rounded-md px-3 py-2">
                  {status.message}
                </output>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-1">
                <p className="text-[11px] leading-[1.5] text-kynta-warm-gray max-w-[200px]">
                  We will confirm your booking within 2 working
                  hours.
                </p>
                <button
                  type="submit"
                  disabled={isLoading || serviceOptions.length === 0}
                  aria-busy={isLoading}
                  className="px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? status.kind === "loading"
                      ? status.label
                      : "Processing…"
                    : "Book Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
