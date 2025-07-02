import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ContactListHeader from "./ContactListHeader";
import ContactGrid from "./ContactGrid";
import ConfirmDelete from "./ConfirmDelete";
import EditComp from "./EditComp";
import SearchModal from "./SearchModal";
import Preloader from "./Preloader";

export default function ContactList({ contacts, setContacts }) {
  const navigate = useNavigate();

  const [uiState, setUIState] = useState({
    showConfirm: false,
    contactToDelete: null,
    isEditing: false,
    contactToEdit: null,
    showSearchModal: false,
    showPreloader: false,
  });

  const handleDeleteClick = (id) => {
    setUIState(prev => ({
      ...prev,
      showConfirm: true,
      contactToDelete: id,
    }));
  };

  const confirmDelete = () => {
    setUIState(prev => ({ ...prev, showPreloader: true }));

    setTimeout(() => {
      setContacts(prevContacts =>
        prevContacts.filter(c => c.id !== uiState.contactToDelete)
      );
      setUIState((prev) => ({
        ...prev,
        showConfirm: false,
        contactToDelete: null,
        showPreloader: false,
      }));
    }, 1100);
  };

  const handleEditClick = (contact) => {
    setUIState(prev => ({
      ...prev,
      contactToEdit: contact,
      isEditing: true,
    }));
  };

  const handleSaveEdit = (updatedContact) => {
    setUIState(prev => ({ ...prev, showPreloader: true }));

    setTimeout(() => {
      setContacts(prevContacts =>
        prevContacts.map((c) =>
          c.id === updatedContact.id ? updatedContact : c
        )
      );
      setUIState((prev) => ({
        ...prev,
        isEditing: false,
        contactToEdit: null,
        showPreloader: false,
      }));
    }, 1100);
  };

  const goToAddContact = () => navigate("/addcontact");

  return (
    <div className="p-6 sm:p-10 flex flex-col gap-8 min-h-screen bg-gray-50">
      <ContactListHeader
        onAddContact={goToAddContact}
        onSearch={() =>
          setUIState(prev => ({ ...prev, showSearchModal: true }))
        }
      />

      <ContactGrid
        contacts={contacts}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      {uiState.showConfirm && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={() =>
            setUIState(prev => ({
              ...prev,
              showConfirm: false,
              contactToDelete: null,
            }))
          }
        />
      )}

      {uiState.isEditing && (
        <EditComp
          contactToEdit={uiState.contactToEdit}
          onSave={handleSaveEdit}
          onCancel={() =>
            setUIState((prev) => ({
              ...prev,
              isEditing: false,
              contactToEdit: null,
            }))
          }
        />
      )}

      <SearchModal
        isVisible={uiState.showSearchModal}
        contacts={contacts}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
        onClose={() =>
          setUIState((prev) => ({ ...prev, showSearchModal: false }))
        }
      />

      <Preloader showPreloader={uiState.showPreloader} />
    </div>
  );
}
