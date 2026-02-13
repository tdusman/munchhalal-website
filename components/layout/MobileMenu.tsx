"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-surface border-l border-border animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <Image
              src="https://cdn.prod.website-files.com/645fd27cc7fb9e94b1de9389/656bdb4bf280747c28f41b3a_mh-logo-cropped-png.png"
              alt="Munchhalal Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-text transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-3 text-base font-medium text-muted hover:text-text hover:bg-surface2 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border my-4" />
          <Link
            href="/contact?subject=Restaurant+Owner"
            onClick={onClose}
            className="block text-center px-4 py-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-all btn-press"
          >
            List Your Restaurant
          </Link>
        </div>
      </div>
    </div>
  );
}
