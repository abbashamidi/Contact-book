export default function AddContactFormField({ label, value, onChange, placeholder, error, textarea }) {
    const commonProps = {
      value,
      onChange,
      placeholder,
      className:
        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black",
    };
  
    return (
      <div>
        <label className="block text-gray-600 mb-1">{label}</label>
        {textarea ? (
          <textarea {...commonProps} rows={4} />
        ) : (
          <input type="text" {...commonProps} />
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
  