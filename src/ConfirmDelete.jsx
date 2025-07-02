export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="bg-gray-100 rounded-lg shadow-xl max-w-sm mx-auto p-6 space-y-6 animate-fade-in">
        <p id="confirm-delete-title" className="font-semibold text-gray-800 text-lg">
          Are you sure you want to delete the contact?
        </p>

        <div id="confirm-delete-desc" className="flex items-center justify-center gap-8">
          <button
            onClick={onConfirm}
            className="rounded bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white px-4 py-2 shadow transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="rounded bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white px-4 py-2 shadow transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
