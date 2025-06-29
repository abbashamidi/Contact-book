import { useState } from "react";

export default function EditComp({ onSave, onCancel, contactToEdit }) {
  const [name, setName] = useState(contactToEdit.Name);
  const [phoneNumber, setPhoneNumber] = useState(contactToEdit.PhoneNumber);
  const [city, setCity] = useState(contactToEdit?.City || "");
  const [description, setDescription] = useState(
    contactToEdit?.Description || ""
  );
  const [image, setImage] = useState(contactToEdit?.Image || null);
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSave = () => {
    if (name.trim() === "") {
      setNameError("Field required !");
    } else if (phoneNumber.trim() === "") {
      setPhoneNumberError("Field required !");
    } else {
      const updatedContact = {
        ...contactToEdit,
        Name: name.trim(),
        PhoneNumber: phoneNumber.trim(),
        City: city.trim(),
        Description: description.trim(),
        Image: image,
      };
      onSave(updatedContact);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  return (
    <div className="fixed bg-black bg-opacity-40 inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col items-center gap-3 relative">
          {/* Avatar Container */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            {image ? (
              <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
                <img
                  src={image}
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 text-white flex items-center justify-center text-3xl font-bold border border-gray-300">
                {name?.charAt(0) || "?"}
              </div>
            )}

            {/* Always-visible Add/Edit Button */}
            <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-md cursor-pointer transition z-10">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <img
                src="./src/assets/AddPhoto.svg"
                alt="Edit"
                className="w-5 h-5 invert"
              />
            </label>

            {/* Only show remove button if image is present */}
            {image && (
              <button
                onClick={() => setImage(null)}
                className="absolute -top-2 -left-2 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-full p-1.5 shadow-lg z-10"
                title="Remove Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 
        1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
        1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
        10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-800">Edit Contact</h2>
        </div>

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
            <p className="text-red-500">{nameError}</p>
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
            <p className="text-red-500">{phoneNumberError}</p>
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
