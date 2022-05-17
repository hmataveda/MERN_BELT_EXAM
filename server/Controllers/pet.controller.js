const Pet = require("../Models/pet.model");

//CRUD

module.exports = {
  createPet: (req, res) => {
    Pet.create(req.body)
      .then((newPet) => {
        res.status(200).json(newPet);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in Creating the new Pet [Create]", // CREATE
          error: err,
        });
      });
  },

  findAllPet: (req, res) => {
    Pet.find({})
      .collation({ locale: "en" })
      .sort({ type: 1 })
      .then((Allpets) => {
        res.status(200).json(Allpets);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in Finding all pets [Read]", // READ ALL
          error: err,
        });
      });
  },

  findOnePetbyID: (req, res) => {
    Pet.findById(req.params.id)
      .then((OnePet) => {
        res.json(OnePet);
      })
      .catch((err) => {
        res.json({
          message: "Something went wrong in Finding ONE pet [Read One]", //READ ONE
          error: err,
        });
      });
  },

  updatePetbyID: (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedPet) => {
        res.json(updatedPet);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in updating Pet by ID [Update]", //UPDATE
          error: err,
        });
      });
  },

  deletePet: (req, res) => {
    Pet.findByIdAndDelete(req.params.id)
      .then((deletedPet) => {
        res.json(deletedPet);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong in Deleting  a Pet [Detete]", //DELETE
          error: err,
        });
      });
  },
};
