import AddContactAvatarUploader from "./AddContactAvatarUploader";
import AddContactFormField from "./AddContactFormField";
import Preloader from "./Preloader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact({ contacts, setContacts }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    description: "",
    fullNameError: "",
    phoneNumberError: "",
    contactImage: null,
    showPreloader: false,
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewContact = async () => {
    setFormData((prev) => ({
      ...prev,
      fullNameError: "",
      phoneNumberError: "",
    }));
  
    if (formData.fullName.trim() === "") {
      setFormData((prev) => ({ ...prev, fullNameError: "Field required!" }));
      return;
    }
    if (formData.phoneNumber.trim() === "") {
      setFormData((prev) => ({ ...prev, phoneNumberError: "Field required!" }));
      return;
    }
  
    setFormData((prev) => ({ ...prev, showPreloader: true }));

    // از این تابع برای تبدیل عکس قابل نگهداری استفاده میکنیم
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
  

    let imageBase64 = null;
    if (formData.contactImage) {
      try {
        imageBase64 = await fileToBase64(formData.contactImage);
      } catch (error) {
        console.error("Error converting image to base64:", error);
        imageBase64 = null;
      }
    }
  
    const newContact = {
      id: Date.now(),
      Name: formData.fullName,
      PhoneNumber: formData.phoneNumber,
      City: formData.city,
      Description: formData.description,
      Image: imageBase64,
    };
  
    setTimeout(() => {
      setContacts([...contacts, newContact]);
      setFormData({
        fullName: "",
        phoneNumber: "",
        city: "",
        description: "",
        fullNameError: "",
        phoneNumberError: "",
        contactImage: null,
        showPreloader: false,
      });
      navigate("/contactList");
    }, 1100);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add Contact</h2>
          <AddContactAvatarUploader
            fullName={formData.fullName}
            contactImage={formData.contactImage}
            setContactImage={(image) => handleChange("contactImage", image)}
          />
        </div>

        <div className="space-y-2.5">
          <AddContactFormField
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter full name"
            error={formData.fullNameError}
          />
          <AddContactFormField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="Enter phone number"
            error={formData.phoneNumberError}
          />
          <AddContactFormField
            label="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Enter city"
          />
          <AddContactFormField
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Additional details..."
            textarea
          />
        </div>

        <div className="text-center mt-4">
          <button
            onClick={addNewContact}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Save Contact
          </button>
        </div>
      </div>

      <Preloader showPreloader={formData.showPreloader} />
    </div>
  );
}
