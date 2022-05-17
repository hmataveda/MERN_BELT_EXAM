import React from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SinglePet() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pet, setPet] = useState(state || {});
  const { id } = useParams();

  useEffect(() => {
    if (id && !state) {
      console.log("coming here");
      axios
        .get(`http://localhost:8000/api/pet/${id}`)
        .then((res) => {
          console.log(
            "Fetched single pet from axios in Details page",
            res.data
          );
          setPet(res.data);
        })
        .catch((err) => {
          console.log(
            "Error in Clinet side while Fetching the Single Pet",
            err
          );
        });
    }
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/pet/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Getting error in Client Delete Pet", err);
      });
  };

  return (
    <>
      <div>
        <p>Pet Name :{pet.name}</p>
        <p>Pet description :{pet.description}</p>
        <p>Pet Type : {pet.type}</p>
      </div>
      <button onClick={() => navigate("/")}>home</button>
      <button onClick={() => handleDelete(pet._id)}>Delete</button>
      <button onClick={() => navigate(`/edit/${pet._id}`, { state: pet })}>
        Update
      </button>
    </>
  );
}

export default SinglePet;
