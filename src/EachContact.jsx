const DefaultAvatar = () => (
  <svg
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <circle cx="64" cy="64" r="64" fill="#E0E0E0" />
    <circle cx="64" cy="50" r="24" fill="#BDBDBD" />
    <path d="M24,112c0-22.09,17.91-40,40-40s40,17.91,40,40" fill="#BDBDBD" />
  </svg>
);

export default function EachContact({ contact, onDelete, onEdit }) {
  const { id, Name, PhoneNumber, City, Description, Image } = contact;

  return (
    <div
      key={id}
      className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
      role="listitem"
    >
      <div className="flex items-center gap-4 mb-4">
        {Image ? (
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
            <img
              src={Image}
              alt={Name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
            <DefaultAvatar />
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-800">{Name}</h2>
          <p className="text-gray-600">
            <strong>Phone:</strong> {PhoneNumber}
          </p>
          <p className="text-gray-600">
            <strong>City:</strong> {City?.trim() || "?"}
          </p>
        </div>
      </div>

      <p className="text-gray-600 mt-2 whitespace-pre-line">
        <strong>About:</strong> {Description || "No description"}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-white px-3 rounded-lg py-1 transition"
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(contact)}
          className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white px-3 rounded-lg py-1 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
