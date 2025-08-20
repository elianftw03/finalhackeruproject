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
    const q = (req.query.q || "").trim();
    const type = normalizeSpecies((req.query.type || "").trim());
    const where = {};
    if (type) where.species = type;
    if (q) {
      const rx = { $regex: q, $options: "i" };
      where.$or = [
        { name: rx },
        { species: rx },
        { breed: rx },
        { description: rx },
        { "address.city": rx },
      ];
    }
    const pets = await Pet.find(where)
      .limit(30)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name location");
    res.json(pets);
  } catch {
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
      species: normalizeSpecies(req.body.species),
      breed: req.body.breed,
      age: req.body.age,
      image: req.body.image,
      description: req.body.description,
      createdBy: req.user.id,
    };
    const pet = await Pet.create(newPet);
    res.status(201).json(pet);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.species) body.species = normalizeSpecies(body.species);
    const updated = await Pet.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch {
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
