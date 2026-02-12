import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="https://cdn.prod.website-files.com/645fd27cc7fb9e94b1de9389/656bdb4bf280747c28f41b3a_mh-logo-cropped-png.png"
            alt="Munchhalal Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold font-heading tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-muted mb-8 text-lg">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-all btn-press"
          >
            Go Home
          </Link>
          <Link
            href="/restaurants"
            className="px-6 py-3 bg-transparent border border-zinc-700 hover:border-primary text-text font-semibold rounded-lg transition-all"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
}
