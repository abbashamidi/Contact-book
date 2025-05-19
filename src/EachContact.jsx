export default function EachContact({ contacts, onDelete }) {







  return (
    <>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {contact.Name}
          </h2>
          <p className="text-gray-600">
            <strong>Phone:</strong> {contact.PhoneNumber}
          </p>
          <p className="text-gray-600">
            <strong>City:</strong> {contact.City}
          </p>
          <p className="text-gray-600 mt-2 whitespace-pre-line">
            <strong>About:</strong> {contact.Description || "No description"}
          </p>
          <div className="flex gap-1 mt-2">
            <button onClick={() => onDelete(contact.id)} className="bg-red-500 text-white px-2 w-16 rounded-lg py-1">Delete</button> <button className="bg-blue-500 text-white px-2 w-16 rounded-lg py-1">Edit</button>
          </div>
        </div>
      ))}
    </>
  );
}
