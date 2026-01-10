import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <h3 className="font-display text-xl font-semibold text-text">
            Compass Digital Services
          </h3>
          <p className="text-sm text-text/70">
            Strategy, design, and development for modern brands. We build websites,
            apps, and revenue systems that feel effortless.
          </p>
        </div>
        <div className="space-y-2 text-sm text-text/70">
          <p className="font-semibold text-text">Company</p>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/reviews">Reviews</Link>
        </div>
        <div className="space-y-2 text-sm text-text/70">
          <p className="font-semibold text-text">Get in touch</p>
          <p>hello@compassdigitalservices.com</p>
          <p>Dubai, UAE</p>
          <Link href="/contact" className="font-semibold text-text">
            Start a project
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-text/60">
        ? {new Date().getFullYear()} Compass Digital Services. All rights reserved.
      </div>
    </footer>
  );
}
