import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
      <div className="text-center max-w-xl">
        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold tracking-tight text-red-500">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 transition font-medium"
          >
            Go Home
          </Link>

          <Link
            href="/category/wwe"
            className="px-6 py-3 rounded-md border border-gray-600 hover:bg-gray-700 transition font-medium"
          >
            WWE
          </Link>

          <Link
            href="/category/free-fire"
            className="px-6 py-3 rounded-md border border-gray-600 hover:bg-gray-700 transition font-medium"
          >
            Free Fire
          </Link>
        </div>

        {/* Branding */}
        <p className="mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Human Talking — Sports & Gaming News
        </p>
      </div>
    </main>
  );
}
