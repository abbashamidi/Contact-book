import EachContact from "./EachContact";
import { UserX } from "lucide-react";

export default function ContactGrid({ contacts, onDelete, onEdit }) {
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-500 mt-10">
        <UserX size={48} />
        <p className="text-xl mt-4">
          No contacts available. Start by adding one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <EachContact
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
