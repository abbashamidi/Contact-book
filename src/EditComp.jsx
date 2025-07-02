import { useState, useEffect } from "react";

export default function EditComp({ onSave, onCancel, contactToEdit }) {
  const [formData, setFormData] = useState({
    name: contactToEdit.Name,
    phoneNumber: contactToEdit.PhoneNumber,
    city: contactToEdit?.City || "",
    description: contactToEdit?.Description || "",
    image: contactToEdit?.Image || null,
  });

  const [errors, setErrors] = useState({
    nameError: "",
    phoneNumberError: "",
  });

  // فقط وقتی کامپوننت unmount می‌شود، URL revoke شود
  useEffect(() => {
    return () => {
      if (
        formData.image &&
        typeof formData.image === "string" &&
        formData.image.startsWith("blob:")
      ) {
        URL.revokeObjectURL(formData.image);
      }
    };
  }, []);

  const handleSave = () => {
    let valid = true;
    const newErrors = { nameError: "", phoneNumberError: "" };

    if (formData.name.trim() === "") {
      newErrors.nameError = "Field required!";
      valid = false;
    }
    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumberError = "Field required!";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    const updatedContact = {
      ...contactToEdit,
      Name: formData.name.trim(),
      PhoneNumber: formData.phoneNumber.trim(),
      City: formData.city.trim(),
      Description: formData.description.trim(),
      Image: formData.image,
    };
    onSave(updatedContact);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === "name" && errors.nameError) {
      setErrors((prev) => ({ ...prev, nameError: "" }));
    }
    if (field === "phoneNumber" && errors.phoneNumberError) {
      setErrors((prev) => ({ ...prev, phoneNumberError: "" }));
    }
  };

  const isSaveDisabled = !formData.name.trim() || !formData.phoneNumber.trim();

  return (
    <div className="fixed bg-black bg-opacity-40 inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col items-center gap-3 relative">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            {formData.image ? (
              <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
                <img
                  src={formData.image}
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 text-white flex items-center justify-center text-3xl font-bold border border-gray-300">
                {formData.name?.charAt(0) || "?"}
              </div>
            )}

            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-md cursor-pointer transition z-10"
              aria-label="Upload contact image"
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <img
                src="./src/assets/AddPhoto.svg"
                alt="Edit icon"
                className="w-5 h-5 invert"
                aria-hidden="true"
              />
            </label>

            {formData.image && (
              <button
                onClick={() =>
                  setFormData((prev) => ({ ...prev, image: null }))
                }
                className="absolute -top-2 -left-2 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 rounded-full p-1.5 shadow-lg z-10"
                title="Remove Image"
                aria-label="Remove contact image"
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
            <label
              htmlFor="name-input"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name-input"
              type="text"
              value={formData.name}
              onChange={onInputChange("name")}
              aria-describedby="name-error"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.nameError && (
              <p id="name-error" className="text-red-500" role="alert">
                {errors.nameError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone-input"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone-input"
              type="text"
              value={formData.phoneNumber}
              onChange={onInputChange("phoneNumber")}
              aria-describedby="phone-error"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.phoneNumberError && (
              <p id="phone-error" className="text-red-500" role="alert">
                {errors.phoneNumberError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="city-input"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              id="city-input"
              type="text"
              value={formData.city}
              onChange={onInputChange("city")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="desc-input"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="desc-input"
              value={formData.description}
              onChange={onInputChange("description")}
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
            disabled={isSaveDisabled}
            className={`px-4 py-2 rounded-lg text-white ${
              isSaveDisabled
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
