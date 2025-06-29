export default function EachContact({ contacts, onDelete, onEdit }) {
  return (
    <>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar Placeholder */}
            {contact.Image ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={contact.Image}
                  alt={contact.Name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                {contact.Name?.charAt(0) || "?"}
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {contact.Name}
              </h2>
              <p className="text-gray-600">
                <strong>Phone:</strong> {contact.PhoneNumber}
              </p>
              <p className="text-gray-600">
                <strong>City:</strong> {contact.City?.trim() || "?"}
              </p>
            </div>
          </div>

          <p className="text-gray-600 mt-2 whitespace-pre-line">
            <strong>About:</strong> {contact.Description || "No description"}
          </p>

          <div className="flex gap-1 mt-4">
            <button
              onClick={() => onDelete(contact.id)}
              className="bg-red-500 text-white px-2 w-16 rounded-lg py-1"
            >
              Delete
            </button>
            <button
              onClick={() => onEdit(contact)}
              className="bg-blue-500 text-white px-2 w-16 rounded-lg py-1"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
