import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AllPets from "./Components/AllPets";
import SinglePet from "./Components/SinglePet";
import PetForm from "./Components/PetForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/app" />}></Route>
        <Route path="/app" element={<AllPets />} /> // Read All
        <Route path="/pet/:id" element={<SinglePet />} /> // Read Single
        <Route path="/new" element={<PetForm />} /> // Create New
        <Route path="/edit/:id" element={<PetForm />} /> // update
      </Routes>
    </div>
  );
}

export default App;
