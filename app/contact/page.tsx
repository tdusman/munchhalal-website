'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { addContact } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { Mail, Clock, Send, CheckCircle, Instagram, Facebook, Twitter } from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(searchParams.get('subject') || 'General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (message.trim().length < 20) {
      setError('Message must be at least 20 characters.');
      return;
    }

    addContact({
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('General Inquiry');
    setMessage('');
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 lg:pt-32 pb-12 lg:pb-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-muted text-lg">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-surface border border-green/30 rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green mx-auto mb-4" />
                <h3 className="text-xl font-bold font-heading mb-2">Message Sent!</h3>
                <p className="text-muted mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-3 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-3 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-surface2 border border-border focus:border-primary text-text rounded-lg px-4 py-3 outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Restaurant Owner</option>
                    <option>Advertising</option>
                    <option>Report Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">Message *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-3 outline-none transition-all resize-none"
                    placeholder="Tell us how we can help (min. 20 characters)"
                  />
                </div>
                {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-all btn-press"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Email Us</h3>
                  <a href="mailto:hello@munchhalal.ca" className="text-sm text-primary hover:underline">
                    hello@munchhalal.ca
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Response Time</h3>
                  <p className="text-sm text-muted">Within 24–48 hours</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-sm mb-3">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com/munchhalal" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com/munchhalal" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com/munchhalal" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-sm text-muted mb-2">Looking for restaurant info?</p>
              <a href="/faq" className="text-sm font-semibold text-primary hover:underline">
                Visit our FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ContactContent />
    </Suspense>
  );
}
