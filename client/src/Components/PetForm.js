import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PetForm() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(state);
  console.log(id);

  const [pet, setPet] = useState(
    state || { name: "", type: "", description: "", skills: [] }
  );
  const [errors, setErrors] = useState([]);

  // ...useEffect to fectch the previous pet data to edit the form
  useEffect(() => {
    if (id && !state) {
      console.log("coming here");
      axios
        .get(`http://localhost:8000/api/pet/${id}`)
        .then((res) => {
          console.log("Fetched single pet from axios", res.data);
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

  //............. function to handle the Onchange event
  const handleInputChange = (e) => {
    if (e.target.name == "skills") {
      setPet({ ...pet, [e.target.name]: e.target.value.split(",") });
    } else {
      setPet({
        ...pet,
        [e.target.name]: e.target.value,
      });
    }
  };

  // ......initial submit button from the form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      updateTheForm();
    } else {
      createNewPet();
    }
  };

  //.............submit function to creating new Form
  const createNewPet = () => {
    axios
      .post("http://localhost:8000/api/pets", pet)
      .then((res) => {
        console.log("Create new Pet", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in Clinet side while createin the NEW pet", err);
        handleServerError(err);
      });
  };

  //.................submit function to Update or Edit the form
  const updateTheForm = () => {
    axios
      .put(`http://localhost:8000/api/pet/${id}`, pet)
      .then((res) => {
        console.log("Updated the existing Pet", res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(
          "Error in Client side while updating the existing pet",
          err
        );
        handleServerError(err);
      });
  };

  //..... handling validation error thrown from Server
  //.... you can do through code or install mongoose unique validator but it showing error for id as well

  const handleServerError = (err) => {
    const errorResponse = err.response.data.error;
    console.log(errorResponse);
    if (errorResponse.code == 11000) {
      setErrors([
        `${errorResponse.keyValue.name} already exists!!!. Name must be unique`,
      ]);
    } else {
      const errorArray = [];
      for (let key of Object.keys(errorResponse.errors)) {
        errorArray.push(errorResponse.errors[key].message);
      }
      console.log(errorArray);
      setErrors(errorArray);
    }
  };

  return (
    <div>
      <h3>{id ? "Edit the Pet Form" : "Create new Form"}</h3>

      {errors.map((err, index) => {
        return <p key={index}>{err}</p>;
      })}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={pet.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={pet.type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={pet.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            value={pet.skills}
            onChange={handleInputChange}
          />
        </div>
        {/* <label>Skill options</label>
        <input
          type="text"
          name="skill"
          value={pet.skill}
          onChange={handleInputChange}
        /> */}
        <div>
          <input type="submit" value={id ? "Update" : "Create"}></input>
        </div>
      </form>
    </div>
  );
}

export default PetForm;
