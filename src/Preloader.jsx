export default function Preloader({showPreloader}) {
    if(!showPreloader) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200 animate-fade-in">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          
          <p className="text-gray-700 text-lg font-medium">Saving Changes...</p>
        </div>
      </div>
    );
  }
  