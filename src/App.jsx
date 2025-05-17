import ContactList from "./ContactList";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddContact from "./AddContact";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/addcontact" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
