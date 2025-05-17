import { useState } from "react";

export default function AddContact() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add Contact 
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              rows="4"
              placeholder="Additional details..."
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}
