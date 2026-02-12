'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronDown, Search } from 'lucide-react';

const faqData = [
  {
    category: 'About Munchhalal',
    questions: [
      {
        q: 'What is Munchhalal.ca?',
        a: 'Munchhalal.ca is Canada\'s premier halal restaurant discovery platform. We help users find certified and self-declared halal restaurants across Canadian cities. Our platform provides detailed information including menus, photos, reviews, halal certification status, and directions to help you find the perfect halal dining experience.',
      },
      {
        q: 'Is Munchhalal available across all of Canada?',
        a: 'We are currently focused on the Greater Toronto Area (GTA) including Toronto, Mississauga, Brampton, Scarborough, and Ottawa. We are rapidly expanding to cover more Canadian cities including Vancouver, Calgary, Edmonton, Montreal, and more. Subscribe to our newsletter to be notified when we expand to your city!',
      },
      {
        q: 'How do I find halal restaurants near me?',
        a: 'Simply use the search bar on our homepage or visit the Restaurants page. You can search by restaurant name, cuisine type, or city. Use the radius filter to find restaurants within a specific distance from your location. You can also use our interactive Map page to browse restaurants visually.',
      },
    ],
  },
  {
    category: 'Halal Certification',
    questions: [
      {
        q: 'What does "Certified Halal" mean on Munchhalal?',
        a: 'A "Certified Halal" badge means the restaurant has been verified by a recognized halal certification body in Canada, such as ISNA Canada, HMA, or similar organizations. These restaurants undergo regular inspections to ensure their food preparation, ingredients, and sourcing meet halal standards.',
      },
      {
        q: 'What is the difference between Certified and Self-Declared halal?',
        a: '"Certified Halal" means the restaurant has been officially certified by a recognized halal authority. "Self-Declared" means the restaurant owner claims their food is halal, but they haven\'t been certified by an official body. We display this distinction clearly so you can make informed dining decisions.',
      },
      {
        q: 'How do I know if a restaurant is truly halal?',
        a: 'Look for the certification badge on the restaurant\'s profile. Certified restaurants have been verified by official halal bodies. You can also check the restaurant\'s website, ask the staff directly, or look for halal certificates displayed at the premises. We encourage restaurants to get certified and display their certifications prominently.',
      },
    ],
  },
  {
    category: 'For Restaurant Owners',
    questions: [
      {
        q: 'How do I list my restaurant on Munchhalal?',
        a: 'To list your restaurant, click the "List Your Restaurant" button in the navigation bar or visit our Contact page and select "Restaurant Owner" as the subject. Fill out the form with your restaurant details and our team will review and add your listing within 24-48 hours.',
      },
      {
        q: 'What is a Featured Listing and how do I get one?',
        a: 'A Featured Listing places your restaurant at the top of search results with a prominent badge, giving you maximum visibility. Featured restaurants appear first on the homepage, listing pages, and map. Contact us to learn about our Featured Listing plans and pricing.',
      },
      {
        q: 'How do I update my restaurant information?',
        a: 'To update your listing information (hours, address, menu, photos, etc.), contact us through the Contact page or email us at hello@munchhalal.ca. You can also click "Claim This Listing" on your restaurant\'s profile page. We\'ll verify your ownership and give you the ability to manage your listing.',
      },
      {
        q: 'Is it free to list my restaurant?',
        a: 'Yes! Basic listings on Munchhalal are completely free. We also offer upgraded plans (Basic and Featured) that provide additional benefits like priority placement, featured badges, and promotional opportunities. Contact us to learn more about these plans.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        q: 'How do I report incorrect restaurant information?',
        a: 'If you notice incorrect information on any restaurant listing, please contact us through the Contact page and select "Report Issue" as the subject. Include the restaurant name and the details that need correction. We\'ll investigate and update the listing promptly.',
      },
      {
        q: 'How can I advertise on Munchhalal?',
        a: 'We offer various advertising options including homepage banner ads, search result sponsorships, and sidebar promotions. Our ads reach thousands of halal food enthusiasts across Canada. Visit our Contact page and select "Advertising" to get started with a campaign tailored to your needs.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const filteredData = searchQuery
    ? faqData
        .map((section) => ({
          ...section,
          questions: section.questions.filter(
            (faq) =>
              faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.a.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((section) => section.questions.length > 0)
    : faqData;

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-24 lg:pt-32 pb-12 lg:pb-20 max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold font-heading tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted text-lg">
            Everything you need to know about Munchhalal
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-xl pl-12 pr-4 py-3.5 outline-none transition-all"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-8">
          {filteredData.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-bold font-heading text-primary mb-4">
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.questions.map((faq, i) => {
                  const id = `${section.category}-${i}`;
                  const isOpen = openIndex === id;

                  return (
                    <div
                      key={id}
                      className="bg-surface border border-border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(id)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface2/50 transition-colors"
                      >
                        <span className="text-sm font-medium pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4">
                          <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
