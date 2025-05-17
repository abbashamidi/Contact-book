import { useState } from "react";
import EachContact from "./EachContact";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [Contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const takeToAddContact = () => {
    navigate("/addcontact");
  };

  return (
    <div className="flex-col flex justify-center items-center gap-10 pt-10">
      <button
        onClick={takeToAddContact}
        className="text-white px-1 py-0.5 bg-blue-500 rounded"
      >
        Add Contact
      </button>

      <h1>Contacts:</h1>

      {Contacts.length === 0 ? (
        <h1>No Contacts Yet</h1>
      ) : (
        <div className="flex">
          <EachContact Contacts={Contacts} />
        </div>
      )}
    </div>
  );
}
