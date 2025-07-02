import { useState, useEffect, useCallback } from "react";
import EachContact from "./EachContact";

function SearchModalInput({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search by name or phone number"
      className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function SearchModalResults({ filteredContacts, onDelete, onEdit }) {
  if (filteredContacts.length === 0) {
    return (
      <p className="text-gray-500 text-center">No matching contacts found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <EachContact
        contacts={filteredContacts}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default function SearchModal({
  isVisible,
  contacts,
  onClose,
  onDelete,
  onEdit,
}) {
  const [query, setQuery] = useState("");

  // بعد از بستن قسمت جست و جو input رو پاکسازی میکنه
  useEffect(() => {
    if (!isVisible) {
      setQuery("");
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.Name.toLowerCase().includes(query.toLowerCase()) ||
      contact.PhoneNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in relative h-[80vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="font-semibold text-lg text-gray-800 mb-3 text-center">
          Search Contact
        </h2>

        <SearchModalInput query={query} setQuery={setQuery} />

        <div className="overflow-y-auto max-h-[55vh] pr-2">
          <SearchModalResults
            filteredContacts={filteredContacts}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  );
}
