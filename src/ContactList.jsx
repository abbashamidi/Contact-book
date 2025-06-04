import EachContact from "./EachContact";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { useEffect, useState } from "react";
import EditComp from "./EditComp";
import SearchModal from "./SearchModal";
import Preloader from "./Preloader";

export default function ContactList({ contacts, setContacts }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  const handleClickDelete = (id) => {
    setContactToDelete(id);
    setShowConfirm(true);
  };

  const handleEditClick = (contact) => {
    setContactToEdit(contact);
    setIsEditing(true);
    setShowSearchModal(false); 
  };

  const handleSaveEdit = (updatedContact) => {
    setShowPreloader(true);
    setShowSearchModal(false);
  
    setTimeout(() => {
      setContacts((prev) =>
        prev.map((c) => (c.id === updatedContact.id ? updatedContact : c))
      );
      setShowPreloader(false);
      setIsEditing(false);
      setContactToEdit(null);
    }, 1100);
  };
  

  const takeToAddContact = () => {
    navigate("/addcontact");
  };

  return (
    <div className="p-10 flex flex-col gap-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800">My Contacts</h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={takeToAddContact}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow transition text-sm sm:text-base"
          >
            + Add Contact
          </button>
          <button
            onClick={() => setShowSearchModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow transition text-sm sm:text-base"
          >
            Search Contact
          </button>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-xl">
          No contacts available. Start by adding one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EachContact
            contacts={contacts}
            onDelete={handleClickDelete}
            onEdit={handleEditClick}
          />
        </div>
      )}

      {showConfirm && (
        <ConfirmDelete
          onConfirm={() => {
            setShowPreloader(true); 

            setTimeout(() => {
              setContacts(
                contacts.filter((contact) => contact.id !== contactToDelete)
              );
              setShowConfirm(false);
              setContactToDelete(null);
              setShowPreloader(false);
            }, 1100);
          }}
          onCancel={() => {
            setShowConfirm(false);
            setContactToDelete(null);
          }}
        />
      )}

      {isEditing && (
        <EditComp
          contactToEdit={contactToEdit}
          onSave={handleSaveEdit}
          onCancel={() => {
            setIsEditing(false);
            setContactToEdit(null);
          }}
        />
      )}

      <SearchModal
        isVisible={showSearchModal}
        contacts={contacts}
        onDelete={handleClickDelete}
        onEdit={handleEditClick}
        onClose={() => setShowSearchModal(false)}
      />
      <Preloader showPreloader={showPreloader} />
    </div>
  );
}
