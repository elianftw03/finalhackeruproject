const Pet = require("../models/Pet");
const User = require("../models/User");

function normalizeSpecies(v) {
  const m = {
    Dogs: "Dog",
    Cats: "Cat",
    Rabbits: "Rabbit",
    Birds: "Bird",
    Horses: "Horse",
    Reptiles: "Reptile",
    Dog: "Dog",
    Cat: "Cat",
    Rabbit: "Rabbit",
    Bird: "Bird",
    Horse: "Horse",
    Reptile: "Reptile",
  };
  return m[(v || "").trim()] || v || "";
}

exports.toggleFavorite = async (req, res) => {
  const petId = req.params.id;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user.favorites.includes(petId)) user.favorites.push(petId);
  else user.favorites = user.favorites.filter((id) => id.toString() !== petId);
  await user.save();
  res.json({ favorites: user.favorites });
};

exports.getAll = async (req, res) => {
  try {
    const { species, type, q } = req.query;
    const filter = {};

    const raw = (species || type || "").trim();
    if (raw) {
      const normalized = raw.replace(/s$/i, "");
      filter.species = new RegExp(`^${normalized}$`, "i");
    }

    if (q && q.trim()) {
      const re = new RegExp(q.trim(), "i");
      filter.$or = [
        { name: re },
        { breed: re },
        { city: re },
        { description: re },
      ];
    }

    const pets = await Pet.find(filter)
      .sort({ createdAt: -1 })
      .limit(30)
      .populate("createdBy", "name location");

    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ createdBy: req.user.id });
    res.json(pets);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate(
      "createdBy",
      "name location"
    );
    res.json(pet);
  } catch {
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
      gender: req.body.gender,
      size: req.body.size,
      image: req.body.image,
      description: req.body.description,
      city: req.body.city,
      status: req.body.status,
      vaccinated: req.body.vaccinated,
      neutered: req.body.neutered,
      contactName: req.body.contactName,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      createdBy: req.user.id,
    };
    const pet = await Pet.create(newPet);
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Not found" });
    const isOwner = pet.createdBy?.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) return res.sendStatus(403);
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Not found" });
    const isOwner = pet.createdBy?.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) return res.sendStatus(403);
    await Pet.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate(
      "createdBy",
      "name location email"
    );
    if (!pet) return res.status(404).json({ message: "Not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.patch = async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Pet not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message || "Patch failed" });
  }
};
