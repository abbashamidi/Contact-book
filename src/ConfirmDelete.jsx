export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg shadow-xl max-w-sm mx-auto p-6 space-y-6">
        <p className="font-semibold">
          Are you sure you want to delete the contact?
        </p>
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={onConfirm}
            className="rounded text-white bg-blue-500 px-2 py-0.5 w-1/5 shadow-2xl"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="rounded text-white bg-red-500 px-2 py-0.5 w-1/5 shadow-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
