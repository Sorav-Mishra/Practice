import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function TestAuth() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    alert(`Saved: Name - ${name}, Phone - ${phone}`);
    // Here you can send data to a backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        {session ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome, {session.user?.name}!
            </h2>
            <p className="text-gray-600 mb-2">{session.user?.email}</p>
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
            />

            {/* Name Input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md mb-3"
            />

            {/* Phone Input */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded-md mb-4"
            />

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition w-full mb-3"
            >
              Save Details
            </button>

            {/* Sign Out Button */}
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition w-full"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sign in to continue
            </h2>
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}
