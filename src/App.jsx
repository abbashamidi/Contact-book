import ContactList from "./ContactList";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AddContact from "./AddContact";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/contactList" replace />} />
        <Route
          path="/contactList"
          element={
            <ContactList contacts={contacts} setContacts={setContacts} />
          }
        />
        <Route
          path="/addcontact"
          element={<AddContact contacts={contacts} setContacts={setContacts} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
