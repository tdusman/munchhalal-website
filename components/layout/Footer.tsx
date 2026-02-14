import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="https://cdn.prod.website-files.com/645fd27cc7fb9e94b1de9389/656bdb4bf280747c28f41b3a_mh-logo-cropped-png.png"
                alt="Munchhalal Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Discover certified halal restaurants across Canada. Your trusted
              guide to halal dining.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Discover
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurants"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?subject=Advertising"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/munchhalal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary hover:bg-surface2/80 transition-all"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/munchhalal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary hover:bg-surface2/80 transition-all"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/munchhalal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary hover:bg-surface2/80 transition-all"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © 2026 Munchhalal.ca — All Rights Reserved
          </p>
          <p className="text-xs text-muted/60">
            Halal restaurant listings across Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
