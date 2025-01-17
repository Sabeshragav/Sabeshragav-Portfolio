import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen black_gray_gradient text-gray-100">
      <h1 className="text-5xl font-bold mb-4 text-center text-red-600">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
