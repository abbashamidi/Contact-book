import { Camera } from "lucide-react";

export default function AddContactAvatarUploader({
  contactImage,
  setContactImage,
}) {
  // ✅ آواتار پیش‌فرض به صورت کامپوننت داخلی
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

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
      <div className="w-full h-full rounded-full overflow-hidden border border-gray-300 bg-white">
        {contactImage ? (
          <img
            src={URL.createObjectURL(contactImage)}
            alt="Contact"
            className="w-full h-full object-cover"
          />
        ) : (
          <DefaultAvatar />
        )}
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
        <Camera className="w-4 h-4" />
      </label>
    </div>
  );
}
