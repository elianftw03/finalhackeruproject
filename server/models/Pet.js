const { Schema, model } = require("mongoose");

module.exports = model(
  "Pet",
  new Schema(
    {
      name: { type: String, required: true },
      species: { type: String, required: true },
      breed: String,
      age: Number,
      size: String,
      gender: String,
      description: String,
      image: {
        type: String,
        required: true,
      },
      createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  )
);
