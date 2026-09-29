import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  href?: string;
}

export function Logo({ href = "/" }: LogoProps) {
  const content = (
    <Image
      src="/kynta-logo-full.png"
      alt="Kynta Wellness Group"
      width={200}
      height={60}
      className="h-10 w-auto object-contain"
      priority
    />
  );

  return href ? (
    <Link href={href} className="flex-shrink-0">
      {content}
    </Link>
  ) : (
    <div className="flex-shrink-0">{content}</div>
  );
}
