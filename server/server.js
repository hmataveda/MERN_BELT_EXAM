require("./Config/mongoose.config");
const express = require("express");
const cors = require("cors");
const PetRoutes = require("./Routes/pet.route");

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

PetRoutes(app);

app.listen(8000, () => {
  console.log("Server is running  and Listenening at the port 8000!!!!!");
});

// {
//     "name":"Mothi",
//     "type": "Pomorian",
//     "description":"This is white color pomorian",
//     "skills":["player", "sleeper"]
// }
