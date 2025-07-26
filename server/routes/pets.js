const router = require("express").Router();
const ctrl = require("../controllers/pets");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const petSchema = require("../validators/pet");

// Public routes
router.get("/", ctrl.getAll);
router.get("/my-pets", auth, role("shelter"), ctrl.getMyPets);
router.get("/favorites", auth, ctrl.getFavorites);
router.patch("/:id/favorite", auth, ctrl.toggleFavorite);
router.get("/:id", ctrl.getOne);

// Shelter-specific route
router.get("/my-pets", auth, role("shelter"), ctrl.getMyPets);

// Protected routes
router.post("/", auth, role("shelter"), validate(petSchema), ctrl.create);
router.put("/:id", auth, role("shelter"), validate(petSchema), ctrl.update);
router.delete("/:id", auth, role("shelter"), ctrl.remove);

module.exports = router;
