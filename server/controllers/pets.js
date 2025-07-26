const Pet = require("../models/Pet");

const User = require("../models/User");

exports.toggleFavorite = async (req, res) => {
  const petId = req.params.id;
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user.favorites.includes(petId)) {
    user.favorites.push(petId);
  } else {
    user.favorites = user.favorites.filter((id) => id.toString() !== petId);
  }

  await user.save();
  res.json({ favorites: user.favorites });
};

exports.getAll = async (req, res) => {
  try {
    const query = { ...req.query };
    const pets = await Pet.find(query)
      .limit(30)
      .populate("createdBy", "name location");
    res.json(pets);
  } catch (err) {
    console.error("❌ Failed to fetch pets:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ createdBy: req.user.id });
    res.json(pets);
  } catch (err) {
    console.error("❌ Failed to fetch my pets:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.json(
      await Pet.findById(req.params.id).populate("createdBy", "name location")
    );
  } catch (err) {
    console.error("❌ Failed to fetch pet:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const newPet = {
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      image: req.body.image,
      description: req.body.description,
      createdBy: req.user.id,
    };

    const pet = await Pet.create(newPet);
    res.status(201).json(pet);
  } catch (err) {
    console.error("❌ Failed to create pet:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("❌ Failed to update pet:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Failed to delete pet:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    console.error("❌ Failed to fetch favorites:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
