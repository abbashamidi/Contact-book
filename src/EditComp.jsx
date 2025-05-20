import { useState } from "react";

export default function EditComp({ onSave, onCancel, contactToEdit }) {
  const [name, setName] = useState(contactToEdit?.Name || "");
  const [phoneNumber, setPhoneNumber] = useState(
    contactToEdit?.PhoneNumber || ""
  );
  const [city, setCity] = useState(contactToEdit?.City || "");
  const [description, setDescription] = useState(
    contactToEdit?.Description || ""
  );

  const handleSave = () => {
    const updatedContact = {
      ...contactToEdit,
      Name: name.trim(),
      PhoneNumber: phoneNumber.trim(),
      City: city.trim(),
      Description: description.trim(),
    };
    onSave(updatedContact);
  };

  return (
    <div className="fixed bg-black bg-opacity-40 inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Edit Contact</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
