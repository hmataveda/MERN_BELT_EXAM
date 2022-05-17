const PetControllers = module.require("../Controllers/pet.controller");

const PetRoutes = (app) => {
  app.post("/api/pets", PetControllers.createPet); // Create route
  app.get("/api/pets", PetControllers.findAllPet); // GetAll Route
  app.get("/api/pet/:id", PetControllers.findOnePetbyID); // GetOne Route
  app.put("/api/pet/:id", PetControllers.updatePetbyID); // UpdateOne Route
  app.delete("/api/pet/:id", PetControllers.deletePet); // Delete Route
};

module.exports = PetRoutes;
