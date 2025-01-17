"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="black_gray_gradient flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-red-600 text-center">
        Authentication Error
      </h1>
      <p className="text-lg mb-6 text-center">
        {error || "An unknown error occurred."}
      </p>
      <button
        onClick={() => router.push("/login")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
      >
        Go Back to Log In
      </button>
    </div>
  );
}
