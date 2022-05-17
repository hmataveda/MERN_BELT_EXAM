import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function AllPets() {
  const [allPets, setallPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((result) => {
        setallPets(result.data);
      })
      .catch((err) => {
        console.log("Getting error in Client GetALLPETS", err);
      });
  }, []);

  const tbody = allPets.map((pet) => {
    return (
      <tr key={pet._id}>
        <td>{pet.name} </td>
        <td>{pet.type} </td>
        <td>
          <Link to={`/pet/${pet._id}`} state={pet}>
            details
          </Link>
          <span> | </span>
          <Link to={`/edit/${pet._id}`} state={pet}>
            edit
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="body">
      <div className="nav">
        <h1>Pet Shelter</h1>
        <Link to="/new" className="links">
          Add a pet to the shelter
        </Link>
      </div>
      <h3>These pets are looking for a good home</h3>
      <table className="mx-3 mt-5">
        <thead>
          <tr>
            <td>Name</td>
            <td>Type</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
}

export default AllPets;
