const mongoose = require("mongoose");
// var uniqueValidator = require("mongoose-unique-validator");
const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pet Name is required!!"],
      maxlength: [20, "Pet Name can't be more than 20 characters"],
      minlength: [3, "Pet Name must be atleast 3 characters long"],
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Pet Type is required!!"],
      maxlength: [20, "Pet Type can't be more than 20 characters"],
      minlength: [3, "Pet Type must be atleast 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Pet Description is required!!"],
      maxlength: [300, "Pet Description can't be more than 300 characters"],
      minlength: [3, "Pet Description must be atleast 3 characters long"],
    },
    skills: {
      type: [String],
      validate: [(val) => val.length <= 3, `skills can contain up to 3 skills`],
    },
    skill: {
      type: [String],
      //   required: [(value) => value.length > 0, "Any of the skill is required"],
      // validate: [(val) => val.length , `skills can contain up to 1 skills`],
      enum: {
        values: ["good Player", "listner", "barker", "honesty", "all"],
        message: "Skill must be either from above 3",
      },
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
// PetSchema.plugin(uniqueValidator, {
//   message: "Pet {PATH} must be unique. {VALUE} already exists!! ",
// });

module.exports = Pet;
