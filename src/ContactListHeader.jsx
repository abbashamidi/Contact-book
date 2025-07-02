export default function ContactListHeader({ onAddContact, onSearch }) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        My Contacts
      </h1>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onAddContact}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Add Contact
        </button>
        <button
          onClick={onSearch}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Search Contact
        </button>
      </div>
    </div>
  );
}
