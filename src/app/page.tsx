"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative bg-blue-600 text-white h-[400px] w-full flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          SSC Exam Practice Questions
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Prepare with <span className="font-bold">20,000+</span> questions in
          English & GK to boost your success in SSC Exams.
        </p>
        <button
          onClick={() => router.push("/ssc")}
          className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
}
