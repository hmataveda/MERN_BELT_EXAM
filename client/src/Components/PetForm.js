import React from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PetForm() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  let skillsFromState = [];

  let iniName = "";
  if (state) {
    skillsFromState = [...state.skills];
    iniName = state.name;
  }

  const [pet, setPet] = useState(
    state || { name: "", type: "", description: "", skills: [] }
  );
  const [skills, setpetSkills] = useState(skillsFromState);
  const [Name, setName] = useState(iniName);
  const [errors, setErrors] = useState([]);

  // ...useEffect to fectch the previous pet data to edit the form
  useEffect(() => {
    if (id && !state) {
      axios
        .get(`http://localhost:8000/api/pet/${id}`)
        .then((res) => {
          console.log("Fetched single pet from axios", res.data);
          setPet(res.data);
          setpetSkills([...res.data.skills]);
          setName(res.data.name);
        })
        .catch((err) => {
          console.log(
            "Error in Clinet side while Fetching the Single Pet",
            err
          );
        });
    }
  }, []);

  useEffect(() => {
    setPet({
      ...pet,
      skills: skills,
    });
  }, [skills]);

  //............. function to handle the Onchange event
  const handleInputChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
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

    if (errorResponse.code == 11000) {
      setErrors([
        `${errorResponse.keyValue.name} already exists!!!. Name must be unique`,
      ]);
    } else {
      const errorArray = [];
      for (let key of Object.keys(errorResponse.errors)) {
        errorArray.push(errorResponse.errors[key].message);
      }

      setErrors(errorArray);
    }
  };

  return (
    <div>
      <div className="nav">
        <h1>Pet Shelter</h1>
        <Link to="/" className="links p-2 ">
          back to home
        </Link>
      </div>
      <h3>{id ? `Edit ${Name}` : "Know a pet needing a Home ?"}</h3>

      {errors.map((err, index) => {
        return (
          <p key={index} className="errors">
            {err}
          </p>
        );
      })}

      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around">
          <div>
            <div>
              <label>Pet Name:</label> <br />
              <input
                type="text"
                name="name"
                value={pet.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Pet Type:</label> <br />
              <input
                type="text"
                name="type"
                value={pet.type}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Pet Description:</label> <br />
              <input
                type="text"
                name="description"
                value={pet.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <h5>Skills (Optional):</h5>
            <div>
              <label>Skill 1:</label> <br />
              <input
                type="text"
                name="skills"
                value={skills[0]}
                onChange={(e) => {
                  setpetSkills([e.target.value, ...skills.slice(1)]);
                }}
              />
            </div>
            <div>
              <label>Skill 2:</label> <br />
              <input
                type="text"
                name="skills"
                value={skills[1]}
                onChange={(e) => {
                  setpetSkills([
                    ...skills.slice(0, 1),
                    e.target.value,
                    ...skills.slice(-1),
                  ]);
                }}
              />
            </div>
            <div>
              <label>Skill 3:</label> <br />
              <input
                type="text"
                name="skills"
                value={skills[2]}
                onChange={(e) => {
                  setpetSkills([...skills.slice(0, 2), e.target.value]);
                }}
              />
            </div>
          </div>
        </div>

        <div>
          {!id && (
            <button type="submit" className="bg-primary">
              <i className="bi bi-file-arrow-up-fill"></i>Add Pet
            </button>
          )}
          {id && (
            <button type="submit" className="bg-primary">
              <i className="bi bi-pencil-fill"></i>Edit Pet
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PetForm;
