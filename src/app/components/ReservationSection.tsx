"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SpaMenuItem } from "@/content/locations";
import { createBooking } from "@/lib/actions/bookings";
import {
  gstPercentOrDefault,
  MAX_GUESTS,
  MENU_CATEGORY_LABELS,
  menuRef,
  quoteMenuItem,
} from "@/lib/booking/menu";
import type { Homepage } from "@/types/sanity";

interface BookingLocation {
  name: string;
  slug?: string;
  phone?: string;
  /** Treatments bookable online; empty means call / WhatsApp to book. */
  menu?: SpaMenuItem[];
}

interface ReservationSectionProps {
  data?: Homepage["reservationSection"];
  locations?: BookingLocation[];
  /** GST % added at checkout (Locations page in Sanity). */
  gstPercent?: number;
  /** Used for "Call to book" when a location has no phone of its own. */
  fallbackPhone?: string;
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

const DEFAULT_WHATSAPP_URL =
  "https://wa.me/917250333494?text=Hello%20Kynta%20Wellness%20%F0%9F%8C%B8%0A%0AI%E2%80%99d%20love%20to%20explore%20your%20wellness%20and%20spa%20experiences.%20Could%20you%20please%20share%20the%20available%20treatments%2C%20pricing%2C%20and%20appointment%20availability%3F";

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

const inputClass =
  "w-full h-10 px-3 text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md placeholder:text-kynta-warm-gray/50 focus:outline-none focus:border-kynta-teal transition-colors disabled:opacity-60";

const DEFAULT_PHONE = "+91 7250333494";

function locationSlug(location: BookingLocation): string {
  return (
    location.slug ||
    location.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

/** Treatments that can actually be booked: named, with at least one price. */
function bookableMenu(location?: BookingLocation): SpaMenuItem[] {
  return (location?.menu ?? [])
    .map((item) => ({
      ...item,
      options: (item.options ?? []).filter(
        (o) => Number(o.minutes) > 0 && Number(o.price) > 0,
      ),
    }))
    .filter((item) => item._key && item.name?.trim() && item.options.length);
}

function CallToBook({
  locationName,
  phone,
  compact = false,
}: {
  locationName?: string;
  phone: string;
  compact?: boolean;
}) {
  const digits = phone.replace(/[^\d+]/g, "");
  const whatsapp = `https://wa.me/${digits.replace(/^\+/, "")}?text=${encodeURIComponent(
    `Hello Kynta Wellness, I would like to book a treatment${
      locationName ? ` at ${locationName}` : ""
    }.`,
  )}`;

  if (compact) {
    return (
      <p className="text-[11px] leading-[1.5] text-kynta-warm-gray">
        Prefer to talk?{" "}
        <a
          href={`tel:${digits}`}
          className="font-semibold text-kynta-teal-dark hover:underline"
        >
          Call {phone}
        </a>{" "}
        or{" "}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-kynta-teal-dark hover:underline"
        >
          WhatsApp us
        </a>
        .
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-kynta-border/50 bg-kynta-section-bg p-5">
      <p className="font-serif text-[17px] text-kynta-charcoal mb-1">
        Book by phone{locationName ? ` at ${locationName}` : ""}
      </p>
      <p className="text-[12px] leading-[1.6] text-kynta-warm-gray mb-4">
        Online booking isn&apos;t open for this spa yet. Call or WhatsApp us and
        we will book your treatment for you.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <a
          href={`tel:${digits}`}
          className="px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors"
        >
          Call {phone}
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-[#25D366] rounded-md hover:bg-[#1fb855] transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export function ReservationSection({
  data,
  locations = [],
  gstPercent: gstSetting,
  fallbackPhone,
}: ReservationSectionProps) {
  const eyebrow = data?.eyebrow || "Book Your Spa Visit";
  const heading = data?.heading || "Book a Treatment";
  const description =
    data?.description ||
    "Book one short session or a stay of many days. Our team will plan every detail for you.";

  const infoCards = data?.infoCards?.length
    ? data.infoCards.map((c) => ({
        icon: c.icon === "shield" ? "shield" : "clock",
        title: c.title,
        description: c.description,
      }))
    : defaultInfoCards;
  const whatsappTitle = data?.whatsapp?.title || "Talk to Us";
  const whatsappSubtitle = data?.whatsapp?.subtitle || "Book fast on WhatsApp";
  const whatsappButton = data?.whatsapp?.buttonLabel || "WhatsApp";
  const whatsappUrl = data?.whatsapp?.url || DEFAULT_WHATSAPP_URL;
  const formHeading = data?.formHeading || "Your Booking Details";
  const gstPercent = gstPercentOrDefault(gstSetting);

  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading"; label: string }
    | { kind: "error"; message: string }
    | { kind: "success"; message: string }
  >({ kind: "idle" });
  const submittingRef = useRef(false);
  const isLoading = status.kind === "loading";

  // Location → treatment → duration → guests.
  const [slug, setSlug] = useState("");
  const [itemKey, setItemKey] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [guests, setGuests] = useState(1);
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMinDate(now.toISOString().slice(0, 10));
  }, []);

  const location = locations.find((l) => locationSlug(l) === slug);
  const menu = bookableMenu(location);
  const item = menu.find((m) => m._key === itemKey);
  const option = item?.options?.find((o) => o.minutes === minutes);
  const isCouple = item?.category === "couple";
  const phone =
    location?.phone?.trim() || fallbackPhone?.trim() || DEFAULT_PHONE;
  const quote =
    item && option
      ? quoteMenuItem({
          price: option.price,
          category: item.category,
          perPerson: item.perPerson,
          guests: isCouple ? 2 : guests,
          gstPercent,
        })
      : null;
  const canBookOnline = Boolean(location) && menu.length > 0;

  const chooseLocation = (value: string) => {
    setSlug(value);
    setItemKey("");
    setMinutes(0);
    setStatus({ kind: "idle" });
  };

  const chooseItem = (key: string) => {
    const next = menu.find((m) => m._key === key);
    setItemKey(key);
    setMinutes(next?.options?.[0]?.minutes ?? 0);
    if (next?.category === "couple") setGuests(2);
  };

  // Group the treatments by category, in menu order.
  const groups = Object.entries(MENU_CATEGORY_LABELS)
    .map(([category, label]) => ({
      label,
      items: menu.filter((m) => (m.category ?? "massage") === category),
    }))
    .filter((group) => group.items.length > 0);

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
    const bookingDate = String(formData.get("target-date") ?? "").trim();
    const startTimeRaw = String(formData.get("time-slot") ?? "").trim();
    const specialRequests = String(
      formData.get("special-requests") ?? "",
    ).trim();

    if (!location || !item || !option) {
      setStatus({
        kind: "error",
        message: "Please choose a spa, a treatment and its duration.",
      });
      return;
    }

    if (!guestName || !guestEmail || !bookingDate || !startTimeRaw) {
      setStatus({
        kind: "error",
        message: "Please fill in name, email, date, and time.",
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

    const startTime = startTimeRaw.includes(":")
      ? startTimeRaw.length === 5
        ? `${startTimeRaw}:00`
        : startTimeRaw
      : null;

    if (!startTime) {
      setStatus({ kind: "error", message: "Please select a valid time slot." });
      return;
    }

    const partySize = isCouple ? 2 : guests;
    const endTime = addMinutesToTime(startTime, option.minutes);

    const noteLines = [
      `Destination: ${location.name}`,
      `Treatment: ${item.name} (${option.minutes} min)`,
      `Party size: ${isCouple ? "2 (couple)" : partySize}`,
      guestPhone && `Phone: ${guestPhone}`,
      specialRequests && `Notes: ${specialRequests}`,
    ].filter(Boolean);

    submittingRef.current = true;
    setStatus({ kind: "loading", label: "Booking…" });

    try {
      const bookingResult = await createBooking({
        profile_id: null,
        service_id: null,
        // The server reads the price for this choice from Sanity.
        experience_id: menuRef(
          locationSlug(location),
          item._key,
          option.minutes,
          partySize,
        ),
        treatment_id: null,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        status: "pending",
        notes: noteLines.join("\n"),
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
            setItemKey("");
            setMinutes(0);
            setGuests(1);
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
                      {whatsappTitle}
                    </h4>
                    <p className="text-[11px] text-kynta-warm-gray">
                      {whatsappSubtitle}
                    </p>
                  </div>
                </div>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[12px] font-semibold text-white bg-[#25D366] rounded-md hover:bg-[#1fb855] transition-colors"
                >
                  {whatsappButton}
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-kynta-border/40 p-6 lg:p-7">
            <h3 className="font-serif text-xl lg:text-[22px] text-kynta-charcoal mb-6">
              {formHeading}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <FieldLabel htmlFor="destination" required>
                  Spa Location
                </FieldLabel>
                <select
                  id="destination"
                  name="destination"
                  required
                  disabled={isLoading}
                  value={slug}
                  onChange={(event) => chooseLocation(event.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Choose a location
                  </option>
                  {locations.map((l) => (
                    <option key={locationSlug(l)} value={locationSlug(l)}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>

              {location && !canBookOnline && (
                <CallToBook locationName={location.name} phone={phone} />
              )}

              {canBookOnline && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                    <div>
                      <FieldLabel htmlFor="treatment" required>
                        Treatment
                      </FieldLabel>
                      <select
                        id="treatment"
                        required
                        disabled={isLoading}
                        value={itemKey}
                        onChange={(event) => chooseItem(event.target.value)}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Choose a treatment
                        </option>
                        {groups.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.items.map((m) => (
                              <option key={m._key} value={m._key}>
                                {m.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    <div className="sm:w-40">
                      <FieldLabel htmlFor="duration" required>
                        Duration
                      </FieldLabel>
                      <select
                        id="duration"
                        required
                        disabled={isLoading || !item}
                        value={minutes || ""}
                        onChange={(event) =>
                          setMinutes(Number(event.target.value))
                        }
                        className={inputClass}
                      >
                        {!item && <option value="">—</option>}
                        {item?.options?.map((o) => (
                          <option key={o.minutes} value={o.minutes}>
                            {o.minutes} min · {formatInr(o.price * 100)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

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
                        className={inputClass}
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
                        className={inputClass}
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
                        placeholder="+91 98765 43210"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="party-size">Guests</FieldLabel>
                      {isCouple ? (
                        <p
                          id="party-size"
                          className="h-10 px-3 flex items-center text-[13px] text-kynta-charcoal bg-kynta-section-bg border border-kynta-border/40 rounded-md"
                        >
                          2 guests (couple)
                        </p>
                      ) : (
                        <select
                          id="party-size"
                          disabled={isLoading}
                          value={guests}
                          onChange={(event) =>
                            setGuests(Number(event.target.value))
                          }
                          className={inputClass}
                        >
                          {Array.from(
                            { length: MAX_GUESTS },
                            (_, i) => i + 1,
                          ).map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel htmlFor="target-date" required>
                        Date
                      </FieldLabel>
                      <input
                        id="target-date"
                        name="target-date"
                        type="date"
                        required
                        min={minDate}
                        disabled={isLoading}
                        className={inputClass}
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
                        className={inputClass}
                      />
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

                  {item && option && quote && (
                    <div className="rounded-md border border-kynta-border/50 bg-kynta-section-bg px-4 py-3 text-[12.5px] text-kynta-charcoal">
                      <div className="flex justify-between gap-3">
                        <span>
                          {item.name} · {option.minutes} min
                          {quote.quantity > 1 &&
                            ` · ${formatInr(option.price * 100)} × ${quote.quantity}`}
                        </span>
                        <span>{formatInr(quote.subtotalPaise)}</span>
                      </div>
                      {quote.taxPaise > 0 && (
                        <div className="flex justify-between gap-3 text-kynta-warm-gray mt-1">
                          <span>GST ({gstPercent}%)</span>
                          <span>{formatInr(quote.taxPaise)}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-3 font-semibold border-t border-kynta-border/50 mt-2 pt-2">
                        <span>Total to pay</span>
                        <span>{formatInr(quote.totalPaise)}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

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

              {canBookOnline && (
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-1">
                  <div className="flex flex-col gap-1.5 max-w-[260px]">
                    <p className="text-[11px] leading-[1.5] text-kynta-warm-gray">
                      Please arrive 15 minutes early. Cancel at least 4 working
                      hours before; late cancellations are charged 50%.
                    </p>
                    <CallToBook
                      compact
                      locationName={location?.name}
                      phone={phone}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !quote}
                    aria-busy={isLoading}
                    className="px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-kynta-teal-dark rounded-md hover:bg-kynta-teal transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading
                      ? status.kind === "loading"
                        ? status.label
                        : "Processing…"
                      : quote
                        ? `Pay ${formatInr(quote.totalPaise)}`
                        : "Book Now"}
                  </button>
                </div>
              )}

              {!location && (
                <CallToBook compact phone={fallbackPhone || DEFAULT_PHONE} />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
