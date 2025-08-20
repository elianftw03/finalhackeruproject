const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Rabbit", "Bird", "Horse", "Reptile"],
    },
    breed: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    size: { type: String, required: true, enum: ["Small", "Medium", "Large"] },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },
    vaccinated: { type: Boolean, default: false },
    neutered: { type: Boolean, default: false },
    contactName: { type: String, required: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
