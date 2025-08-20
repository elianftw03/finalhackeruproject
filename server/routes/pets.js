const router = require("express").Router();
const ctrl = require("../controllers/pets");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const petSchema = require("../validators/pet");
const petUpdateSchema = require("../validators/petUpdate");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.get("/favorites", auth, ctrl.getFavorites);
router.patch("/:id/favorite", auth, ctrl.toggleFavorite);
router.get("/my-pets", auth, role("shelter"), ctrl.getMyPets);
router.post("/", auth, role("shelter"), validate(petSchema), ctrl.create);
router.put(
  "/:id",
  auth,
  role("shelter"),
  validate(petUpdateSchema),
  ctrl.update
);
router.delete("/:id", auth, role("shelter"), ctrl.remove);

module.exports = router;
