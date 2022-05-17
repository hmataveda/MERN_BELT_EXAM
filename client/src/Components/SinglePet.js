import React from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SinglePet() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pet, setPet] = useState(state || {});
  const { id } = useParams();
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (id && !state) {
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
  const handleLike = (id) => {
    axios
      .put(`http://localhost:8000/api/pet/${id}`, {
        ...pet,
        likes: pet.likes + 1,
      })
      .then((res) => {
        console.log("Updated the existing Pet", res.data);
        setPet(res.data);
      })
      .catch((err) => {
        console.log("Error in Liking", err);
      });
  };

  return (
    <div className="detailsBody">
      <div className="nav">
        <h1>Pet Shelter</h1>
        <Link to="/" className="mx-5 px-5 pt-3">
          back to home
        </Link>
      </div>

      <div className="nav">
        <h3>{`Details About : ${pet.name}`}</h3>
        <button
          className="bg-danger mt-0"
          onClick={() => handleDelete(pet._id)}
        >
          <i className="bi bi-house-door-fill"></i>
          Adopt {pet.name}
        </button>
      </div>

      <div className=" details ">
        <div>
          <p className="names">Pet Type:</p>
          <p className="answers">{pet.type}</p>
        </div>
        <div>
          <p className="names">Pet Description:</p>
          <p className="answers">{pet.description}</p>
        </div>
        <div>
          <p className="names">Pet Skills:</p>
          <div className="skills mt-0">
            {pet.skills &&
              pet.skills.map((skill, index) => {
                return <p key={index}>{skill}</p>;
              })}
          </div>
        </div>
        <button
          className="bg-success mb-5 p-2"
          onClick={(e) => {
            e.target.disabled = true;
            e.target.classList.add("disableIt");
            handleLike(pet._id);
          }}
        >
          <i className="bi bi-hand-thumbs-up-fill "></i>
          Like {pet.name}
        </button>
        <span className="m-5"> {pet.likes} like(s)</span>
      </div>
    </div>
  );
}

export default SinglePet;
