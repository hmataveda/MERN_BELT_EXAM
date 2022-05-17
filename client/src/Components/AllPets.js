import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AllPets() {
  const navigate = useNavigate();
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/pet/${id}`)
      .then((res) => {
        console.log(res.data);
        setallPets(allPets.filter((pet) => pet._id != id));
      })
      .catch((err) => {
        console.log("Getting error in Client Delete Pet", err);
      });
  };

  // const display = allPets.map((pet) => {
  //   return (
  //     <div key={pet._id} className="border m-2 p-4">
  //       <i
  //         className={"bi bi-hand-thumbs-up-fill"}
  //         onClick={(e) => {
  //           console.log(e.target.classList.add("disableIt"));
  //           console.log(e.target.classList);
  //         }}
  //       ></i>
  //       <h3>{pet.name}</h3>
  //       <p>{pet.description}</p>
  //       <p>{pet.type}</p>
  //       <p>{pet.skills.join(" ")}</p>
  //       <button onClick={() => navigate(`/edit/${pet._id}`, { state: pet })}>
  //         Update
  //       </button>
  //       |
  //       <button onClick={() => navigate(`/pet/${pet._id}`, { state: pet })}>
  //         Details
  //       </button>
  //     </div>
  //   );
  // });

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
    <div>
      <div className="nav">
        <h1>Pet Shelter</h1>
        <Link to="/new" className="mx-5 px-5 pt-3">
          Add a pet to the shelter
        </Link>
      </div>
      <h3>These pets are looking for a good home</h3>
      <table className="mx-4">
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
