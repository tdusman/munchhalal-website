"use client";

import { useState } from "react";
import { getSignups, addSignup } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!consent) {
      setError("Please agree to receive emails.");
      return;
    }

    const signups = getSignups();
    if (signups.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      setError("This email is already signed up.");
      return;
    }

    addSignup({
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      consentGiven: true,
      signedUpAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4889D4] via-[#5A9EEB] to-[#7AB8F5] p-8 sm:p-12 lg:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <Mail className="w-10 h-10 text-black/30 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-black tracking-tight mb-3">
              Stay Updated on New Halal Spots
            </h2>
            <p className="text-black/70 mb-8">
              Get notified when new halal restaurants join Munchhalal in your
              city.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-3 text-black font-semibold text-lg">
                <CheckCircle className="w-6 h-6" />
                <span>You&apos;re on the list! 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 focus:border-white focus:ring-1 focus:ring-white/30 text-black placeholder:text-black/50 rounded-lg px-4 py-3 outline-none font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 focus:border-white focus:ring-1 focus:ring-white/30 text-black placeholder:text-black/50 rounded-lg px-4 py-3 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-primary font-bold rounded-lg hover:bg-zinc-900 transition-all btn-press"
                  >
                    Subscribe
                  </button>
                </div>
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="rounded border-white/30 bg-white/20 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-black/70">
                    I agree to receive emails from Munchhalal
                  </span>
                </label>
                {error && (
                  <p className="text-sm font-semibold text-red-900">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
