import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "./Preloader";

export default function AddContact({ contacts, setContacts }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumerError, setPhoneNumberError] = useState("");
  const [showPreloader, setShowPreloader] = useState("");
  const [contactImage, setContactImage] = useState(null);

  const navigate = useNavigate();

  const addNewContact = () => {
    const newContact = {
      id: Date.now(),
      Name: fullName,
      PhoneNumber: phoneNumber,
      City: city,
      Description: description,
      Image: contactImage ? URL.createObjectURL(contactImage) : null, // store image URL
    };

    if (fullName.trim() === "") {
      setFullNameError("Field required !");
    } else if (phoneNumber.trim() === "") {
      setPhoneNumberError("Field required !");
    } else {
      setShowPreloader(true);
      setTimeout(() => {
        setContacts([...contacts, newContact]);
        setFullName("");
        setPhoneNumber("");
        setCity("");
        setDescription("");
        navigate("/contactList");
        setShowPreloader(false);
      }, 1100);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl p-6">
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Add Contact
          </h2>

          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
              <img
                src={
                  contactImage
                    ? URL.createObjectURL(contactImage)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        fullName || "Contact"
                      )}&background=0D8ABC&color=fff&rounded=true&size=128`
                }
                alt="Contact"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-md cursor-pointer transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setContactImage(file);
                }}
              />
              <img
                src="./src/assets/AddPhoto.svg"
                alt="Add"
                className="w-5 h-5 invert"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter full name"
            />
            <span className="text-sm text-red-500">{fullNameError}</span>
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
            <span className="text-sm text-red-500">{phoneNumerError}</span>
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
          <button
            onClick={() => addNewContact()}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Save Contact
          </button>
        </div>
      </div>
      <Preloader showPreloader={showPreloader} />
    </div>
  );
}
