export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md rounded-3xl bg-white/80 p-8 text-center text-gray-700 shadow-xl ring-1 ring-rose-100">
        <h1 className="mb-3 text-3xl font-extrabold text-rose-700">
          Page not found
        </h1>
        <p className="text-sm mb-4">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <p className="text-xs text-gray-500">
          Check the URL or go back to the home page from the navigation bar.
        </p>
      </div>
    </div>
  );
}
