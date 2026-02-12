"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/map", label: "Map" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="https://cdn.prod.website-files.com/645fd27cc7fb9e94b1de9389/656bdb4bf280747c28f41b3a_mh-logo-cropped-png.png"
                alt="Munchhalal Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold font-heading text-primary group-hover:text-primary-dark transition-colors">
                Munchhalal
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-text transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact?subject=Restaurant+Owner"
                className="hidden sm:inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-black font-bold text-sm rounded-lg transition-all btn-press"
              >
                List Your Restaurant
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-muted hover:text-text transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
